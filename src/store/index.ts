import { defineStore } from 'pinia';
import { OscState } from '@/types';

export const oscStore = defineStore('main', {
  state: (): OscState => {
    return {
      amplitude: 50,
      frequency: 50,
      noiseLevel: 5,
      heightLimit: 0,
      waveChoice: 0,
      widthLimit: 0,
    };
  },
});
