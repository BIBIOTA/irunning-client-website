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
    const url = '/';
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

  /**
   * 取得單一跑步紀錄
   */
  getActivity(memberUuid, runningUuid) {
    const url = `/${memberUuid}/${runningUuid}`;
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

};
