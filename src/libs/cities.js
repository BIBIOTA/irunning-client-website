import { request } from './axios';

export const cities = {
  baseUrl: '/cities',

  fullUrl(url) {
    return `${this.baseUrl}${url}`;
  },

  /**
   * 取得所有縣市資料
   */
  getCities() {
    const url = '/getCities';
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
   * 取得縣市下的鄉鎮區
   */
   getDistricts(CityName) {
    const url = '/getDistricts';
    return request(this.fullUrl(url), { CityName })
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
