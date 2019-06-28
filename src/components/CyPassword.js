import React, { useState } from 'react';

import 'styles/cy-input.scss';

export default props => {
  // console.warn('input props', props);
  const [value, setValue] = useState('');
  const [type, setType] = useState('password');

  const IconClear = ({ show }) => {
    return show ? <i className="clear" onClick={() => setValue('')} /> : <></>;
  };

  const IconChangeType = ({ show, type }) => {
    // cosnt type = this.type === 'text' ? 'password':'text';
    const i = type === 'text' ? '' : 'hide';
    return show ? (
      <i
        className={`icon-password ${i}`}
        onClick={() => setType(type === 'text' ? 'password' : 'text')}
      />
    ) : (
      <></>
    );
  };

  const handleChange = e => {
    setValue(e.target.value);
    props.onChange && props.onChange(e);
  };

  return (
    <div className="cy-input cy-password">
      <input type={type} {...props} value={value} onChange={handleChange} />
      <IconClear show={value.length} />
      <IconChangeType show={value.length} type={type} />
    </div>
  );
};
