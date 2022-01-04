import Vuetify from 'vuetify';
import LocationPopup from '@/components/LocationPopup.vue';
import store from '@/store';
import { createLocalVue, mount } from '@vue/test-utils';

describe('LocationPopup.vue', () => {

  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  const failStructrue = expect.objectContaining({
    status: expect.any(false),
    message: expect.any(String),
    data: expect.any(null),
  })

  it('getCities', async () => {
    const wrapper = mount(LocationPopup, {
      localVue,
      vuetify,
      store,
    });

    const citiesStructrue = expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String),
        city_name: expect.any(String),
        dataid: expect.any(String),
        created_at: expect.any(String),
        updated_at: expect.any(String),
      })
    ]);

    /* default data */
    expect(wrapper.vm.cities).toEqual([]);

    /* fucntion test */
    expect(await wrapper.vm.getCities()).toEqual(citiesStructrue);

    /* after fucntion test data */
    expect(wrapper.vm.cities).toEqual(citiesStructrue);

  })

  it('getDistricts', async () => {
    const wrapper = mount(LocationPopup, {
      localVue,
      vuetify,
      store,
    });

    const districtsStructrue = expect.arrayContaining([
      expect.objectContaining({
        city_id: expect.any(String),
        created_at: expect.any(String),
        dataid: expect.any(String),
        district_name: expect.any(String),
        id: expect.any(String),
        updated_at: expect.any(String),
      })
    ]);

    /* default data */
    await expect(wrapper.vm.districts).toEqual([]);

    /* fucntion test fail */
    await expect(await wrapper.vm.getDistricts(null)).toEqual(false);

    const cities = await wrapper.vm.getCities();
    
    /* fucntion test getcities then send city_id wail be success */
    cities.forEach(async(item) => {
      await expect(await wrapper.vm.getDistricts(item.id)).toEqual(districtsStructrue);
      await expect(wrapper.vm.districts).toEqual(districtsStructrue);
    });

  })

  it('getCurrentPosition', async () => {
    const wrapper = mount(LocationPopup, {
      localVue,
      vuetify,
      store,
    });

    /* navigator fail test */
    if (!navigator.geolocation) {
      await expect(await wrapper.vm.getCurrentPosition()).toEqual(false);
      await expect(await wrapper.vm.point).toEqual(null);
    }

    //TODO navigator geo測試
  })

  const testGeoPosition = [121.7685823, 25.132778];

  it('getGeoLocationCityAndDistrict', async () => {
    const wrapper = mount(LocationPopup, {
      localVue,
      vuetify,
      store,
    });


    /* test api fail */
    await expect(await wrapper.vm.getGeoLocationCityAndDistrict()).toEqual(false);

    await expect(await wrapper.vm.getGeoLocationCityAndDistrict([2000, 2000])).toEqual(false);
    /* test api fail end */

    /* TEST POSITION */
    wrapper.vm.point = testGeoPosition;
    
    /* test api sucess */
    await expect(await wrapper.vm.getGeoLocationCityAndDistrict(wrapper.vm.point)).toEqual(expect.objectContaining({
      city_name: expect.any(String),
      district_name: expect.any(String),
    }));

  })

  const aqiStructrue = expect.objectContaining({
    AQI: expect.any(String),
    CO: expect.any(String),
    CO_8hr: expect.any(String),
    ImportDate: expect.any(String),
    Latitude: expect.any(String),
    Longitude: expect.any(String),
    NO: expect.any(String),
    NO2: expect.any(String),
    NOx: expect.any(String),
    O3: expect.any(String),
    O3_8hr: expect.any(String),
    PM2_5: expect.any(String),
    PM2_5_AVG: expect.any(String),
    PM10: expect.any(String),
    PM10_AVG: expect.any(String),
    Pollutant: expect.any(String),
    PublishTime: expect.any(String),
    SO2: expect.any(String),
    SO2_AVG: expect.any(String),
    SiteId: expect.any(String),
    SiteName: expect.any(String),
    Status: expect.any(String),
    WindDirec: expect.any(String),
    WindSpeed: expect.any(String),
    city_id: expect.any(String),
    created_at: expect.any(String),
    id: expect.any(String),
    updated_at: expect.any(String),
  });

  const aqisStructrue = expect.arrayContaining([
    aqiStructrue,
  ]);

  it('getAqis', async () => {
    const wrapper = mount(LocationPopup, {
      localVue,
      vuetify,
      store,
    });

    /* default data */
    await expect(wrapper.vm.aqis).toEqual([]);

    /* fucntion test fail */
    await expect(await wrapper.vm.getAqis(null)).toEqual(false);

    const cities = await wrapper.vm.getCities();
    
    /* fucntion test getcities then send city_id wail be success */
    cities.forEach(async(item) => {
      await expect(await wrapper.vm.getAqis(item.id)).toEqual(aqisStructrue);
      await expect(wrapper.vm.aqis).toEqual(aqisStructrue);
    });

  })

  it('getAqi', async () => {
    const wrapper = mount(LocationPopup, {
      localVue,
      vuetify,
      store,
    });

    const cities = await wrapper.vm.getCities();
    
    /* api success test */
    cities.forEach(async(item) => {
      await wrapper.vm.getAqis(item.id)
      const aqis = wrapper.vm.aqis;
      aqis.map(async(aqi) => {
        await expect(wrapper.vm.getAqi(aqi.SiteName)).toEqual(aqiStructrue);
      });
    });

    /* api fail test */
    await expect(wrapper.vm.getAqi(null)).toEqual(false);

    await expect(wrapper.vm.getAqi('any string')).toEqual(false);

  })

  it('getGPSAqiPosition', async () => {
    const wrapper = mount(LocationPopup, {
      localVue,
      vuetify,
      store,
    });

    /* TEST POSITION */
    wrapper.vm.point = testGeoPosition;
    
    await expect(await wrapper.vm.point).toEqual([expect.any(Number), expect.any(Number)]);

    const cities = await wrapper.vm.getCities();
    
    /* fucntion test getcities then send city_id wail be success */
    cities.forEach(async(item) => {
      await expect(await wrapper.vm.getAqis(item.id)).toEqual(aqisStructrue);
      await expect(wrapper.vm.getGPSAqiPosition(wrapper.vm.point, wrapper.vm.aqis)).toEqual(aqiStructrue);
    });

  })

  it('getWeather', async () => {
    const wrapper = mount(LocationPopup, {
      localVue,
      vuetify,
      store,
    });

    const weatherStructrue = expect.objectContaining({
      AT: expect.any(String),
      CI: expect.any(String),
      T: expect.any(String),
      Wx: expect.any(String),
      WxValue: expect.any(String),
      city: expect.any(String),
      district: expect.any(String),
      updated_at: expect.any(String),
    });

    const cities = await wrapper.vm.getCities();
    
    const districtsIds = [];
    /* fucntion test getcities then send city_id wail be success */
    /* store districts_ids */
    cities.forEach(async(item) => {
      await wrapper.vm.getDistricts(item.id);
      const ids = wrapper.vm.districts.map((item) => item.id);
      districtsIds.push(ids);
    });

    /* test api success */
    if (districtsIds.length > 0) {
      districtsIds.forEach(async(id) => {
        expect(await wrapper.vm.getWeather(id)).toEqual(weatherStructrue);
      });
    }

    /* test api fail */
    await expect(await wrapper.vm.getWeather("fake")).toEqual(false);

  })
})
