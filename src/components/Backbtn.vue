<template>
  <div class="d-flex justify-center">
    <v-btn
      @click="routerPush"
      class="white--text my-4"
      color="cyan">
      返回
    </v-btn>
  </div>
</template>
<script>
export default {
  name: 'BackBtn',
  methods: {
    routerPush() {
      this.$router.back();
    }
  },
}
</script>