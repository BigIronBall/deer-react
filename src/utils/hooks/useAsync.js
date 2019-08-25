import { useState } from 'react';
import to from 'await-to';

import fetch from '../fetch';

const useFetch = async (url, params, method = 'GET') => {
  const [loading, setLoaing] = useState(false);

  setLoaing(true);

  const [error, result] = await to(fetch[method.toLowerCase()](url, params));

  setLoaing(false);

  return [loading, error, result];
};

export default useFetch;
