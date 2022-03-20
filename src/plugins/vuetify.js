import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

import colors from 'vuetify/lib/util/colors'

export default new Vuetify({
  breakpoint: {
    thresholds: {
      xs: 340,
      sm: 540,
      md: 768,
      lg: 1280,
    },
    mobileBreakpoint: 768,
  },
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
