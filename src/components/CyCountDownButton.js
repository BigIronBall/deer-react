import React, { useState, useEffect } from 'react';
import CYButton from './CYButton';

import useCountDown from '@/utils/hooks/useCountDown';

function getLocalTime($key) {
  let localCountdown = sessionStorage.getItem($key);
  if (localCountdown) {
    localCountdown = parseInt(localCountdown);
    if (!isNaN(localCountdown)) {
      localCountdown = parseInt(
        (new Date(localCountdown).getTime() - new Date().getTime()) / 1000
      );
    }
  }
  return localCountdown || 0;
}

const CDButton = ({
  $key,
  className,
  onClick,
  cdText,
  loadingText,
  doneText,
  children,
  stopless = 60
}) => {
  const localCountdown = getLocalTime($key);

  const initValue =
    localCountdown && localCountdown > 0 ? localCountdown : stopless;
  const _start = !!(localCountdown && localCountdown > 0);

  const [second, isStart, setStart] = useCountDown(_start, stopless, initValue);

  const [first, setFirst] = useState(true);
  const [text, setText] = useState(children);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isStart) {
      if (second === 1) {
        sessionStorage.removeItem($key);
      }
    }
  }, [$key, isStart, second]);

  async function handleClick(e) {
    if (loading) return;
    if (onClick && typeof onClick === 'function') {
      setLoading(true);
      setText(loadingText);
      const result = await onClick();
      if (result === false) {
        setLoading(false);
        setText(children);
        return false;
      }
    }
    setLoading(false);
    setText(children);

    if (isStart) return;
    if (isStart === false) {
      setStart(true);
      // 写入初始时间
      sessionStorage.setItem($key, new Date().getTime() + stopless * 1000);

      if (first && doneText) {
        setFirst(false);
        setText(doneText);
      }
    }
  }

  return (
    <CYButton
      className={className || ''}
      disabled={isStart}
      onClick={handleClick}
    >
      {isStart ? `${cdText}${second}s` : text}
    </CYButton>
  );
};

export default CDButton;
