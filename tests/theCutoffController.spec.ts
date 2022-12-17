import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

import TheCutoffController from '@/components/TheCutoffController.vue';
import { oscStore } from '@/store';

const wrapper = mount(TheCutoffController, {
  global: {
    plugins: [createTestingPinia()],
  },
});

const store = oscStore();

describe('TheCutoffController.vue', () => {
  const fieldset = wrapper.find('fieldset');
  const legend = fieldset.find('legend');
  const label = fieldset.find('label');
  const input = fieldset.find('input');

  it('should render controller title', () => {
    const controllerTitle = 'CUTOFF';
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
    expect(store.cutoff).toBe(0);
  });

  it('should have correct input value from store', () => {
    expect(Number(input.element.value)).toBe(0);
  });

  it('set correct new value', async () => {
    store.heightLimit = 500;
    await expect(store.heightLimit).toBe(500);
    await expect(Number(input.element.max)).toBe(500);
    input.setValue(10);
    await expect(Number(input.element.value)).toBe(10);
    await expect(store.cutoff).toBe(10);
  });

  it('should not set negative value', async () => {
    input.setValue(-10);
    await expect(Number(input.element.value)).toBe(0);
    await expect(store.cutoff).toBe(0);
  });

  it('should not set over maximum value', async () => {
    store.heightLimit = 500;
    await expect(store.heightLimit).toBe(500);
    await expect(Number(input.element.max)).toBe(500);
    input.setValue(600);
    await expect(Number(input.element.value)).toBe(500);
    await expect(store.cutoff).toBe(500);
  });

  it('set input correct new value from store', async () => {
    store.heightLimit = 500;
    await expect(store.heightLimit).toBe(500);
    await expect(Number(input.element.max)).toBe(500);
    store.cutoff = 15;
    await expect(store.cutoff).toBe(15);
    await expect(Number(input.element.value)).toBe(15);
  });
});
