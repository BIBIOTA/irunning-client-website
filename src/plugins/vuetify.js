import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

import colors from 'vuetify/lib/util/colors'

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.blue.lighten3, // #90CAF9
        secondary: '#F64906', // #orange
        accent: colors.green.darken2, // #388E3C
      },
    },
    options: { customProperties: true },
  },
});
