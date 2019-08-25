import { useEffect } from 'react';

export default function useDidMount(fn) {
  useEffect(() => {
    if (!fn) throw Error('fn is required');
    if (typeof fn !== 'function') throw Error('fn must be a function');
    void fn();
  }, [fn]); // 第二个参数设置为[], 表示不必对任何数据， 所以只在首次渲染时调用
}
