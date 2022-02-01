<template>
  <v-sheet
    :color="transblack"
    height="100%"
    class="margin auto"
    tile
  >
    <v-row
      class="fill-height flex-column"
      align="center"
      justify="center"
      column
    >
      <v-card color="rgba(13, 152, 186, 0.8)" class="pa-2">
        <div
          class="py-6 text-h4 font-weight-bold white--text text-center">
          最近有什麼賽事?
        </div>
        <div
          class="pb-6 text-subtitle-1 font-weight-bold white--text text-center">
          全國各地全馬、半馬、超馬賽事資訊報你知！
        </div>
        <template v-if="events.length > 0">
          <v-list-item v-for="(event, i) in events" :key="`events_${i}`" class="px-10">
            <v-list-item-content>
              <v-list-item-title class="white--text">{{event.event_name}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-card>
      <router-link :to="{ name: 'Events', params: { page: 1 } }" class="mt-5">
        <v-btn
          class="white--text text-h5 py-6"
          @click="$emit('closeIntro')"
          color="rgba(13, 152, 186, 0.8)"
        >
          立即搜尋
        </v-btn>
      </router-link>
    </v-row>
  </v-sheet>
</template>
<script>
export default {
  name: 'IntroSectionThree',
  props: {
    transblack: {
      type: String,
      required: true,
    },
    events: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
    }
  },
}
</script>