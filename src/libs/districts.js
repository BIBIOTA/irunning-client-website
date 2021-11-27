import { request } from './axios';

export const districts = {
  baseUrl: '/districts',

  /**
   * 取得縣市下的鄉鎮區
   */
   getDistricts(CityName) {
    return request(this.baseUrl, { CityName })
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
