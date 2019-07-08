import React from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

function View({ children, location: { state }, history }) {
  console.log(state, history);
  const ctx = classNames({
    page: true,
    // push: history.action === 'PUSH',
    pop: history.action === 'POP' //state && state.prev
  });
  return (
    // <div className={ctx}>
    //   <div className="page_inner">{children}</div>
    // </div>
    <div className={ctx}>{children}</div>
  );
}

export default withRouter(View);
