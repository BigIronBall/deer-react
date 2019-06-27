// import React from 'react'

import Login from 'pages/Login'
import Index from 'pages/Index'
import App from '../App.js'

const configs = [
  {
    path: '/',
    component: App
  },
  {
    path: 'home',
    component: Index
  },
  {
    path: 'login',
    component: Login
  }
]

// const Routes = () => {
//   return configs.map(x => <Route path={x.path} component={x.component} />)
// }

export default configs
