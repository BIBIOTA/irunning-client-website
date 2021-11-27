import { request } from './axios';

export const weather = {
  baseUrl: '/weather',

  /**
   * 取得所有天氣資料
   */
  getWeather(CityName, AreaName) {
    return request(this.baseUrl, { CityName, AreaName })
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
