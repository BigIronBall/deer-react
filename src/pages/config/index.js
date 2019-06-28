import React from 'react';
// import { Link } from 'react-router-dom';

import CyList from 'components/CyList';
import AppHead from 'components/AppHead';

export default () => {
  const configData = [
    {
      label: '账号管理',
      path: '/accountManager'
    },
    {
      label: '清除缓存',
      path: '/clearCache',
      content: '25.3 MB'
    },
    {
      label: '检查更新',
      path: '/update'
    },
    {
      label: '联系我们',
      path: '/contactUs'
    },
    {
      label: '关于我们',
      path: '/aboutus'
    },
    {
      label: '退出当前账号',
      path: '/logout'
    }
  ];

  return (
    <div className="container">
      <AppHead title="设置" showBack={true} />
      <CyList list={configData} />
    </div>
  );
};
