import React from 'react';
import { withRouter } from 'react-router-dom';

const GoBack = ({ showBack, history }) => {
  if (showBack) {
    return (
      <span className="go-back" onClick={() => history.goBack()}>
        <i className="left-arrow" />
      </span>
    );
  } else return <></>;
};

export default withRouter(GoBack);
