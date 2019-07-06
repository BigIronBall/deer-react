import React, { useState } from 'react';

import 'styles/cy-input.scss';

export default props => {
  // console.warn('input props', props);
  const [value, setValue] = useState('');
  const [type, setType] = useState('password');
  const [focus, setFocus] = useState(false);

  function clear(e) {
    const input = e.target.previousSibling;
    if (input.tagName === 'INPUT') {
      setTimeout(() => {
        input.focus();
      }, 50);
    }

    setValue('');

    if (typeof props.onClear === 'function') {
      props.onClear(input);
    }
  }

  const IconClear = ({ show }) => {
    return show ? <i className="clear" onClick={clear} /> : <></>;
  };

  function changeType(e) {
    const input =
      e.target.previousSibling.previousSibling || e.target.previousSibling;
    if (input.tagName === 'INPUT') {
      setTimeout(() => {
        input.focus();
      }, 50);
    }

    setType(type === 'text' ? 'password' : 'text');
  }

  const IconChangeType = ({ show, type }) => {
    // cosnt type = this.type === 'text' ? 'password':'text';
    const i = type === 'text' ? '' : 'hide';
    return show ? (
      <i className={`icon-password ${i}`} onClick={changeType} />
    ) : (
      <></>
    );
  };

  const handleChange = e => {
    setValue(e.target.value);
    props.onChange && props.onChange(e);
  };

  const handleFocus = e => {
    setTimeout(() => {
      setFocus(true);
    }, 100);
    props.onFocus && props.onFocus();
  };

  const handleBlur = e => {
    setTimeout(() => {
      setFocus(false);
    }, 100);
    props.onBlur && props.onBlur();
  };

  const { className, onClear, ...otherProps } = props;

  return (
    <div className="cy-input cy-password">
      <input
        type={type}
        {...otherProps}
        name={props.name || ''}
        placeholder={props.placeholder || ''}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <IconClear show={value.length && focus} />
      <IconChangeType show={value.length} type={type} />
    </div>
  );
};
