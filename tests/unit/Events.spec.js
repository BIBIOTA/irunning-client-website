import Vuetify from 'vuetify';
import Events from '@/views/Events.vue';
import store from '@/store';
import { createLocalVue, mount } from '@vue/test-utils';
import router from '../../src/router';

describe('Event.vue', () => {

  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('getData success', async () => {
    const wrapper = mount(Events, {
      localVue,
      vuetify,
      store,
      router,
    });
  
    router.push('/Events/1');

    const dataStructrue = expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String),
        link: expect.any(String),
        event_status: expect.any(Number),
        event_name: expect.any(String),
        event_certificate: expect.any(Number),
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

  it('getData success', async () => {
    const wrapper = mount(Events, {
      localVue,
      vuetify,
      store,
      router,
    });
  
    router.push('/Events/2000');

    const getData = await wrapper.vm.getData();
    /* fucntion test */
    expect(getData.message).toEqual('查無任何資料');
    expect(getData.status).toEqual(false);

    /* after fucntion test data */
    expect(wrapper.vm.events).toEqual([]);

    expect(wrapper.vm.page).toEqual(1);

    expect(wrapper.vm.total).toEqual(1);

  })
})
