<script setup lang="ts">
import { computed } from 'vue';
import { oscStore } from '@/store';

const store = oscStore();
const cutoffLevelValue = computed<number>({
  get(): number {
    return store.cutoff;
  },
  set(value: number) {
    store.cutoff = value;
  },
});
</script>

<template>
  <fieldset class="controller">
    <legend v-once>
      CUTOFF
    </legend>
    <label
      class="controller__label"
      for="level"
    >
      LEVEL
      <input
        id="level"
        v-model.number="cutoffLevelValue"
        type="range"
        min="0"
        :max="store.heightLimit"
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
