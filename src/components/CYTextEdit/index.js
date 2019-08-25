import React from 'react';
import '../CYTextField/cy-text-field.scss';

const CyTextEdit = ({ label, name, value, max, onClick }) => {
  return (
    <div className="cy-text-field edit" onClick={onClick}>
      <label>{label}</label>
      <span style={styles.text}>{value}</span>
      <i className="arrow" />
    </div>
  );
};

export default CyTextEdit;

const styles = {
  text: {
    flex: 1,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  }
};
