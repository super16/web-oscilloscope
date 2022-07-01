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
          :max="heightLimit"
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
          :max="widthLimit"
          step="1"
        >
      </label>
    </div>
    <div class="controller__radios">
      <label
        v-for="(key, value) in waveType"
        :key="key"
        :for="value"
      >
        <input
          :id="value"
          v-model.number="waveChoiceValue"
          type="radio"
          name="val"
          :value="key"
          class="controller__radio"
        >
        {{ value }}
      </label>
    </div>
  </fieldset>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { mapState, mapMutations } from 'vuex';

interface WaveTypesInterface {
  sine: number,
  square: number,
  triangular: number,
  saw: number,
}

export default defineComponent({
  name: 'TheOscillatorController',
  data() {
    return {
      waveType: {
        sine: 0,
        square: 1,
        triangular: 2,
        saw: 3,
      } as WaveTypesInterface,
    };
  },
  computed: {
    ...mapState([
      'amplitude',
      'frequency',
      'heightLimit',
      'waveChoice',
      'widthLimit',
    ]),
    amplitudeValue: {
      get(): number {
        return this.amplitude;
      },
      set(value: number) {
        this.updateValue({ key: 'amplitude', value });
      },
    },
    frequencyValue: {
      get(): number {
        return this.frequency;
      },
      set(value: number) {
        this.updateValue({ key: 'frequency', value });
      },
    },
    waveChoiceValue: {
      get(): number {
        return this.waveChoice;
      },
      set(value: number) {
        this.updateValue({ key: 'waveChoice', value });
      },
    },
  },
  methods: {
    ...mapMutations(['updateValue']),
  },
});
</script>

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
