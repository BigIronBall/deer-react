import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import routes from './routes'

export default () => {
  // return (
  //   <Router history={browserHistory} routes={routes} />,
  //   document.getElementById('app')
  // )
  return (
    <BrowserRouter>
      <Switch>
        {routes.map(item => (
          <Route
            key={'__key__' + item.path}
            exact={true}
            path={item.path}
            component={item.component}
          />
        ))}
      </Switch>
    </BrowserRouter>
  )
}
