import { request } from './axios';

export const member = {
  baseUrl: '/member',

  fullUrl(url) {
    return `${this.baseUrl}${url}`;
  },

  /**
   * 取得會員跑步資訊
   */
   index() {
    const url = '/getIndexRunInfo';
    return request(this.fullUrl(url))
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

  /**
   * 取得會員資料
   */
   read() {
    const url = '/';
    return request(this.fullUrl(url))
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

  /**
   * 更新會員資料
   */
   update(data) {
    const url = '/';
    return request(this.fullUrl(url), data, 'put')
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
