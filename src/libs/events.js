import { request } from './axios';

export const events = {
  baseUrl: '/events',

  /**
   * 取得賽事活動
   */
  getEvents(formData) {
    return request(this.baseUrl, formData)
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
