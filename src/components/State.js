import React from 'react';
import noWifi from 'images/state/zwwl.png';
import noOrders from 'images/state/zwdd.png';
import noGoods from 'images/state/zwsp.png';
import noMessages from 'images/state/zwxx.png';
import noAccount from 'images/state/zwzh.png';

import 'styles/app-state.scss';

const template = (src, msg) => {
  return (
    <div className="container app-state flex fx-dir-col fx-center">
      <img src={src} alt="" />
      <p>{msg}</p>
    </div>
  );
};

const State = ({ type = 'NOWIFI', _msg = '' }) => {
  let msg = '无网络连接',
    src = noWifi;

  if (!navigator.onLine) {
    return template(src, msg);
  }

  switch (type) {
    case 'NO_ORDERS':
      msg = '暂无订单';
      src = noOrders;
      break;
    case 'NO_GOODS':
      msg = '暂无在售商品';
      src = noGoods;
      break;
    case 'NO_MESSAGES':
      msg = '暂无消息';
      src = noMessages;
      break;
    case 'NO_ACCOUNTS':
      msg = '马上添加提现账号吧';
      src = noAccount;
      break;
    default:
      break;
  }

  return template(src, _msg || msg);
};

export default State;
