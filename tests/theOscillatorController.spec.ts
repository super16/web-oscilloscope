import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

import TheOscillatorController from '@/components/TheOscillatorController.vue';
import { oscStore } from '@/store';

const wrapper = mount(TheOscillatorController, {
  global: {
    plugins: [createTestingPinia()],
  },
});

const store = oscStore();

describe('TheOscillatorController.vue', () => {
  const fieldset = wrapper.find('fieldset');
  const legend = fieldset.find('legend');

  it('should render controller title', () => {
    const controllerTitle = 'WAVE GENERATOR';
    expect(fieldset.exists()).toBe(true);
    expect(legend.exists()).toBe(true);
    expect(legend.text()).toBe(controllerTitle);
  });

  it('should have correct initial store values', () => {
    expect(store.amplitude).toBe(50);
    expect(store.frequency).toBe(50);
    expect(store.waveChoice).toBe(0);
  });
});
