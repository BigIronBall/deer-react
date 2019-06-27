import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <div class="container">
      <Link path="/validateLogin">验证码登录</Link>
      <h1>密码登录</h1>
      <form>
        <input type="text" placeholder="请输入账号" />
        <input type="text" placeholder="请输入密码" />

        <button>登录</button>
      </form>
      <Link path="/reset">忘记密码</Link>
      <Link path="/reset">还没账号？快去注册</Link>
    </div>
  )
}
