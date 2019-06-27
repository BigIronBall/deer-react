import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import routes from './routes'

export default () => {
  // return (
  //   <Router history={browserHistory} routes={routes} />,
  //   document.getElementById('app')
  // )
  return <BrowserRouter routes={routes} />
}
