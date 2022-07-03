import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';

export interface State {
  amplitude: number,
  frequency: number,
  noiseLevel: number,
  heightLimit: number,
  waveChoice: number,
  widthLimit?: number,
}

export interface P {
  key: keyof State,
  value: number,
}

export const key: InjectionKey<Store<State>> = Symbol('');

export const store = createStore<State>({
  state: {
    amplitude: 50,
    frequency: 50,
    noiseLevel: 5,
    heightLimit: 0,
    waveChoice: 0,
    widthLimit: 0,
  },
  mutations: {
    updateValue(state: State, payload: P): void {
      state[payload.key] = payload.value;
    },
    updateHeightLimit(state, heightLimit: number) {
      state.heightLimit = heightLimit;
    },
  },
});
