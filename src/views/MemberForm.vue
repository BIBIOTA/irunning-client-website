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
                label="姓名"
                required
              ></v-text-field>

              <v-text-field
                v-model="form.email"
                :rules="[checkEMail]"
                label="Email"
                required
              ></v-text-field>

              <v-select
                v-model="form.city"
                :items="cities"
                :rules="[required]"
                label="居住城市"
                item-text="CityName"
                required
              ></v-select>

              <v-select
                v-model="form.district"
                :items="districts"
                :rules="[required]"
                label="居住鄉鎮區"
                item-text="AreaName"
                required
              ></v-select>

              <v-select
                v-model="form.runnerType"
                :items="runnerType"
                :rules="[required]"
                label="跑步經驗"
                item-text="text"
                item-value="value"
                required
              ></v-select>

              <v-checkbox
                v-model="form.join_rank"
                label="是否參加排行榜"
                required
              ></v-checkbox>

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
import { required, realChName, checkEMail } from '../consts/validator.js';
import { mapMutations } from 'vuex';

export default {
  name: 'MemberForm',
  components: {},
  data() {
    return {
      valid: true,
      form: {
        username: '',
        email: '',
        city: null,
        district: null,
        runnerType: 0,
        join_rank: false,
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
    ]),
    async validate () {
      const validateCheck = await this.$refs.form.validate();
      if (validateCheck) {
        this.submit();
      }
    },
    submit() {
      console.log(this.form);
    },
    getCities() {
      cities.getCities().then((res) => {
        if (res.status) {
          this.cities = res.data;
          if (!this.form.city) {
            this.form.city = this.cities[0]?.CityName;
          }
        } else {
          this.cities = [],
          this.setError(res.message);
        }
      }).then(() => {
        this.getDistrict(this.form.city);
      });
    },
    getDistrict(city) {
      if (city) {
        this.form.district = '';
        districts.getDistricts(city).then((res) => {
          if (res.status) {
            this.districts = res.data;
            this.form.district = this.districts[0]?.AreaName;
          } else {
            this.districts = [],
            this.setError(res.message);
          }
        });
      }
    },
  },
  watch: {
    computedCity(city) {
      if (city) {
        this.getDistrict(city);
      }
    }
  },
  computed: {
    computedCity() {
      return this.form.city;
    },
  },
  mounted() {
    this.getCities();
  }
}
</script>