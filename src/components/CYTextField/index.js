import React from 'react';
import CyInput from '../CYInput';
import './cy-text-field.scss';

export default ({ label, field, value, error, ...otherProps }) => {
  return (
    <div className="cy-text-field">
      <label>{label}</label>
      <CyInput
        name={field}
        value={value}
        className={error && error.length ? 'error' : ''}
        {...otherProps}
      />
    </div>
  );
};
