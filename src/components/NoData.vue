<template>
  <v-card
    v-if="noData"
    class="py-2 text-center"
  >
    無資料
  </v-card>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'NoData',
  computed: {
    ...mapState([
      'noData',
    ]),
  },
}
</script>