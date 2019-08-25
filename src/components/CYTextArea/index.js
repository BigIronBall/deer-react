import React, { useState, useRef } from 'react';
import useDidMount from '@/utils/hooks/useDidMount';

export default ({ max, value, onChange, ...otherProps }) => {
  const ref = useRef(null);

  const [len, setLen] = useState(0);

  const [stop, setStop] = useState(false);

  useDidMount(() => {
    ref.current.focus();
  });

  function changeHandler(e) {
    if (!stop) setLen(ref.current.value.length);
    if (onChange) onChange(e);
  }

  function compositionStartHandler() {
    setStop(true);
  }

  function compositionEndHandler() {
    setStop(false);
    setLen(ref.current.value.length);
  }

  return (
    <>
      <textarea
        ref={ref}
        style={styles.textarea}
        value={value}
        onChange={changeHandler}
        maxLength={max}
        onCompositionStart={compositionStartHandler}
        onCompositionEnd={compositionEndHandler}
        {...otherProps}
      />
      <p style={styles.length}>{`${len}/${max}`}</p>
    </>
  );
};

const styles = {
  textarea: {
    width: '100%',
    outLine: 'none',
    height: '100px',
    border: 'none'
  },
  length: {
    textAlign: 'right'
  }
};
