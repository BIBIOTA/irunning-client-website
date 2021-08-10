import strava from 'strava-v3';

const errors = require('request-promise/errors')

strava.config({
  "client_id"     : process.env.VUE_APP_STRAVA_CLIENT_ID,
  "client_secret" : process.env.VUE_APP_STRAVA_CLIENT_SECRET,
  "redirect_uri"  : "http://localhost:8070/Login",
});

export const getRequestAccessURL = async () => {
  const stravaUrl = await strava.oauth.getRequestAccessURL({
    response_type: 'code',
    approval_prompt: 'approval_prompt',
    scope:"activity:read_all",
  })
  window.location.href = stravaUrl;
};

export const getToken = async ({ dispatch }, code) => {
  const payload = await strava.oauth.getToken(code)
    .catch(errors.StatusCodeError, function (e) {
    console.log(e);
  })
  dispatch('login', payload);
};

export const login = async ({ commit }, payload) => {
  console.log(commit);
  console.log(payload);
};