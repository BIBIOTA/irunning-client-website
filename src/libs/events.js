import { request } from './axios';

export const events = {
  baseUrl: '/events',

  fullUrl(url) {
    return `${this.baseUrl}${url}`;
  },

  /**
   * 取得賽事活動
   */
  getEvents(formData) {
    const url = '/getEvents';
    return request(this.fullUrl(url), formData)
      .then((res) => {
        if (res.status) {
          return res.data;
        }
        return res.data;
      });
  },

};
