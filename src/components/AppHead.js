import React from 'react';
import 'styles/app-head.scss';
import GoBack from './GoBack';
import { Link } from 'react-router-dom';

// type
// top 是顶级 title在中间
// sub 是次级 title 在左边
// third 是三级 title 在右边

const Title = ({ title, children, type = 'top' }) => {
  return title ? (
    <span className={`app-title ${type}`}>
      {title}
      {children}
    </span>
  ) : (
    <></>
  );
};

const RightTitle = ({ title, link, onClick }) => {
  function clickHandle(e) {
    e.preventDefault();
    if (onClick && typeof onClick === 'function') {
      onClick();
    }
  }

  return title ? (
    <Link to={link} className="app-head-sub-title" onClick={clickHandle}>
      {title}
    </Link>
  ) : (
    <></>
  );
};

const AppHead = ({
  title = '',
  leftText = '',
  showBack,
  rightClick,
  rightText = '',
  link = ''
}) => {
  return (
    <div className="app-head">
      <GoBack showBack={showBack} />
      {leftText && <span className="app-head-left-title">{leftText}</span>}
      <Title title={title} />
      <RightTitle title={rightText} link={link} onClick={rightClick} />
    </div>
  );
};

export default AppHead;
