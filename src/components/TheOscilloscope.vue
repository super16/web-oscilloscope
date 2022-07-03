<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

import drawBackground from '@/utils/drawBackground';
import Wave from '@/utils/waveForm';
import { key } from '@/store';
import { WaveOptionsType } from '@/types';

let canvasHeight = ref<number>(0);
let canvasWidth = ref<number>(0);
let windowHeight = ref<number>(window.innerHeight);
let windowWidth = ref<number>(window.innerWidth);
const waveOptions: WaveOptionsType = {
  0: 'sineWave',
  1: 'squareWave',
  2: 'triangleWave',
  3: 'sawWave',
};
const store = useStore(key);

function plotCanvas() {
  const oscilloscopeCanvas = <HTMLCanvasElement>document.getElementById('oscilloscopeCanvas');
  const oscCtx = <CanvasRenderingContext2D>oscilloscopeCanvas.getContext('2d');
  const ctx: CanvasRenderingContext2D = drawBackground(oscCtx);
  const w: any = new Wave(
    store.state.amplitude,
    ctx,
    store.state.frequency,
    ctx.canvas.height,
    store.state.noiseLevel,
    ctx.canvas.width,
    0,
    0,
  );
  const waveChosen = <keyof WaveOptionsType>store.state.waveChoice;
  const chosenOption: WaveOptionsType[keyof WaveOptionsType] = waveOptions[waveChosen];
  w[chosenOption]();
}

function resizeCanvas() {
  if (window.innerWidth <= 325) {
    canvasWidth.value = 250;
    canvasHeight.value = 250;
  } else if (window.innerWidth > 325 && window.innerWidth <= 480) {
    canvasWidth.value = 300;
    canvasHeight.value = 250;
  } else if (window.innerHeight < 570) {
    canvasWidth.value = 450;
    canvasHeight.value = 250;
  } else if (window.innerWidth > 480 && window.innerWidth <= 992) {
    canvasWidth.value = 680;
    canvasHeight.value = 350;
  } else {
    canvasWidth.value = 800;
    canvasHeight.value = 500;
  }
  store.commit('updateValue', { key: 'widthLimit', value: canvasWidth.value });
  store.commit('updateValue', { key: 'heightLimit', value: canvasHeight.value / 2 });
  store.commit('updateValue', { key: 'amplitude', value: 50 });
  store.commit('updateValue', { key: 'frequency', value: 50 });
}

resizeCanvas();

onMounted(() => {
  plotCanvas();
  window.addEventListener('resize', () => {
    windowHeight.value = window.innerHeight;
    windowWidth.value = window.innerWidth;
    resizeCanvas();
  });
  setInterval(() => {
    plotCanvas();
  }, 25);
});
</script>

<template>
  <fieldset class="oscilloscope">
    <legend v-once>
      DISPLAY
    </legend>
    <canvas
      id="oscilloscopeCanvas"
      class="oscilloscope__canvas"
      :width="canvasWidth"
      :height="canvasHeight"
    />
  </fieldset>
</template>

<style scoped>
.oscilloscope {
  margin-bottom: 15px;
}
.oscilloscope__canvas {
  border: 3px solid #c0c0c0;
}
</style>
