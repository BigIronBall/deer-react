import { useState, useEffect } from 'react';

function useCountDown(open, defaultValue, initValue) {
  const _second = initValue * 1 || defaultValue * 1;
  const [second, setSecond] = useState(_second);

  const [isStart, setIsStart] = useState(open);

  useEffect(() => {
    let interval;
    if (isStart) {
      interval = setInterval(() => {
        // console.log('interval', initValue);
        setSecond(preSecond => {
          if (preSecond <= 0) {
            clearInterval(interval);
            setIsStart(false);
            // console.log('end', initValue, defaultValue);
            return defaultValue;
          } else {
            return preSecond - 1;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [defaultValue, initValue, isStart]);

  function start() {
    setIsStart(true);
  }

  return [second, isStart, start];
}

export default useCountDown;
