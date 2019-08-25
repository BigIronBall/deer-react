import React, { useState, useRef } from 'react';

import './cy-input.scss';

export default props => {
  let [_value, setValue] = useState(props.value || '');

  let [focus, setFocus] = useState(false);

  const inputrRef = useRef(null);

  const IconClear = ({ show }) => {
    return show ? <i className="clear" onClick={clear} /> : <></>;
  };

  function clear(e) {
    inputrRef.current.focus();
    setValue('');
    if (typeof props.onClear === 'function') {
      props.onClear(inputrRef.current);
    }
  }

  const handleChange = e => {
    setValue(e.target.value);
    props.onChange && props.onChange(e);
  };

  const handleFocus = e => {
    setTimeout(() => {
      setFocus(true);
    }, 100);
    props.onFocus && props.onFocus(e);
  };

  const handleBlur = e => {
    setTimeout(() => {
      setFocus(false);
    }, 100);
    props.onBlur && props.onBlur(e);
  };

  const handleKeyUp = e => {
    if (
      ['tel', 'number'].includes(props.type) &&
      (e.keyCode < 48 || e.keyCode > 57)
    ) {
      e.preventDefault();
    }
    props.onKeyUp && props.onKeyUp(e);
  };

  const handleKeyPress = e => {
    if (['tel', 'number'].includes(props.type)) {
      if (!(e.charCode >= 48 && e.charCode <= 57)) {
        e.preventDefault();
      }
    }
    return props.onKeyPress ? props.onKeyPress() : true;
  };

  const { className, onClear, append, ...otherProps } = props;

  return (
    <div className={`cy-input ${className || ''}`}>
      <input
        type="text"
        ref={inputrRef}
        {...otherProps}
        value={_value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
        onKeyPress={handleKeyPress}
      />
      <IconClear show={_value.length && focus} />
      {append ? append : <></>}
    </div>
  );
};
