import Cookies from 'js-cookie';
import moment from 'moment';

export const setOverlay = (state, data) => {
  state.overlay = data;
};

export const setNoData = (state, data) => {
  state.noData = data;
}

export const setLoading = (state, data) => {
  if (data) {
    state.noData = false;
  }
  state.loading = data;
}

export const setAqi = (state, data) => {
  state.aqi = data;
};

export const setArea = (state, data) => {
  const { city_name = null, district_name = null, aqi_name = null } = data;
  if (city_name) {
    state.area.city_name = data.city_name
  }
  if (district_name) {
    state.area.district_name = data.district_name
  }
  if (aqi_name) {
    state.area.aqi_name = data.aqi_name
  }
};

export const setWeather = (state, data) => {
  state.weather = data;
};

export const setError = (state, data) => {
  state.error = data;
  setTimeout(() => {
    state.error = false;
  }, 3000);
};

export const setIsLogin = (state, status) => {
  state.login = status;
  if (!status) {
    Cookies.remove('member');
    Cookies.remove('area');
  }
};

export const setLoginData = (state, data) => {
  state.loginData = data;
}

export const setCookies = (state, data) => {
  const expires = moment(data.expires_at).toDate();
  Cookies.set('member', JSON.stringify(data), { expires });
}
