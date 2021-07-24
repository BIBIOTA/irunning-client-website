import { baseRequest } from './axios';

export const aqi = {
  url: 'https://data.epa.gov.tw/api/v1/aqx_p_432?limit=1000&api_key=9be7b239-557b-4c10-9775-78cadfc555e9&sort=ImportDate%20desc&format=json',

  /**
   * 取得空氣品質資料
   */
  getAqi() {
    return baseRequest(this.url)
      .then((res) => {
        if (res) {
          return res.data;
        }
        return 404;
      }).catch((err) => {
        console.log(err);
        return 500;
      });
  },

};
