import Vuetify from 'vuetify';
import Vuex from 'vuex';
import Aqi from '@/components/Aqi.vue';
import { createLocalVue, mount } from '@vue/test-utils';

const aqi = {
    "id": "628d109f76138",
    "city_id": "62865ecf33da8",
    "sitename": "士林",
    "aqi": "38",
    "pollutant": "",
    "status": "良好",
    "so2": "0.3",
    "co": "0.32",
    "co_8hr": "0.4",
    "o3": "26.8",
    "o3_8hr": "35.9",
    "pm10": "11",
    "pm2_5": "6",
    "no2": "13.1",
    "nox": "14.9",
    "no": "1.7",
    "wind_speed": "0.3",
    "wind_direc": "241",
    "publishtime": "2022/06/09 20:00:00",
    "pm2_5_avg": "11",
    "pm10_avg": "17",
    "so2_avg": "0",
    "longitude": "121.515389",
    "latitude": "25.105417",
    "siteid": "11",
    "created_at": "2022-05-24T17:06:39.000000Z",
    "updated_at": "2022-06-09T13:01:36.000000Z"
};

describe('Aqi.vue', () => {

  const localVue = createLocalVue();
  localVue.use(Vuex);

  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
    window.gapi = {
      load() { }
    }    
  });

  it('render page', async() => {
    const wrapper = mount(Aqi, {
      localVue,
      vuetify,
      mocks: {
        $store: {
          state: {
            aqi,
          }
        }
      }
    });

    const expectLists = {
      aqi: {
        name: 'AQI',
        value: "38",
        color: 'green darken-2',
        icon: 'mdi-emoticon-happy',
      },
      pm2_5: {
        name: 'PM2.5',
        value: "6",
        color: 'green darken-2',
        icon: 'mdi-emoticon-happy',
      },
      pm10: {
        name: 'PM10',
        value: "11",
        color: 'green darken-2',
        icon: 'mdi-emoticon-happy',
      },
    };
    const expectStatus = '良好';

    expect(wrapper.vm.lists).toEqual(expectLists);
    expect(wrapper.vm.status).toEqual(expectStatus);
  });

  it('render page when no aqi data', async() => {
    const wrapper = mount(Aqi, {
      localVue,
      vuetify,
      mocks: {
        $store: {
          state: {
            aqi: {},
          }
        }
      }
    });

    expect(wrapper.find('.v-progress-circular').exists()).toBe(true);
  });
})
