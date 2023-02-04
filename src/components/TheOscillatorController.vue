<script setup lang="ts">
import RangeController from '@/components/RangeController.vue';

import { computed } from 'vue';
import { oscStore } from '@/store';
import { WaveTypes } from '@/types';

const store = oscStore();

const waveType: WaveTypes = {
  sine: 0,
  square: 1,
  triangular: 2,
  saw: 3,
};

const amplitudeValue = computed<number>({
  get(): number {
    return store.amplitude;
  },
  set(value: number) {
    store.amplitude = value;
  },
});
const frequencyValue = computed<number>({
  get(): number {
    return store.frequency;
  },
  set(value: number) {
    store.frequency = value;
  },
});
const waveChoiceValue = computed<number>({
  get(): number {
    return store.waveChoice;
  },
  set(value: number) {
    store.waveChoice = value;
  },
});
</script>

<template>
  <fieldset class="controller">
    <legend v-once>
      WAVE GENERATOR
    </legend>
    <div class="controller__faders">
      <RangeController
        v-model:value="amplitudeValue"
        :controller-id="`amplitude`"
        :controller-label="`AMPLITUDE`"
        :max="store.heightLimit"
        :min="0"
      />
      <RangeController
        v-model:value="frequencyValue"
        :controller-id="`frequency`"
        :controller-label="`FREQUENCY`"
        :max="store.widthLimit"
        :min="1"
      />
    </div>
    <div class="controller__radios">
      <label
        v-for="(k, v) in waveType"
        :key="k"
        class="radio__label"
        :for="v"
      >
        <input
          :id="v"
          v-model.number="waveChoiceValue"
          type="radio"
          name="val"
          :value="k"
          class="controller__radio"
        >
        {{ v }}
      </label>
    </div>
  </fieldset>
</template>

<style scoped>
.controller__faders {
  display: flex;
  flex-direction: column;
}

.radio__label:hover {
  cursor: pointer;
}

.controller__radio {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 2px solid white;
  border-radius: 50%;
  height: var(--small);
  outline: none;
  position: relative;
  width: var(--small);
}

.controller__radio:hover {
  background-color: red;
  cursor: pointer;
}

.controller__radio:checked {
  border: 6px solid red;
}

.controller__radio:focus-visible {
  border: 6px solid yellowgreen;
}

.controller__radios {
  display: flex;
  flex-direction: column;
}

@media only screen
  and (min-device-width: 768px)
  and (max-device-width: 4800px)
  and (orientation: portrait)
  and (-webkit-min-device-pixel-ratio: 1) {
    .controller__faders {
      align-items: center;
      display: flex;
      flex-direction: row;
      justify-content: center;
    }

    .controller__radios {
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin: var(--small);
    }

    .controller__radios > label {
      margin-right: var(--extra-large);
    }
}
</style>
