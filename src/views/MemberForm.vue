<template>
  <v-main>
    <v-card>
      <v-col dense>
        <v-row class="pl-6">
          <v-col>
            <v-card-title>
              填寫會員資料
            </v-card-title>
          </v-col>
        </v-row>
        <v-row class="flex justify-center">
          <v-col
            cols="10"
          >
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                v-model="form.username"
                :rules="[realChName]"
                label="姓名*"
                required
              ></v-text-field>

              <v-text-field
                v-model="form.nickname"
                label="暱稱*"
                required
              ></v-text-field>

              <v-text-field
                v-model="form.email"
                :rules="[checkEMail]"
                label="Email*"
                required
              ></v-text-field>

              <v-select
                v-model="form.county"
                :items="cities"
                :rules="[required]"
                label="居住城市*"
                item-text="city_name"
                required
              ></v-select>

              <v-select
                v-model="form.district"
                :items="districts"
                :rules="[required]"
                label="居住鄉鎮區*"
                item-text="district_name"
                required
              ></v-select>

              <v-select
                v-model="form.runnerType"
                :items="runnerType"
                :rules="[required]"
                label="跑步經驗*"
                item-text="text"
                item-value="value"
                required
              ></v-select>

              <p>
                * 初階跑者: 10公里路跑經驗。
                <br />
                * 中階跑者: 21公里半馬經驗。
                <br />
                * 進階跑者: 42公里全馬以上經驗。
              </p>

              <!-- TODO 排行榜 -->
              <!-- <v-checkbox
                v-model="form.joinRank"
                label="是否參加排行榜"
                :false-value="0"
                :true-value="1"
                required
              ></v-checkbox>

              <p>
                * 如勾選參加排行榜，您的暱稱以及年度、每月、每週跑步紀錄會顯示於排行榜上。
              </p> -->

            </v-form>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="11">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                class="mr-2"
                @click="validate"
              >
                送出
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-col>
    </v-card>
  </v-main>
</template>
<script>
import { cities } from '../libs/cities.js';
import { districts } from '../libs/districts.js';
import { member } from '../libs/member.js';
import { required, realChName, checkEMail } from '../consts/validator.js';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'MemberForm',
  components: {},
  data() {
    return {
      valid: true,
      form: {
        username: '',
        nickname: '',
        email: '',
        county: null,
        district: null,
        runnerType: 0,
        // joinRank: 0,
      },
      cities: [],
      districts: [],
      runnerType: [
        {
          text: '初階跑者',
          value: 1,
        },
        {
          text: '中階跑者',
          value: 2,
        },
        {
          text: '進階跑者',
          value: 3,
        },
      ],
    }
  },
  methods: {
    required,
    realChName,
    checkEMail,
    ...mapMutations([
      'setError',
      'setArea'
    ]),
    async validate () {
      const validateCheck = await this.$refs.form.validate();
      if (validateCheck) {
        this.submit();
      }
    },
    submit() {
      const { id } = this.loginData;
      member.update(id, this.form).then((res) => {
        if (res.status) {
          if (this.$route.params.formType === 'register') {
            this.$router.push({ name: 'Home' });
          } else {
            this.$router.push({ name: 'Member' });
          }
          this.setArea(this.form);
        } else {
          this.setError(res.message);
        }
      });
    },
    getData() {
      const { id } = this.loginData;
      member.read(id).then((res) => {
        if (res.status) {
          Object.keys(res.data).forEach((key) => {
            if (key in this.form) {
              this.form[key] = res.data[key];
            }
          });
        } else {
          this.setError(res.message);
        }
      }).then(() => {
        this.getCities();
      });
    },
    getCities() {
      cities.getCities().then((res) => {
        if (res.status) {
          this.cities = res.data;
          if (!this.form.county) {
            this.form.county = this.cities[0]?.CityName;
          }
        } else {
          this.cities = [],
          this.setError(res.message);
        }
      }).then(() => {
        this.getDistrict(this.computedCityId);
      });
    },
    getDistrict(city_id) {
      if (city_id) {
        districts.getDistricts(city_id).then((res) => {
          if (res.status) {
            this.districts = res.data;
            if (!(this.districts.find((item) => item.district_name === this.form.district))) {
              this.form.district = this.districts[0]?.district_name;
            }
          } else {
            this.districts = [],
            this.setError(res.message);
          }
        });
      }
    },
  },
  watch: {
    computedCounty(county) {
      if (county) {
        this.getDistrict(this.computedCityId);
      }
    }
  },
  computed: {
    ...mapState([
      'loginData',
    ]),
    computedCityId() {
      let city_id = null;
      if (this.form.county && this.cities.length > 0) {
        this.cities.forEach((item) => {
          if (item.city_name === this.form.county) {
            city_id = item.id;
          }
        });
      }
      return city_id;
    },
    computedCounty() {
      return this.form.county;
    },
  },
  mounted() {
    if (this.$route.params.formType === 'register') {
      this.getCities();
    } else {
      this.getData();
    }
  }
}
</script>