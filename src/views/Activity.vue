<template>
  <v-main>
    <v-card class="ma-4">
      <RunningInfo :data="activity" :moreInfo="true" v-show="Object.keys(activity).length > 0" />
    </v-card>
    <Loading />
    <NoData />
    <Backbtn />
  </v-main>
</template>
<script>
import RunningInfo from '../components/RunningInfo.vue';
import NoData from '../components/NoData.vue';
import Loading from '../components/Loading.vue';
import Backbtn from '../components/Backbtn.vue';
import { mapState, mapMutations } from 'vuex';
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
    NoData,
    Loading,
    Backbtn,
  },
  methods: {
    ...mapMutations([
      'setError',
      'setLoading',
      'setNoData',
    ]),
    getData(user_id, id) {
      this.setLoading(true);
      activities.getActivity({user_id, id}).then((res) => {
        this.setLoading(false);
        if (res.status) {
          this.setNoData(false);
          this.activity = res.data;
        } else {
          this.setError(res.message);
          this.setNoData(true);
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