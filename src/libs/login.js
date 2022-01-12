import { request } from './axios';

export const loginApi = {
  baseUrl: '',

  fullUrl(url) {
    return `${this.baseUrl}${url}`;
  },

  login(data) {
    const url = '/login';
    return request(this.fullUrl(url), data, 'post')
      .then((res) => {
        if (res.status) {
          return res.data;
        }
        return res.data;
      }).catch((err) => {
        return {
          message: err,
          status: false,
        };
      });
  },

  logout() {
    const url = '/logout';
    return request(this.fullUrl(url), null, 'post')
      .then((res) => {
        if (res.status) {
          return res.data;
        }
        return res.data;
      }).catch((err) => {
        return {
          message: err,
          status: false,
        };
      });
  },

};
