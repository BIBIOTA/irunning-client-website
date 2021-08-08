import { request } from './axios';

export const weather = {
  baseUrl: '/weather',

  fullUrl(url) {
    return `${this.baseUrl}${url}`;
  },

  /**
   * 取得所有天氣資料
   */
  getWeather(CityName, AreaName) {
    const url = '/getWeather';
    return request(this.fullUrl(url), { CityName, AreaName })
      .then((res) => {
        if (res.status) {
          return res.data;
        }
        return res.data;
      });
  },

};
