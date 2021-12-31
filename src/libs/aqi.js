import { request } from './axios';

export const aqi = {
  baseUrl: '/aqi',

  /**
   * 取得空氣品質資料
   */
  getAqis(city_id) {
    return request(this.baseUrl, { city_id })
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
