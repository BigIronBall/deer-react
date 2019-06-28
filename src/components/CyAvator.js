import React from 'react';

import { pxToVW } from '@/utils/util';

import avator from 'images/shop/tx.png';
import 'styles/cy-avator.scss';

export default ({ url, size = 68 }) => {
  const styles = {
    width: pxToVW(size),
    height: pxToVW(size)
  };
  const error = `this.src="${avator}";this.onerror=null`;

  console.log(styles);

  return (
    <span className="cy-avator" style={styles}>
      {url && url.length ? (
        <img src={url} alt="" onerror={error} />
      ) : (
        <div className="default" />
      )}
    </span>
  );
};
