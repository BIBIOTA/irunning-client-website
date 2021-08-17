import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import moment from 'moment'
import './style/reset.css'
import './style/twicon.css'

Vue.config.productionTip = false

Vue.prototype.moment = moment

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
