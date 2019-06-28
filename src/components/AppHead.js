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

const SubTitle = ({ title, link }) => {
  return title ? (
    // <a className="app-head-sub-title" href={link}>
    //   {title}
    // </a>
    <Link to={link} className="app-head-sub-title">
      {title}
    </Link>
  ) : (
    <></>
  );
};

export default ({ title = '', showBack, subTitle = '', link = '' }) => {
  return (
    <div className="app-head">
      <GoBack showBack={showBack} />
      <Title title={title} />
      <SubTitle title={subTitle} link={link} />
    </div>
  );
};
