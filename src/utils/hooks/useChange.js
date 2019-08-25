import { useState, useCallback } from 'react';

const useChange = initValue => {
  const [value, setValue] = useState(initValue);

  const onChange = useCallback(e => {
    setValue(e.target.value);
  }, []);

  return [value, onChange];
};

export default useChange;
