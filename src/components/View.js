import React from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

function View({ children, location: { state }, history }) {
  const ctx = classNames({
    page: true,
    pop: history.action === 'POP'
  });
  return <div className={ctx}>{children}</div>;
}

export default withRouter(View);
