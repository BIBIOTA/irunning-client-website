import { request } from './axios';

export const aqi = {
  baseUrl: '/aqi',

  fullUrl(url) {
    return `${this.baseUrl}${url}`;
  },

  /**
   * 取得空氣品質資料
   */
  getAqi(County) {
    const url = '/getAqiList';
    return request(this.fullUrl(url), { County })
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
