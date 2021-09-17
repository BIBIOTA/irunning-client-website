import { request } from './axios';

export const index = {
  baseUrl: '/index',

  fullUrl(url) {
    return `${this.baseUrl}${url}`;
  },

  /**
   * 取得最近五個賽事
   */
  getIndexEvents(data) {
    const url = '/getIndexEvents';
    return request(this.fullUrl(url), data)
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
