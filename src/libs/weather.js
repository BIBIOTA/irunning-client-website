import { request } from './axios';

export const weather = {
  baseUrl: '/weather',

  /**
   * 取得所有天氣資料
   */
  getWeather(district_id) {
    return request(this.baseUrl, { district_id })
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
