import React, { useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import AppHead from 'components/AppHead';
import CyTextArea from 'components/CYTextArea';
import { useStore } from 'iostore';

export default withRouter(({ history, location }) => {
  const { label, name, max, storeName = '', value = '' } = location.state;

  let store = useRef(null);

  if (storeName) {
    store.current = useStore()[storeName];
  }

  const [val, setVal] = useState(value);

  // 完成
  function editComplate() {
    if (store.current) {
      let obj = {};
      obj[name] = val;
      store.current.update({ ...store.current.data, ...obj });
    }

    history.go(-1);
  }

  function changeHandler(e) {
    setVal(e.target.value);
  }

  return (
    <>
      <AppHead
        leftText={label}
        rightText="完成"
        title=" "
        showBack={true}
        rightClick={editComplate}
      />
      <div className="container">
        <CyTextArea
          value={val}
          onChange={changeHandler}
          max={max}
          placeholder={`请输入${label}`}
        />
      </div>
    </>
  );
});
