import React, { useState } from 'react';

import 'styles/cy-input.scss';

// const Append = ({ append }) => {
//   if (append) {
//     return { append };
//   } else {
//     return <></>;
//   }
// };

export default props => {
  let [_value, setValue] = useState(props.value || '');

  let [focus, setFocus] = useState(false);

  const IconClear = ({ show }) => {
    return show ? <i className="clear" onClick={clear} /> : <></>;
  };

  function clear(e) {
    const input = e.target.previousSibling;
    input.focus();
    setValue('');
    if (typeof props.onClear === 'function') {
      props.onClear(input);
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
    props.onFocus && props.onFocus();
  };

  const handleBlur = e => {
    setTimeout(() => {
      setFocus(false);
    }, 100);
    props.onBlur && props.onBlur();
  };

  const handleKeyUp = e => {
    // console.log('keyup', _value);
    if (
      ['tel', 'number'].includes(props.type) &&
      (e.keyCode < 48 || e.keyCode > 57)
    ) {
      e.preventDefault();
      // setValue(_value.replace(/^\D*([1-9]\d)*$/, '$1'));
    }
    props.onKeyUp && props.onKeyUp();
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
      {/* <Append class="cy-input-append" append={append} /> */}
    </div>
  );
};
