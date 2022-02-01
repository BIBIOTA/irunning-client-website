import { request } from './axios';

export const images = {
  baseUrl: '/image',

  fullUrl(url) {
    return `${this.baseUrl}${url}`;
  },

  /**
   * 取得隨機天氣圖片
   */
   getRamdomWeatherImage(count) {
    const url = '/getRamdomWeatherImage';
    return request(this.fullUrl(url), { count })
      .then((res) => {
        return res.data;
      }).catch((err) => {
        return {
          message: err,
          status: false,
        };
      });
  },

};
