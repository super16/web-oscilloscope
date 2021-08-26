import { createStore } from 'vuex';

export default createStore({
  state: {
    amplitude: 50,
    frequency: 50,
    noiseLevel: 5,
    heightLimit: null,
    waveChoice: 0,
    widthLimit: null,
  },
  mutations: {
    updateAmplitude(state, amplitude) {
      state.amplitude = amplitude;
    },
    updateFrequency(state, frequency) {
      state.frequency = frequency;
    },
    updateHeightLimit(state, heightLimit) {
      state.heightLimit = heightLimit;
    },
    updateNoiseLevel(state, noiseLevel) {
      state.noiseLevel = noiseLevel;
    },
    updateWaveChoice(state, waveChoice) {
      state.waveChoice = waveChoice;
    },
    updateWidthLimit(state, widthLimit) {
      state.widthLimit = widthLimit;
    },
  },
});
