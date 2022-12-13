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
  const controllers = fieldset.findAll('div');
  const faders = controllers[0]
  const radios = controllers[1]
  const fadersLabels = faders.findAll('label');
  const amplitudeLabel = fadersLabels[0];
  const frequencyLabel = fadersLabels[1];
  const amplitudeInput = amplitudeLabel.find('input');
  const frequencyInput = frequencyLabel.find('input');

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

  it('should have controllers with labels and inputs', () => {
    expect(faders.exists()).toBe(true);
    expect(faders.classes()).toContain('controller__faders')
    expect(radios.exists()).toBe(true);
    expect(radios.classes()).toContain('controller__radios')
    expect(amplitudeLabel.exists()).toBe(true);
    expect(frequencyLabel.exists()).toBe(true);
    expect(amplitudeInput.exists()).toBe(true);
    expect(frequencyInput.exists()).toBe(true);
  });

  it('should render faders titles', () => {
    const amplitudeLabelText = 'AMPLITUDE';
    const frequencyLabelText = 'FREQUENCY';
    expect(amplitudeLabel.text()).toBe(amplitudeLabelText);
    expect(frequencyLabel.text()).toBe(frequencyLabelText);
  });

  it('should have correct initial store value', async () => {
    await expect(store.amplitude).toBe(50);
    await expect(store.frequency).toBe(50);
    await expect(store.heightLimit).toBe(0);
    await expect(store.waveChoice).toBe(0);
    await expect(store.widthLimit).toBe(0);
  });

  it('should have correct input value from store', async () => {
    await expect(Number(amplitudeInput.element.value)).toBe(0);
    await expect(Number(frequencyInput.element.value)).toBe(0);
  });
});
