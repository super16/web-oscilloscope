<script setup lang="ts">
import { computed } from 'vue';
import { oscStore } from '@/store';

const store = oscStore();
const noiseLevelValue = computed<number>({
  get(): number {
    return store.noiseLevel;
  },
  set(value: number) {
    store.noiseLevel = value;
  },
});
</script>

<template>
  <fieldset class="controller">
    <legend v-once>
      NOISE
    </legend>
    <label
      class="controller__label"
      for="noiseLevel"
    >
      LEVEL
      <input
        id="noiseLevel"
        v-model.number="noiseLevelValue"
        type="range"
        min="0"
        max="30"
        step="1"
        class="controller__range"
      >
    </label>
  </fieldset>
</template>

<style scoped>
.controller__label {
  width: auto;
}
</style>
