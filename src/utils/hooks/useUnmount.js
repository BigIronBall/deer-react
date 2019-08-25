import { useEffect } from 'react';

export default function useUnmount(fn) {
  useEffect(() => {
    return () => {
      fn();
    };
  }, [fn]);
}
