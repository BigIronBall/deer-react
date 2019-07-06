import { resolve } from 'q';

const Fetch = {
  get(url, data) {
    return doFetch(url, data);
  },
  post(url, data) {
    return doFetch(url, data, 'POST');
  }
};

const doFetch = (url, data, method = 'GET') => {
  let requestInfo = {
    method: method || 'POST', // *GET, POST, PUT, DELETE, etc.
    // mode: 'same-origin', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'BXVIP-UA': 'wap',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    redirect: 'follow' // manual, *follow, error
    // referrer: 'no-referrer', // no-referrer, *client
    // body: data // body data type must match "Content-Type" header
  };

  if (method === 'POST') requestInfo.body = data;
  return fetch(url, requestInfo)
    .then(response => {
      // debugger;
      return response.json();
    }) // parses response to JSON
    .catch(err => {
      // vue.$dialog.loading.close();
      // vue.$dialog.toast({
      //   mes: '网络断开'
      // });
      // debugger;
      console.error(err);
      // reject(err);
    })
    .then(
      response => {
        // debugger;
        return resolve(response.data);
      }
      // processResponse(response, params, isShowErr, resolve, reject)
    );
};

export default Fetch;
