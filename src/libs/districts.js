import { request } from './axios';

export const districts = {
  baseUrl: '/districts',

  /**
   * 取得縣市下的鄉鎮區
   */
   getDistricts(city_id) {
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
