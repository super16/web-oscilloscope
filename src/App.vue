<script setup lang="ts">
import TheCutoffController from '@/components/TheCutoffController.vue';
import TheHeader from '@/components/TheHeader.vue';
import TheNoiseController from '@/components/TheNoiseController.vue';
import TheOscilloscope from '@/components/TheOscilloscope.vue';
import TheOscillatorController from '@/components/TheOscillatorController.vue';
</script>

<template>
  <TheHeader />
  <main>
    <TheOscilloscope />
    <div class="controllers">
      <TheOscillatorController />
      <TheCutoffController />
      <TheNoiseController />
    </div>
  </main>
</template>

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
