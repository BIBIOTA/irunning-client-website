<template>
  <div>
    <v-card
      max-width="344"
    >
      <RunningInfo :data="activity" :moreInfo="true" />
    </v-card>
  </div>
</template>
<script>
import RunningInfo from '../components/RunningInfo.vue';
import { mapState } from 'vuex';
import { activities } from '../libs/activities.js';

export default {
  name: 'Activity',
  data() {
    return {
      activity: {},
    };
  },
  components: {
    RunningInfo,
  },
  methods: {
    getData(user_id, id) {
      activities.getActivity({user_id, id}).then((res) => {
        if (res.status) {
          this.activity = res.data;
        } else {
          console.log(res.message);
        }
      });
    },
  },
  computed: {
    ...mapState([
      'login',
      'loginData',
    ]),
  },
  mounted() {
    if (this.login) {
      this.getData(this.loginData.id, this.$route.params.id);
    }
  },
}
</script>