import axios from 'axios';

let AUTH_TOKEN = null;

// 封裝
export function request(url, data = false, method = 'get', token = AUTH_TOKEN, headers = {}) {
  if (token !== null) {
    headers = {
      ...headers,
      authorization: `Bearer ${token}`,
    };
  }
  let req = {
    /* eslint-disable no-undef */
    baseURL: API_URL, // process.env.API,
    /* eslint-disable no-undef */
    url,
    method,
    headers,
    Accept: 'application/json, text/plain, */*',
    mode: 'no-cors',
  };
  if (['get'].includes(method) && data !== false) {
    req.params = data;
  }
  if (['put', 'post'].includes(method) && data !== false) {
    headers = {
      ...headers,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    req = { ...req, data: qs.stringify(data), headers };
  }

  return axios(req)
    .then((response) => {
      const errArr = ['FAILURE_CREDENTIALS_MISSING', 'FAILURE_IDENTITY_NOT_FOUND'];
      if (errArr.includes(response.data.message)) {
        const loginData = Cookies.getAll();
        Object.keys(loginData).forEach((key) => {
          Cookies.remove(key, loginData[key]);
        });
        AUTH_TOKEN = null;
        const domain = window.location.origin;
        const currhash = window.location.hash;
        if (currhash !== '#/') {
          window.location.replace(`${domain}/`);
        }
      } return response;
    })
    .catch((err) => err.response);
}

// 封裝
export function baseRequest(baseURL, url, data = false, method = 'get', token = AUTH_TOKEN, headers = {}) {
  if (token !== null) {
    headers = {
      ...headers,
      authorization: `Bearer ${token}`,
    };
  }
  let req = {
    baseURL,
    url,
    method,
    headers,
    Accept: 'application/json, text/plain, */*',
    mode: 'no-cors',
  };
  if (['get'].includes(method) && data !== false) {
    req.params = data;
  }
  if (['put', 'post'].includes(method) && data !== false) {
    headers = {
      ...headers,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    req = { ...req, data: qs.stringify(data), headers };
  }

  return axios(req)
    .then((response) => {
      const errArr = ['FAILURE_CREDENTIALS_MISSING', 'FAILURE_IDENTITY_NOT_FOUND'];
      if (errArr.includes(response.data.message)) {
        const loginData = Cookies.getAll();
        Object.keys(loginData).forEach((key) => {
          Cookies.remove(key, loginData[key]);
        });
        AUTH_TOKEN = null;
        const domain = window.location.origin;
        const currhash = window.location.hash;
        if (currhash !== '#/') {
          window.location.replace(`${domain}/`);
        }
      } return response;
    })
    .catch((err) => err.response);
}