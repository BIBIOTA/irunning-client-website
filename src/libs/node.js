import { nodeRequest } from './axios';

export const node = {
  /**
   * 回傳定位的鄉鎮區
   */
  district(data) {
    const url = '/district';
    return nodeRequest(url, data)
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
