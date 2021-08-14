import { request } from './axios';

export const loginApi = {
  baseUrl: '/login',

  fullUrl(url) {
    return `${this.baseUrl}${url}`;
  },

  /**
   * 取得空氣品質資料
   */
   login(data) {
    const url = '/login';
    return request(this.fullUrl(url), data, 'post')
      .then((res) => {
        if (res.status) {
          return res.data;
        }
        return res.data;
      });
  },

};
