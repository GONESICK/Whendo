import styled from 'styled-components'

export const LoginStyleWrapper = styled.div`
  background-color: mintcream;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .loginbox {
    width: 500px;
    height: 300px;
    padding: 30px;
    box-sizing: border-box;
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 0 8px 4px #cccccc;
    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 16px;
        color: #666666;
        float: right;
      }
    }
  }
`
