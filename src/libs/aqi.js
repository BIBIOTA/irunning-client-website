import { request } from './axios';

export const aqi = {
  baseUrl: '/aqi',

  /**
   * 取得空氣品質資料
   */
  getAqi(County) {
    return request(this.baseUrl, { County })
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
