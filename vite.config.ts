import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

function resolve(src) {
  return path.resolve(__dirname, src)
}
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: '/admin',
  resolve: {
    alias: {
      '@': resolve('src')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  server: {
    proxy: {
      '^/api': {
        // target: 'http://106.52.78.247',
        target: 'http://127.0.0.1:7001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api/')
      }
    }
  }
}))
