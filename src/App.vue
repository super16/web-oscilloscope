<template>
  <TheHeader />
  <main>
    <TheOscilloscope />
    <div class="controllers">
      <TheOscillatorController />
      <TheNoiseController />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheHeader from '@/components/TheHeader.vue';
import TheNoiseController from '@/components/TheNoiseController.vue';
import TheOscilloscope from '@/components/TheOscilloscope.vue';
import TheOscillatorController from '@/components/TheOscillatorController.vue';

export default defineComponent({
  name: 'App',
  components: {
    TheHeader,
    TheNoiseController,
    TheOscillatorController,
    TheOscilloscope,
  },
});
</script>

<style scoped>
.controllers {
  display: flex;
  flex-direction: column;
  width: 100%;
}
@media screen
  and (min-device-width: 1025px)
  and (max-device-width: 4800px)
  and (-webkit-min-device-pixel-ratio: 1) {
    .controllers {
      display: flex;
      flex-direction: column;
      width: auto;
    }
}
</style>
