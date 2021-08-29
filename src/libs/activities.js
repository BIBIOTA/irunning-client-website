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

  /**
   * 取得單一跑步紀錄
   */
  getActivity(data) {
    const url = '/getActivity';
    return request(this.fullUrl(url), data)
      .then((res) => {
        if (res.status) {
          return res.data;
        }
        return res.data;
      });
  },

};
