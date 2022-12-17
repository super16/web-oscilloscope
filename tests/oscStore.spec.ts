import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect } from 'vitest';

import { oscStore } from '@/store';

describe('oscStore', () => {
  setActivePinia(createPinia())
  const store = oscStore();

  it('should have correct initial store values', () => {
    expect(store.amplitude).toBe(50);
    expect(store.cutoff).toBe(0);
    expect(store.frequency).toBe(50);
    expect(store.noiseLevel).toBe(5);
    expect(store.heightLimit).toBe(0);
    expect(store.waveChoice).toBe(0);
    expect(store.widthLimit).toBe(0);
  });

  it('should have correct store values after modification', () => {
    store.amplitude = 100;
    store.cutoff = 100;
    store.frequency = 100;
    store.noiseLevel = 100;
    store.heightLimit = 100;
    store.waveChoice = 100;
    store.widthLimit = 100;
    expect(store.amplitude).toBe(100);
    expect(store.cutoff).toBe(100);
    expect(store.frequency).toBe(100);
    expect(store.noiseLevel).toBe(100);
    expect(store.heightLimit).toBe(100);
    expect(store.waveChoice).toBe(100);
    expect(store.widthLimit).toBe(100);
  });
});
