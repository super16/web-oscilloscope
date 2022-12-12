import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

import TheHeader from '@/components/TheHeader.vue';

describe('TheHeader.vue', () => {
  it('should render header text', () => {
    const wrapper = mount(TheHeader);
    const headerText = 'Web Oscilloscope';
    const header = wrapper.find('header');
    const headerOne = header.find('h1');
    expect(header.exists()).toBe(true);
    expect(headerOne.exists()).toBe(true);
    expect(headerOne.text()).toBe(headerText);
  });
});
