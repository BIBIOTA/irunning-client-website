<template>
  <svg :width="width" :height="height" >
      <a href="https://t.me/irunning_bot" target="_blank">
        <image :style="getColor" :xlink:href="require('../assets/icon/cib-telegram.svg')" :width="width" :height="height" src="cib-telegram.png" />
      </a>
  </svg>
</template>

<script>
export default {
  name: 'TelegramIcon',
  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
    },
  },
  computed: {
    getColor() {
      if (this.color === 'white') {
        return 'filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(126deg) brightness(106%) contrast(105%);';
      }
      return 'filter: invert(90%) sepia(27%) saturate(5598%) hue-rotate(179deg) brightness(104%) contrast(95%);';
    },
  },
}
</script>