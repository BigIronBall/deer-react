import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import routes from './routes';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import View from 'components/View';

// const Page = ({ children }) => {
//   return <View>{children}</View>;
// };

export default () => {
  return (
    <BrowserRouter>
      {/* <Switch>
        {routes.map(item => (
          <Route
            key={'__key__' + item.path}
            exact={true}
            path={item.path}
            component={item.component}
          />
        ))}
      </Switch> */}
      <Route
        render={({ location }) => {
          const { pathname } = location;
          return (
            <TransitionGroup>
              <CSSTransition
                key={pathname}
                classNames="page"
                timeout={{ enter: 11000, exit: 11000 }}
              >
                <Route
                  location={location}
                  render={() => (
                    <Switch>
                      {routes.map(item => {
                        const MyComponent = item.component;
                        return (
                          <Route
                            key={'__key__' + item.path}
                            exact={item.path === '/'}
                            path={item.path}
                            render={() => (
                              <View>
                                <MyComponent />
                              </View>
                            )}
                          />
                        );
                      })}
                    </Switch>
                  )}
                />
              </CSSTransition>
            </TransitionGroup>
          );
        }}
      />
    </BrowserRouter>
  );
};
