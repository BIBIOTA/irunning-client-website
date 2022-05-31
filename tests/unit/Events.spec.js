import Vuetify from 'vuetify';
import Events from '@/views/Events.vue';
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
  })

  it('getData success', async() => {
    const wrapper = mount(Events, {
      localVue,
      vuetify,
      store,
      router,
    });
  
    router.push('/Events/1');

    // TODO event_certificate process
    const dataStructrue = expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String),
        link: expect.any(String),
        event_status: expect.any(Number),
        event_name: expect.any(String),
        event_date: expect.any(String),
        event_time: expect.any(String),
        location: expect.any(String),
        agent: expect.any(String),
        participate: expect.any(String),
        created_at: expect.any(String),
        updated_at: expect.any(String),
        distance: expect.any(Array),
      })
    ]);

    const paginationStructrue = expect.objectContaining({
      data: expect.objectContaining({
        current_page: expect.any(Number),
        data: dataStructrue,
        first_page_url: expect.any(String),
        from: expect.any(Number),
        last_page: expect.any(Number),
        last_page_url: expect.any(String),
        links: expect.any(Array),
        next_page_url: expect.any(String),
        path: expect.any(String),
        per_page: expect.any(Number),
        prev_page_url: expect.any(Object), // null
        to: expect.any(Number),
        total: expect.any(Number),
      }),
      message: expect.any(String),
      status: expect.any(Boolean),
    });

    const getData = await wrapper.vm.getData();

    /* fucntion test */
    expect(getData).toEqual(paginationStructrue);

    /* after fucntion test data */
    expect(wrapper.vm.events).toEqual(dataStructrue);

    expect(wrapper.vm.page).toEqual(getData.data.current_page);

    expect(wrapper.vm.total).toEqual(getData.data.last_page);

  })

  it('getData success', async() => {
    const wrapper = mount(Events, {
      localVue,
      vuetify,
      store,
      router,
    });
  
    router.push('/Events/2000');

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

    router.push('Events/1');

    await wrapper.vm.getData();

    const data = wrapper.vm.events[0];

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

  it('setQuery', async () => {
    const wrapper = mount(Events, {
      localVue,
      vuetify,
      store,
      router,
    });

    query.distances = query.distances.map((distance) => distance.toString());

    const form = {
      page: 1,
      ...query
    };

    await wrapper.vm.setQuery(form);

    expect(wrapper.vm.$route.params.page).toEqual(form.page.toString());

    expect(wrapper.vm.$route.query).toEqual({...query});
    
  })

  it('routerSet', async () => {
    const wrapper = mount(Events, {
      localVue,
      vuetify,
      store,
      router,
    });

    query.distances = query.distances.map((distance) => distance.toString());

    const page = 1;

    await wrapper.vm.routerSet(page, query);

    expect(wrapper.vm.$route.params.page).toEqual(page.toString());

    expect(wrapper.vm.$route.query).toEqual({...query});
    
  })

  it('changePage', async() => {
    const wrapper = mount(Events, {
      localVue,
      vuetify,
      store,
      router,
    });

    router.push('/Events/1');

    const page = 2;

    await wrapper.vm.changePage(page);

    expect(wrapper.vm.$route.params.page).toEqual(page);

    expect(wrapper.vm.page).toEqual(page);
    
  })
})
