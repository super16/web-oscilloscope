<script setup lang="ts">
import TheCutoffController from '@/components/TheCutoffController.vue';
import TheNoiseController from '@/components/TheNoiseController.vue';
import TheOscilloscope from '@/components/TheOscilloscope.vue';
import TheOscillatorController from '@/components/TheOscillatorController.vue';
</script>

<template>
  <TheOscilloscope />
  <div class="controllers">
    <TheOscillatorController />
    <TheCutoffController />
    <TheNoiseController />
  </div>
</template>

<style scoped>
.controllers {
  display: grid;
  gap: var(--large);
  grid-auto-rows: min-content;
  width: 100%;
}
@media screen
  and (min-device-width: 1025px)
  and (max-device-width: 4800px)
  and (-webkit-min-device-pixel-ratio: 1) {
    .controllers {
      width: auto;
    }
}
</style>
