<template>
  <fieldset class="controller">
    <legend>WAVE GENERATOR</legend>
      <div class="controller__faders">
        <label class="controller__label">
          AMPLITUDE
          <input
            v-model.number="amplitudeValue"
            class="controller__range"
            type="range"
            min="0"
            :max="heightLimit"
            step="1"
          />
        </label>
        <label class="controller__label">
          FREQUENCY
          <input
            v-model.number="frequencyValue"
            class="controller__range"
            type="range"
            min="1"
            :max="widthLimit"
            step="1"
          />
        </label>
      </div>
      <div class="controller__radios">
        <label v-for="(key, value) in waveType" :key="key">
          <input
            v-model.number="waveChoiceValue"
            type="radio"
            name="val"
            :value="key"
            class="controller__radio"
          />
          {{ value }}
        </label>
      </div>
  </fieldset>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'TheOscillatorController',
  data() {
    return {
      waveType: {
        sine: 0,
        square: 1,
        triangular: 2,
        saw: 3,
      },
    };
  },
  computed: {
    ...mapState([
      'amplitude', 'frequency', 'heightLimit', 'widthLimit', 'waveChoice',
    ]),
    amplitudeValue: {
      get() {
        return this.amplitude;
      },
      set(value) {
        this.updateAmplitude(value);
      },
    },
    frequencyValue: {
      get() {
        return this.frequency;
      },
      set(value) {
        this.updateFrequency(value);
      },
    },
    waveChoiceValue: {
      get() {
        return this.waveChoice;
      },
      set(value) {
        this.updateWaveChoice(value);
      },
    },
  },
  methods: {
    ...mapMutations([
      'updateAmplitude', 'updateFrequency', 'updateWaveChoice',
    ]),
  },
};
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
