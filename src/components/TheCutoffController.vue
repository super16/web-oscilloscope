<script setup lang="ts">
import RangeController from '@/components/RangeController.vue';

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
    <RangeController
      v-model:value="cutoffLevelValue"
      :controller-id="`cutoffLevel`"
      :max="store.heightLimit"
      :min="0"
    />
  </fieldset>
</template>
