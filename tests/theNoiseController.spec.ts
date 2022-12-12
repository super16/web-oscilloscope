import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

import TheNoiseController from '@/components/TheNoiseController.vue';
import { oscStore } from '@/store';

const wrapper = mount(TheNoiseController, {
  global: {
    plugins: [createTestingPinia()],
  },
});

const store = oscStore();

describe('TheNoiseController.vue', () => {
  const fieldset = wrapper.find('fieldset');
  const legend = fieldset.find('legend');
  const label = fieldset.find('label');
  const input = fieldset.find('input');

  it('should render controller title', () => {
    const controllerTitle = 'NOISE';
    expect(fieldset.exists()).toBe(true);
    expect(legend.exists()).toBe(true);
    expect(legend.text()).toBe(controllerTitle);
  });

  it('should render controller label', () => {
    const controllerLabel = 'LEVEL';
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe(controllerLabel);
  });

  it('should have controller input', () => {
    expect(input.exists()).toBe(true);
  });

  it('should have correct initial store value', () => {
    expect(store.noiseLevel).toBe(5);
  });

  it('should have correct input value from store', () => {
    expect(Number(input.element.value)).toBe(5);
  });

  it('set correct new value', async () => {
    await input.setValue(10);
    expect(Number(input.element.value)).toBe(10);
    expect(store.noiseLevel).toBe(10);
  });

  it('should not set negative value', async () => {
    await input.setValue(-10);
    expect(Number(input.element.value)).toBe(0);
    expect(store.noiseLevel).toBe(0);
  });

  it('should not set over maximum value', async () => {
    await input.setValue(400);
    expect(Number(input.element.value)).toBe(30);
    expect(store.noiseLevel).toBe(30);
  });

  it('set input correct new value from store', async () => {
    store.noiseLevel = 15;
    await expect(store.noiseLevel).toBe(15);
    await expect(Number(input.element.value)).toBe(15);
  });
});
