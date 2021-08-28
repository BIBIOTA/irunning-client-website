import { request } from './axios';

export const activities = {
  baseUrl: '/activities',

  fullUrl(url) {
    return `${this.baseUrl}${url}`;
  },

  /**
   * 取得跑步紀錄
   */
  getActivities(data) {
    const url = '/getActivities';
    return request(this.fullUrl(url), data)
      .then((res) => {
        if (res.status) {
          return res.data;
        }
        return res.data;
      });
  },

};
