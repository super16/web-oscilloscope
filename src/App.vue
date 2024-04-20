<script setup lang="ts">
import { useWaves } from '@/composables/useWaves';
import ControllerFieldset from '@/components/ControllerFieldset.vue';
import RangeController from '@/components/RangeController.vue';
import { WaveOptionsType } from '@/types';

import { onMounted, ref } from 'vue';

const amplitude = ref(50)
const canvasHeight = ref(0);
const canvasWidth = ref(0);
const cutoff = ref(0);
const frequency = ref(50);
const heightLimit = ref(0)
const noiseLevel = ref(5)
const waveChoice = ref(0)
const widthLimit = ref(0)
const windowHeight = ref(window.innerHeight);
const windowWidth = ref(window.innerWidth);

const { drawBackground, Wave } = useWaves()

const waveOptions: WaveOptionsType = {
  0: 'sine',
  1: 'square',
  2: 'triangle',
  3: 'saw',
};

function plotCanvas() {
  const oscilloscopeCanvas = document.getElementById('oscilloscopeCanvas') as HTMLCanvasElement;
  const oscCtx = oscilloscopeCanvas.getContext('2d') as CanvasRenderingContext2D;
  const ctx: CanvasRenderingContext2D = drawBackground(oscCtx);
  const w = new Wave(
    amplitude.value,
    cutoff.value,
    frequency.value,
    ctx.canvas.height,
    noiseLevel.value,
  );
  const waveChosen: keyof WaveOptionsType = waveChoice.value;
  const chosenOption: WaveOptionsType[keyof WaveOptionsType] = waveOptions[waveChosen];
  let x: number = 0;
  let y: number = 0;
  while (x < ctx.canvas.width) {
    y = w[chosenOption](x);
    ctx.lineTo(x, y);
    x += 1;
  }
  ctx.stroke();
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
  widthLimit.value = canvasWidth.value;
  heightLimit.value = canvasHeight.value / 2;
  amplitude.value = 50;
  frequency.value = 50;
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
  <ControllerFieldset legend="DISPLAY">
    <canvas
      id="oscilloscopeCanvas"
      class="oscilloscope__canvas"
      :width="canvasWidth"
      :height="canvasHeight"
      role="graphics-document"
    >
      <span>Oscilloscope display</span>
    </canvas>
  </ControllerFieldset>
  <div class="controllers">
    <ControllerFieldset
      controller
      legend="WAVE GENERATOR"
    >
      <div class="controller__faders">
        <RangeController
          v-model="amplitude"
          controller-id="amplitude"
          controller-label="AMPLITUDE"
          :max="heightLimit"
          :min="0"
        />
        <RangeController
          v-model="frequency"
          controller-id="frequency"
          controller-label="FREQUENCY"
          :max="widthLimit"
          :min="1"
        />
      </div>
      <div class="controller__radios">
        <label
          v-for="(k, v) in waveOptions"
          :key="v"
          class="radio__label"
          :for="k"
        >
          <input
            :id="k"
            v-model.number="waveChoice"
            type="radio"
            name="val"
            :value="v"
            class="controller__radio"
          >
          {{ k }}
        </label>
      </div>
    </ControllerFieldset>
    <ControllerFieldset
      controller
      legend="CUTOFF"
    >
      <RangeController
        v-model="cutoff"
        controller-id="cutoffLevel"
        :max="heightLimit"
        :min="0"
      />
    </ControllerFieldset>
    <ControllerFieldset
      controller
      legend="NOISE"
    >
      <RangeController
        v-model="noiseLevel"
        controller-id="noiseLevel"
        :max="30"
        :min="0"
      />
    </ControllerFieldset>
  </div>
</template>

<style scoped>
canvas {
  border: 3px solid #c0c0c0;
}

.controller__faders {
  display: flex;
  flex-direction: column;
}

.radio__label:hover {
  cursor: pointer;
}

.controller__radio {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 2px solid white;
  border-radius: 50%;
  height: var(--small);
  outline: none;
  position: relative;
  width: var(--small);
}

.controller__radio:hover {
  background-color: var(--red-fallback);
  background-color: var(--red);
  cursor: pointer;
}

.controller__radio:checked {
  border: 6px solid var(--red-fallback);
  border: 6px solid var(--red);
}

.controller__radio:focus-visible {
  border: 6px solid var(--violet-fallback);
  border: 6px solid var(--violet);
}

.controller__radios {
  display: flex;
  flex-direction: column;
}

@media only screen and (min-device-width: 768px) and (max-device-width: 4800px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1) {
  .controller__faders {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .controller__radios {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: var(--small);
  }

  .controller__radios>label {
    margin-right: var(--extra-large);
  }
}

.controllers {
  display: grid;
  gap: var(--large);
  grid-auto-rows: min-content;
  width: 100%;
}

@media screen and (min-device-width: 1025px) and (max-device-width: 4800px) and (-webkit-min-device-pixel-ratio: 1) {
  .controllers {
    width: auto;
  }
}
</style>
