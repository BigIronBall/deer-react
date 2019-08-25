import React from 'react';
import './cy-group.scss';

export default ({ title, children }) => {
  return (
    <div className="cy-group">
      <div className="title">{title}</div>
      {children}
    </div>
  );
};
