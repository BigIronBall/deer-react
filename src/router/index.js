import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import routes from './routes';
import View from 'components/View';

function renderRoutes(props) {
  // console.warn('props', props);
  const token = localStorage.getItem('token');

  return routes.map(item => {
    const MyComponent = item.component,
      flag = !token && ('requiresAuth' in item && item.requiresAuth);

    return (
      <Route
        key={'__key__' + item.path}
        exact={item.path === '/'}
        path={item.path}
        render={() => {
          if (flag) {
            return <Redirect key={'__key__' + item.path} to="/login" />;
          } else {
            return (
              <View>
                <MyComponent {...props} />
              </View>
            );
          }
        }}
      />
    );
  });
}

export default () => {
  return (
    <BrowserRouter>
      <Route
        render={({ location }) => {
          const { pathname } = location;

          return (
            <TransitionGroup>
              <CSSTransition
                key={pathname || '__404__'}
                classNames="page"
                timeout={{ enter: 300, exit: 300 }}
              >
                <Route
                  location={location}
                  render={props => <Switch>{renderRoutes(props)}</Switch>}
                />
              </CSSTransition>
            </TransitionGroup>
          );
        }}
      />
      {/* <Route>
        <Switch>{renderRoutes()}</Switch>
      </Route> */}
    </BrowserRouter>
  );
};
