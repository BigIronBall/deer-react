import React from 'react';

import CyList from 'components/CyList';
import AppHead from 'components/AppHead';
import CyAvator from 'components/CyAvator';

export default () => {
  const configData = [
    {
      label: '店铺logo',
      path: '/editLogo',
      component: <CyAvator />
    },
    {
      label: '修改密码',
      path: '/resetPassword',
      content: '用于密码登录'
    },
    {
      label: '绑定账号',
      path: '/bindAccount',
      content: '您尚未绑定账号'
    }
  ];

  return (
    <div className="">
      <AppHead title="账号管理" showBack={true} type="sub" />
      <CyList list={configData} />
    </div>
  );
};
