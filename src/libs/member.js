import { request } from './axios';

export const member = {
  baseUrl: '/member',

  fullUrl(url) {
    return `${this.baseUrl}${url}`;
  },

  /**
   * 取得會員跑步資訊
   */
   index(memberUuid) {
    const url = `/${memberUuid}/getIndexRunInfo`;
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
   read(memberUuid) {
    const url = `/${memberUuid}`;
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
   update(memberUuid, data) {
    const url = `/${memberUuid}`;
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
