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
  state.area.county = data.county;
  state.area.district = data.district
  state.area.siteName = data.siteName;
  Cookies.set('area', JSON.stringify(state.area));
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
