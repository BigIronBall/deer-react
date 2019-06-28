import React from 'react';

import 'styles/cy-button.scss';

export default props => {
  // console.warn(props);

  const {
    children,
    className,
    disabled = false,
    size = '',
    type = 'default',
    onClick
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
  // const btnSize = `${size}`  large normal small

  const btnDisabled = disabled ? ' disabled' : '';
  const _className = className ? ' ' + className : '';
  return (
    <button
      className={`cy-btn ${btnType}${_className}${btnDisabled} ${size}`}
      {...props}
      onClick={handleClick}
    >
      <span>{children}</span>
    </button>
  );
};
