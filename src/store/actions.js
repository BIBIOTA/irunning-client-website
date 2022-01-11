import strava from 'strava-v3';
import { loginApi } from '../libs/login.js';
const errors = require('request-promise/errors')

strava.config({
  "client_id"     : process.env.VUE_APP_STRAVA_CLIENT_ID,
  "client_secret" : process.env.VUE_APP_STRAVA_CLIENT_SECRET,
  "redirect_uri"  : `${process.env.VUE_APP_REDIRECT_URI}/Login`,
});

export const getRequestAccessURL = async () => {
  const stravaUrl = await strava.oauth.getRequestAccessURL({
    response_type: 'code',
    approval_prompt: 'approval_prompt',
    scope:"activity:read_all",
  })
  window.location.href = stravaUrl;
};

export const getToken = ({ commit }, code) => {
  return strava.oauth.getToken(code)
    .then((payload) => {
      return payload;
    })
    .catch(errors.StatusCodeError, function (e) {
    commit('setError', e);
    return false;
  })
};

export const login = ({ commit }, payload) => {
  return loginApi.login(payload).then(async(res) => {
    if (res.status) {
      await commit('setCookies', res.data);
      await commit('setIsLogin', true);
      return true;
    } else {
      commit('setError', res.message);
      return false;
    }
  });
};

export const actionLogout = async ({ commit }) => {
  return await loginApi.logout().then((res) => {
    if (res.status) {
      commit('setIsLogin', false);
      return true;
    } else {
      commit('setError', res.message);
      return false;
    }
  });
};