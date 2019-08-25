import { useState, useCallback } from 'react';
import to from 'await-to';

import fetch from '../fetch';

const useLoadingFetch = () => {
  const [loading, setLoaing] = useState(false);

  const request = useCallback(
    async (url, params, method = 'GET') => {
      if (loading) return;
      setLoaing(true);

      const [error, _result] = await to(
        fetch[method.toLowerCase()](url, params)
      );

      setLoaing(false);

      return [error, _result];
    },
    [loading]
  );

  return [loading, request];
};

export default useLoadingFetch;
