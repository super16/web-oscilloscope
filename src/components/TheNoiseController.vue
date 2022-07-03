<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { key } from '@/store';

const store = useStore(key);
const noiseLevelValue = computed<number>({
  get(): number {
    return store.state.noiseLevel;
  },
  set(value: number) {
    store.commit('updateValue', { key: 'noiseLevel', value });
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
      for="level"
    >
      LEVEL
      <input
        id="level"
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
