import React from 'react';
import './action-sheet.scss';

const ActionSheet = ({ data, title }) => {
  if (!data || !Array.isArray(data))
    throw Error('data is required & data must be a Array');
  // if(!data.every(x=> typeof x === 'string') throw Error("every member of props must be a string")

  // const initialState = [...data].map(x => {
  //   return {
  //     name: x.name,
  //     checked: false,
  //     value: x.value
  //   };
  // });

  // initialState[0].checked = true;

  function clickHandler(item) {}

  return (
    <>
      <div className="cy-mask" />
      <div className="action-sheet">
        <div className="title">
          <p>{title}</p>
          <i className="close" />
        </div>
        {data.map(item => (
          <div className={`item ${item.checked ? 'active' : ''}`}>
            {item.name}
            <i className="selected" />
          </div>
        ))}
      </div>
    </>
  );
};

export default ActionSheet;
