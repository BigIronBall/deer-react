import React from 'react';

import 'styles/cy-button.scss';

export default props => {
  const {
    children,
    className,
    disabled = false,
    size = '',
    type = 'default',
    onClick,
    ...otherProps
  } = props;

  const handleClick = event => {
    // console.warn('e inside', event);
    event.preventDefault();
    event.stopPropagation();
    if (event.target.className.includes(disabled) || disabled) {
      return;
    }
    onClick && onClick(event);
  };

  const btnType = `cy-btn-${type}`; // primary danger warning default disable
  const btnDisabled = disabled ? ' disabled' : '';

  return (
    <button
      className={['cy-btn', btnType, className, btnDisabled, size].join(' ')}
      {...otherProps}
      onClick={handleClick}
    >
      <span>{children}</span>
    </button>
  );
};
