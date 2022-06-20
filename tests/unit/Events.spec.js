import Vuetify from 'vuetify';
import Events from '@/views/Events.vue';
import { events } from '../../src/libs/events';
import store from '@/store';
import { createLocalVue, mount } from '@vue/test-utils';
import router from '../../src/router';
import _ from 'lodash';



const query = {
  startDay: '2022-01-01',
  endDay: '2022-01-31',
  distances: [1, 2, 3],
  keywords: '臺北',
};

describe('Event.vue', () => {

  const localVue = createLocalVue()
  let vuetify


  beforeEach(() => {
    vuetify = new Vuetify();
    window.gapi = {
      load() { }
    }    
  });

  const mockData = {
    "status": true,
    "message": "ok",
    "data": {
        "current_page": 1,
        "data": [
            {
                "id": "6289f2a019015",
                "link": "https://www.ctrun.com.tw/pageO.aspx?CF_ActCode=CZ220626&id=5795",
                "event_status": 1,
                "event_name": "2022 DADA RUN 皇冠路跑趣-桃園站",
                "event_info": null,
                "event_certificate": null,
                "event_date": "2022-06-26",
                "event_time": "06:00:00",
                "location": "桃園市新屋區農博環境教育園區",
                "agent": "臺灣運動賽事協會",
                "participate": "已截止",
                "entry_is_end": 1,
                "entry_start": null,
                "entry_end": null,
                "created_at": "2022-05-22T08:21:52.000000Z",
                "updated_at": "2022-06-08T17:01:48.000000Z",
                "distance": [
                    {
                        "id": 62,
                        "event_id": "6289f2a019015",
                        "event_distance": null,
                        "distance": "10K",
                        "event_price": null,
                        "event_limit": null,
                        "created_at": "2022-06-19T17:01:41.000000Z",
                        "updated_at": "2022-06-19T17:01:41.000000Z"
                    },
                    {
                        "id": 62,
                        "event_id": "6289f2a019015",
                        "event_distance": null,
                        "distance": "4K",
                        "event_price": null,
                        "event_limit": null,
                        "created_at": "2022-06-19T17:01:41.000000Z",
                        "updated_at": "2022-06-19T17:01:41.000000Z"
                    }
                ]
            },
        ],
        "first_page_url": "http://irunningapi.bibiota.com/api/events?page=1",
        "from": 1,
        "last_page": 8,
        "last_page_url": "http://irunningapi.bibiota.com/api/events?page=8",
        "links": [
            {
                "url": null,
                "label": "&laquo; Previous",
                "active": false
            },
            {
                "url": "http://irunningapi.bibiota.com/api/events?page=1",
                "label": "1",
                "active": true
            },
            {
                "url": "http://irunningapi.bibiota.com/api/events?page=2",
                "label": "2",
                "active": false
            },
            {
                "url": "http://irunningapi.bibiota.com/api/events?page=3",
                "label": "3",
                "active": false
            },
            {
                "url": "http://irunningapi.bibiota.com/api/events?page=4",
                "label": "4",
                "active": false
            },
            {
                "url": "http://irunningapi.bibiota.com/api/events?page=5",
                "label": "5",
                "active": false
            },
            {
                "url": "http://irunningapi.bibiota.com/api/events?page=6",
                "label": "6",
                "active": false
            },
            {
                "url": "http://irunningapi.bibiota.com/api/events?page=7",
                "label": "7",
                "active": false
            },
            {
                "url": "http://irunningapi.bibiota.com/api/events?page=8",
                "label": "8",
                "active": false
            },
            {
                "url": "http://irunningapi.bibiota.com/api/events?page=2",
                "label": "Next &raquo;",
                "active": false
            }
        ],
        "next_page_url": "http://irunningapi.bibiota.com/api/events?page=2",
        "path": "http://irunningapi.bibiota.com/api/events",
        "per_page": 30,
        "prev_page_url": null,
        "to": 30,
        "total": 213
    }
};
  
  const mockNotFound = {
    data: null,
    status: false,
    message: 'not found'
  };

  it('getData success', async() => {
    const wrapper = mount(Events, {
      localVue,
      vuetify,
      store,
      router,
    });

    router.push('/Events/1');

    jest.spyOn(events, 'getEvents').mockImplementation(() => {
      return Promise.resolve(mockData);
    });

    const result = await wrapper.vm.getData();

    expect(result.data.data).toEqual(mockData.data.data);

    expect(wrapper.vm.page).toEqual(mockData.data.current_page);

    expect(wrapper.vm.total).toEqual(mockData.data.last_page);

  })

  it('getData not found', async() => {
    const wrapper = mount(Events, {
      localVue,
      vuetify,
      store,
      router,
    });
  
    router.push('/Events/1');

    jest.spyOn(events, 'getEvents').mockImplementation(() => {
      return Promise.resolve(mockNotFound);
    });

    const getData = await wrapper.vm.getData();
    /* fucntion test */
    expect(getData.message).toEqual('not found');
    expect(getData.status).toEqual(false);

    /* after fucntion test data */
    expect(wrapper.vm.events).toEqual([]);

    expect(wrapper.vm.page).toEqual(1);

    expect(wrapper.vm.total).toEqual(1);

  })

  it('getQuery', async() => {
    const wrapper = mount(Events, {
      localVue,
      vuetify,
      store,
      router,
    });
  
    router.push(`Events/1?startDay=${query.startDay}&endDay=${query.endDay}&distances=${query.distances[0]}&distances=${query.distances[1]}&distances=${query.distances[2]}&keywords=${query.keywords}`);

    /* fucntion test */
    await wrapper.vm.getQuery();

    /* after fucntion test data */
    expect(wrapper.vm.search.date).toEqual([query.startDay, query.endDay]);

    expect(wrapper.vm.search.distances).toEqual(query.distances);

    expect(wrapper.vm.search.keywords).toEqual(query.keywords);

  })

  it('getCertificateImg', async () => {
    const wrapper = mount(Events, {
      localVue,
      vuetify,
      store,
      router,
    });

    const inputsImg = [
      {
        value: 1,
        img: wrapper.vm.iaaf,
      },
      {
        value: 2,
        img: wrapper.vm.aims,
      },
      {
        value: 3,
        img: wrapper.vm.courseOk,
      },
    ];

    router.push('Events/1');

    for (let i = 0; i <= inputsImg.length - 1; i++) {
      const result = await wrapper.vm.getCertificateImg(inputsImg[i].value);
      expect(result).toEqual(inputsImg[i].img);
    }
  })

  it('cleardateRangeText', async () => {
    const wrapper = mount(Events, {
      localVue,
      vuetify,
      store,
      router,
    });

    router.push(`Events/1?startDay=${query.startDay}&endDay=${query.endDay}&distances=${query.distances[0]}&distances=${query.distances[1]}&distances=${query.distances[2]}&keywords=${query.keywords}`);

    await wrapper.vm.cleardateRangeText();

    expect(wrapper.vm.search.date).toEqual([]);
    expect(wrapper.vm.dateRangeText).toEqual(null);
    
  })

  it('getDateRangeText', async () => {
    const wrapper = mount(Events, {
      localVue,
      vuetify,
      store,
      router,
    });

    router.push(`Events/1?startDay=${query.startDay}&endDay=${query.endDay}&distances=${query.distances[0]}&distances=${query.distances[1]}&distances=${query.distances[2]}&keywords=${query.keywords}`);

    await wrapper.vm.getDateRangeText();

    expect(wrapper.vm.dateRangeText).toEqual(`${query.startDay} ~ ${query.endDay}`);
    
  })

  it('processEventData', async () => {
    const wrapper = mount(Events, {
      localVue,
      vuetify,
      store,
      router,
    });

    const data = mockData.data.data[0];

    await wrapper.vm.processEventData(data);

    const dataName = {
      event_date: '舉辦日期',
      event_time: '起跑時間',
      location: '地點',
      distance: '里程',
      agent: '承辦單位',
      participate: '報名日期',
      link: '報名連結',
    };    

    const arr = []
    Object.keys(dataName).forEach((nameKey) => {
        Object.keys(data).forEach((key) => {
        if (key === nameKey) {
          const obj = {};
          _.set(obj, 'name', dataName[nameKey]);
          _.set(obj, 'value', data[key]);
          arr.push(obj);
        }
      });
    });

    expect(wrapper.vm.dialogTitle).toEqual({
      event_name: data.event_name,
      event_status: data.event_status,
      event_certificate: data.event_certificate,
    });

    expect(wrapper.vm.event).toEqual(arr);
    
  })

  it('getSearchData', async () => {
    const wrapper = mount(Events, {
      localVue,
      vuetify,
      store,
      router,
    });

    router.push(`Events/1?startDay=${query.startDay}&endDay=${query.endDay}&distances=${query.distances[0]}&distances=${query.distances[1]}&distances=${query.distances[2]}&keywords=${query.keywords}`);

    await wrapper.vm.getQuery();

    const form = await wrapper.vm.getSearchData();

    expect(form).toEqual({
      startDay: query.startDay,
      endDay: query.endDay,
      distances: query.distances,
      keywords: query.keywords,
    });
    
  })

  it('changePage', async() => {
    const wrapper = mount(Events, {
      localVue,
      vuetify,
      store,
      router,
    });

    router.push('/Events/1');

    mockData.data.current_page = 2;

    jest.spyOn(events, 'getEvents').mockImplementation(() => {
      return Promise.resolve(mockData);
    });

    const page = 2;

    await wrapper.vm.changePage(2);

    expect(wrapper.vm.$route.params.page).toEqual(page);

    expect(wrapper.vm.page).toEqual(page);
    
  })
})
