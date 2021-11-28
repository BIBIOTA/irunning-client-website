<template>
  <v-main>
    <v-card height="100vh" min-height="100%">
      <v-col dense>
        <v-row>
          <v-col>
            <v-card-title>
              會員資料
            </v-card-title>
          </v-col>
        </v-row>
        <v-card-text>
          <div
            v-for="(item, key) in data"
            :key="key"
            class="text--primary d-flex">
            {{item.title}}
            <v-spacer />
            {{item.value}}
          </div>
        </v-card-text>
        <v-row>
          <v-col>
            <v-card-actions class="flex justify-center">
              <v-btn
                color="primary"
                class="mr-2"
                :to="'/Member/Edit'"
              >
                編輯會員資料
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-col>
    </v-card>
  </v-main>
</template>
<script>
import { member } from '../libs/member.js';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Member',
  components: {},
  data() {
    return {
      data: {
        username: {
          title: '姓名',
          value: '太田裕揮'
        },
        nickname: {
          title: '暱稱',
          value: '測試人',
        },
        email: {
          title: 'email',
          value: 'test@test.com',
        },
        county: {
          title: '居住城市',
          value: '臺北市',
        },
        district: {
          title: '居住鄉鎮區',
          value: '信義區',
        },
        runnerType: {
          title: '跑步經驗',
          value: '初階跑者',
        },
        // TODO 排行榜
        // joinRank: {
        //   title: '排行榜',
        //   value: '參加中',
        // },
      },
    }
  },
  methods: {
    ...mapMutations([
      'setError',
    ]),
    getData() {
      const { id } = this.loginData;
      member.read(id).then((res) => {
        if (res.status) {
          console.log(res);
          Object.keys(res.data).forEach((key) => {
            if (key in this.data) {
              if (key === 'runnerType') {
                this.data[key].value = this.getRunnerTypeName(res.data[key]);
              } else if (key === 'joinRank') {
                this.data[key].value = this.getjoinRankType(res.data[key]);
              } else {
                this.data[key].value = res.data[key];
              }
            }
          });
        } else {
          this.setError(res.message);
        }
      });
    },
    getRunnerTypeName(value) {
      switch (value) {
        case 1:
          return '初階跑者';
        case 2:
          return '中階跑者';
        case 3:
          return '進階跑者';
        default:
          return '';
      }
    },
    getjoinRankType(value) {
      switch (value) {
        case 1:
          return '參加中';
        case 0:
          return '未參加';
        default:
          return '';
      }
    },
  },
  watch: {},
  computed: {
    ...mapState([
      'loginData',
    ]),
  },
  mounted() {
    this.getData();
  }
}
</script>