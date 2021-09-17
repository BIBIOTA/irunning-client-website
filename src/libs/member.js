import { request } from './axios';

export const member = {
  baseUrl: '/member',

  fullUrl(url) {
    return `${this.baseUrl}${url}`;
  },

  /**
   * 取得會員跑步資訊
   */
   index(id) {
    const url = '/index';
    return request(this.fullUrl(url), { id })
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
