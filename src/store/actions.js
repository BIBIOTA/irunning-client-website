import strava from 'strava-v3';
import { loginApi } from '../libs/login.js';
import Cookies from 'js-cookie';
import moment from 'moment';

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

export const getToken = async ({ dispatch, commit}, code) => {
  const payload = await strava.oauth.getToken(code)
    .catch(errors.StatusCodeError, function (e) {
    commit('setError', e);
  })
  const res = await dispatch('login', payload);
  if (res) {
    return true
  }
  return false;
};

export const login = async ({ commit }, payload) => {
  return await loginApi.login(payload).then((res) => {
    if (res.status) {
      const expires = moment(res.data.expires_at).toDate();
      Cookies.set('member', JSON.stringify(res.data), { expires });
      commit('setLoginData', res.data);
      commit('setIsLogin', true);
      return true;
    } else {
      commit('setError', res.message);
      return false;
    }
  });
};