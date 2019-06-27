// import React from 'react'

import Login from 'pages/auth/Login'
import Index from 'pages/Index'
import App from '../App.js'
import NotMatch from 'pages/404'

const configs = [
  {
    path: '/',
    component: App
  },
  {
    path: '/home',
    component: Index
  },
  {
    path: '/login',
    component: Login
  },
  {
    component: NotMatch
  }
]

// const Routes = () => {
//   return configs.map(x => <Route path={x.path} component={x.component} />)
// }

export default configs
