<script setup lang="ts">
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
      <label
        class="controller__label"
        for="amplitude"
      >
        AMPLITUDE
        <input
          id="amplitude"
          v-model.number="amplitudeValue"
          class="controller__range"
          type="range"
          min="0"
          :max="store.heightLimit"
          step="1"
        >
      </label>
      <label
        class="controller__label"
        for="frequency"
      >
        FREQUENCY
        <input
          id="frequency"
          v-model.number="frequencyValue"
          class="controller__range"
          type="range"
          min="1"
          :max="store.widthLimit"
          step="1"
        >
      </label>
    </div>
    <div class="controller__radios">
      <label
        v-for="(k, v) in waveType"
        :key="k"
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

.controller__radio {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 2px solid white;
  border-radius: 50%;
  height: 16px;
  outline: none;
  position: relative;
  width: 16px;
}

.controller__radio:hover {
  background-color: red;
}

.controller__radio:checked {
  border: 6px solid red;
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
      margin: 15px;
    }

    .controller__radios > label {
      margin-right: 30px;
    }
}
</style>
