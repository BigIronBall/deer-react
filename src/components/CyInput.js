import React, { useState } from 'react';

import 'styles/cy-input.scss';

export default props => {
  // console.warn('input props', props);
  let [_value, setValue] = useState(props.value || '');

  const IconClear = ({ show }) => {
    return show ? <i className="clear" onClick={() => setValue('')} /> : <></>;
  };

  const handleChange = e => {
    setValue(e.target.value);
    props.onChange && props.onChange(e);
  };

  return (
    <div className="cy-input">
      <input type="text" {...props} value={_value} onChange={handleChange} />
      <IconClear show={_value.length} />
    </div>
  );
};
