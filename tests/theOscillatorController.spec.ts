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
  const radiosLabels = radios.findAll('label');
  const sineWaveLabel = radiosLabels[0];
  const squareWaveLabel = radiosLabels[1];
  const triangularWaveLabel = radiosLabels[2];
  const sawWaveLabel = radiosLabels[3];
  const sineWaveInput = sineWaveLabel.find('input');
  const squareWaveInput = squareWaveLabel.find('input');
  const triangularWaveInput = triangularWaveLabel.find('input');
  const sawWaveInput = sawWaveLabel.find('input');

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
    await expect(Number(frequencyInput.element.value)).toBe(0);
  });

  it('set correct new input values', async () => {
    store.heightLimit = 500;
    store.widthLimit = 500;
    await expect(store.heightLimit).toBe(500);
    await expect(store.widthLimit).toBe(500);
    await expect(Number(amplitudeInput.element.max)).toBe(500);
    await expect(Number(frequencyInput.element.max)).toBe(500);
    amplitudeInput.setValue(100);
    frequencyInput.setValue(100);
    await expect(Number(amplitudeInput.element.value)).toBe(100);
    await expect(store.amplitude).toBe(100);
  });

  it('set input correct new value from store', async () => {
    store.heightLimit = 500;
    store.widthLimit = 500;
    await expect(store.heightLimit).toBe(500);
    await expect(store.widthLimit).toBe(500);
    store.amplitude = 15;
    await expect(store.amplitude).toBe(15);
    await expect(Number(amplitudeInput.element.value)).toBe(15);
    store.frequency = 15;
    await expect(store.frequency).toBe(15);
    await expect(Number(frequencyInput.element.value)).toBe(15);
  });

  it('should render radios titles', () => {
    const sineWaveLabelText = 'sine';
    const squareWaveLabelText = 'square';
    const triangularWaveLabelText = 'triangular';
    const sawWaveLabelText = 'saw';
    expect(sineWaveLabel.text()).toBe(sineWaveLabelText);
    expect(squareWaveLabel.text()).toBe(squareWaveLabelText);
    expect(triangularWaveLabel.text()).toBe(triangularWaveLabelText);
    expect(sawWaveLabel.text()).toBe(sawWaveLabelText);
  });

  it('should have correct radio input value', async () => {
    await expect(Number(sineWaveInput.element.value)).toBe(0);
    await expect(Number(sineWaveInput.element.checked)).toBeTruthy();
    await expect(Number(squareWaveInput.element.value)).toBe(1);
    await expect(Number(triangularWaveInput.element.value)).toBe(2);
    await expect(Number(sawWaveInput.element.value)).toBe(3);
  });

  it('set input correct new value to radio from store', async () => {
    store.waveChoice = 1;
    await expect(store.waveChoice).toBe(1);
    await expect(Number(squareWaveInput.element.checked)).toBeTruthy();
    store.waveChoice = 2;
    await expect(store.waveChoice).toBe(2);
    await expect(Number(triangularWaveInput.element.checked)).toBeTruthy();
    store.waveChoice = 3;
    await expect(store.waveChoice).toBe(3);
    await expect(Number(sawWaveInput.element.checked)).toBeTruthy();
    store.waveChoice = 0;
    await expect(store.waveChoice).toBe(0);
    await expect(Number(sineWaveInput.element.checked)).toBeTruthy();
  });

  it('set correct new checked radio values', async () => {
    await sineWaveInput.setValue(true);
    await expect(Number(sineWaveInput.element.checked)).toBeTruthy();
    await squareWaveInput.setValue(true);
    await expect(Number(squareWaveInput.element.checked)).toBeTruthy();
    await triangularWaveInput.setValue(true);
    await expect(Number(triangularWaveInput.element.checked)).toBeTruthy();
    await sawWaveInput.setValue(true);
    await expect(Number(sawWaveInput.element.checked)).toBeTruthy();
  });
});
