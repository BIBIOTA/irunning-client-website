import Vue from 'vue';
import Vuetify from 'vuetify';
import moment from 'moment';

Vue.config.productionTip = false;
Vue.use(Vuetify);

Vue.prototype.moment = moment;

const noop = () => {};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });
