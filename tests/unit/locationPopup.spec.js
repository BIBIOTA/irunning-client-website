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

    expect(wrapper.vm.cities).toEqual([]);

    expect(await wrapper.vm.getCities()).toEqual(citiesStructrue);

    expect(wrapper.vm.cities).toEqual(citiesStructrue);

  })
})
