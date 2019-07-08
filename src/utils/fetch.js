import toast from 'components/CyToast';

const TIMEOUT = 10;
const controller = new AbortController();
const signal = controller.signal;

const timeoutPromise = timeout => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Response('timeout', { status: 504, statusText: 'timeout' }));
      controller.abort();
      // toast('请求超时');
    }, timeout * 1000);
  });
};

const Fetch = {
  get(url, data, showExpetion = false) {
    return doFetch(url, data, 'GET', showExpetion);
  },
  post(url, data, showExpetion = false) {
    return doFetch(url, data, 'POST', showExpetion);
  }
};

function request(url, requestInfo) {
  return fetch(url, requestInfo)
    .then(response => {
      // debugger;
      return response.json();
    }) // parses response to JSON
    .catch(err => {
      console.error(err);
      // reject(err);
    })
    .then(response => {
      return Promise.resolve(response.data);
    });
}

const doFetch = (url, data, method = 'GET', showExpetion = false) => {
  let requestInfo = {
    method: method || 'POST', // *GET, POST, PUT, DELETE, etc.
    // mode: 'same-origin', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'BXVIP-UA': 'wap',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    redirect: 'follow', // manual, *follow, error
    signal: signal
    // referrer: 'no-referrer', // no-referrer, *client
    // body: data // body data type must match "Content-Type" header
  };

  if (method === 'POST') requestInfo.body = data;

  return Promise.race([request(url, requestInfo), timeoutPromise(TIMEOUT)])
    .then(res => {
      return res;
    })
    .catch(err => {
      if (showExpetion) {
        if (err.statusText === 'timeout') {
          toast('请求超时，请重试');
        }
      }

      console.error(err);
      return null;
    });
};

export default Fetch;
