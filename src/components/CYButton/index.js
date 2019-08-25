import React from 'react';

import './cy-button.scss';

export default props => {
  const {
    children,
    className,
    disabled = false,
    size = '',
    type = 'default',
    onClick,
    loading = false,
    loadingText = '',
    ...otherProps
  } = props;

  const handleClick = event => {
    event.preventDefault();
    event.stopPropagation();

    if (disabled || loading) return;

    onClick && onClick(event);
  };

  const btnType = `cy-btn-${type}`;
  const btnDisabled = disabled || loading ? ' disabled' : '';

  return (
    <button
      className={['cy-btn', btnType, className, btnDisabled, size].join(' ')}
      {...otherProps}
      onClick={handleClick}
    >
      <span>{loading ? loadingText : children}</span>
    </button>
  );
};
