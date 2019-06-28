import React from 'react';
import 'styles/cy-list.scss';
import { Link } from 'react-router-dom';

export default ({ list }) => {
  return (
    <ul className="cy-list">
      {list.map(item => {
        return (
          <li key={'__key__' + item.label} className="cy-list-item">
            <Link to={item.path}>
              <span className="label">{item.label}</span>
              <span className="content">
                {item.content || item.component || ''}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
