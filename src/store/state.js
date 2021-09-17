import Cookies from 'js-cookie';

export default function () {
  return {

    // 系統參數
    overlay: false,
    success: false,
    error: false,
    loading: false,
    noData: false,
    // 系統參數

    // 會員登入資訊
    login: false,
    loginData: Cookies.get('member')?JSON.parse(Cookies.get('member')):false,
    // 會員登入資訊

    // 資料
    area: {
      county: '',
      district: '',
      siteName: '',
    },
    aqi: {},
    weather: {},
    // 資料
    
  };
}
