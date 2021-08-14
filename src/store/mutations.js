import Cookies from 'js-cookie'

export const setOverlay = (state, data) => {
  state.overlay = data;
};

export const setAqi = (state, data) => {
  state.aqi = data;
};

export const setArea = (state, data) => {
  state.area = data;
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
  }
};

export const setLoginData = (state, data) => {
  state.loginData = data;
}