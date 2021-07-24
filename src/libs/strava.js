import strava from 'strava-v3';

strava.config({
  "access_token"  : "94154958ff5afa9ef4111ba26e2fb5bfc9983d61",
  "client_id"     : "68055",
  "client_secret" : "4222100739f8aeecfe2bd2c2df077e5ec5a6b46c",
  "redirect_uri"  : "http://localhost:8070",
});

export const stravaApi = {
  // 繼承基礎物件
  extends: strava,

  getData () {
    const payload = strava.athlete.get({});
    console.log(payload);
  },
  
};
