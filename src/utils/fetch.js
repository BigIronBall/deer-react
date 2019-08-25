import toast from 'components/CyToast';
import { HOST } from '../config/index';

// import to from 'await-to';

const TIMEOUT = 10;

const timeoutPromise = (timeout, controller) => {
  return new Promise((resolve, reject) => {
    // if (signal.aborted) return;

    setTimeout(() => {
      reject(new Response('timeout', { status: 504, statusText: 'timeout' }));
      controller.abort();
      // toast('请求超时');
    }, timeout * 1000);
  });
};

const Fetch = {
  async get(url, data, showExpetion = true) {
    return doFetch(url, data, 'GET', showExpetion);
  },
  async post(url, data, showExpetion = true) {
    return doFetch(url, data, 'POST', showExpetion);
  }
};

function request(url, requestInfo) {
  return fetch(url, requestInfo)
    .then(response => {
      return response.json();
    })
    .catch(err => {
      if (err.message === 'Failed to fetch') {
        return Promise.reject('服务器无法连接');
      } else {
        return Promise.reject(err.message || err);
      }
    })
    .then(response => {
      return Promise.resolve(response.data);
    });
}

const doFetch = (url, data, method = 'GET', showExpetion = true) => {
  url = HOST + url;

  const token = localStorage.getItem('token');

  const controller = new AbortController();
  const signal = controller.signal;

  let requestInfo = {
    method: method || 'POST', // *GET, POST, PUT, DELETE, etc.
    // mode: 'same-origin', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'BXVIP-UA': 'wap',
      'Content-Type': 'application/x-www-form-urlencoded',
      'deer-token': token
    },
    redirect: 'follow', // manual, *follow, error
    signal: signal
    // referrer: 'no-referrer', // no-referrer, *client
    // body: data // body data type must match "Content-Type" header
  };

  if (method === 'POST') requestInfo.body = data;

  return Promise.race([
    request(url, requestInfo),
    timeoutPromise(TIMEOUT, controller)
  ])
    .then(res => {
      console.warn('res', res);
      return res;
    })
    .catch(err => {
      // 网络错误或者超时需要提示
      controller.abort();
      if (showExpetion) {
        if (err.statusText === 'timeout') {
          toast('请求超时，请重试');
        } else {
          toast(err);
        }
      }

      console.error(err);
      // return Promise.reject(err);
      return Promise.resolve({});
    });
};

export default Fetch;
