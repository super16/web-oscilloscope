import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';

export interface State {
  amplitude: number,
  frequency: number,
  noiseLevel: number,
  heightLimit: any,
  waveChoice: number,
  widthLimit: any,
}

export const key: InjectionKey<Store<State>> = Symbol('');

export const store = createStore<State>({
  state: {
    amplitude: 50,
    frequency: 50,
    noiseLevel: 5,
    heightLimit: null,
    waveChoice: 0,
    widthLimit: null,
  },
  mutations: {
    updateAmplitude(state, amplitude: number) {
      state.amplitude = amplitude;
    },
    updateFrequency(state, frequency: number) {
      state.frequency = frequency;
    },
    updateHeightLimit(state, heightLimit: number) {
      state.heightLimit = heightLimit;
    },
    updateNoiseLevel(state, noiseLevel: number) {
      state.noiseLevel = noiseLevel;
    },
    updateWaveChoice(state, waveChoice: number) {
      state.waveChoice = waveChoice;
    },
    updateWidthLimit(state, widthLimit: number) {
      state.widthLimit = widthLimit;
    },
  },
});
