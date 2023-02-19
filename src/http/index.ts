import axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  type AxiosInstance
} from 'axios'
import { store } from '@/redux/store'

// 基本配置
const http: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 200000
})

// const persistUser: string | null = localStorage.getItem('persist:user')
// const accessToken: string = persistUser
//   ? JSON.parse(persistUser).accessToken
//   : ''

// 请求拦截器
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (store.getState().user.accessToken) {
      config.headers.Authorization = `Bearer ${
        store.getState().user.accessToken
      }`
    }
    return config
  },
  async function (error): Promise<any> {
    return await Promise.reject(error)
  }
)

// 相应拦截器
http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  async (error): Promise<any> => {
    return Promise.reject(error)
  }
)

export default http
