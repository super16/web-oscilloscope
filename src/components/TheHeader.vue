<template>
  <header v-once>
    <h1>Web Oscilloscope</h1>
  </header>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheHeader',
});
</script>

<style scoped>
header {
  margin: 30px auto;
  width: auto;
  text-align: center;
}
header h1 {
  color: white;
  font-size: 20px;
}

@media only screen
  and (min-device-width: 360px)
  and (max-device-width: 767px)
  and (-webkit-min-device-pixel-ratio: 2)
  and (orientation: portrait) {
    header h1 {
      font-size: 18px;
    }
}

@media only screen
  and (min-device-width: 768px)
  and (max-device-width: 1024px)
  and (-webkit-min-device-pixel-ratio: 1) {
    header h1 {
      font-size: 28px;
    }
}

@media only screen
  and (min-device-width: 1024px)
  and (max-device-width: 4800px)
  and (-webkit-min-device-pixel-ratio: 1) {
    header h1 {
      font-size: 32px;
    }
}
</style>
