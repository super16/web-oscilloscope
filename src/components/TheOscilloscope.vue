<template>
  <fieldset class="oscilloscope">
    <legend v-once>DISPLAY</legend>
    <canvas
      class="oscilloscope__canvas"
      id="oscilloscopeCanvas"
      :width="canvasWidth"
      :height="canvasHeight"
    />
  </fieldset>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { mapState, mapMutations } from 'vuex';
import drawBackground from '@/utils/drawBackground';
import Wave from '@/utils/waveForm';

interface waveOptionsInterface {
  0: string,
  1: string,
  2: string,
  3: string,
}

interface OscilloscopeData {
  canvasHeight: number,
  canvasWidth: number
  windowHeight: number,
  windowWidth: number,
  waveOptions: waveOptionsInterface,
}

export default defineComponent({
  name: 'TheOscilloscope',
  data(): OscilloscopeData {
    return {
      canvasHeight: 0,
      canvasWidth: 0,
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
      waveOptions: {
        0: 'sineWave',
        1: 'squareWave',
        2: 'triangleWave',
        3: 'sawWave',
      },
    };
  },
  computed: {
    ...mapState(['amplitude', 'frequency', 'noiseLevel', 'waveChoice']),
  },
  created() {
    this.resizeCanvas();
  },
  mounted() {
    this.plotCanvas();
    window.addEventListener('resize', () => {
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
      this.resizeCanvas();
    });
    setInterval(() => {
      this.plotCanvas();
    }, 25);
  },
  methods: {
    ...mapMutations(
      ['updateAmplitude', 'updateFrequency', 'updateHeightLimit', 'updateWidthLimit'],
    ),
    plotCanvas() {
      const oscilloscopeCanvas: any = document.getElementById('oscilloscopeCanvas');
      const ctx = drawBackground(oscilloscopeCanvas.getContext('2d'));
      const w: any = new Wave(
        this.amplitude,
        ctx,
        this.frequency,
        ctx.canvas.height,
        this.noiseLevel,
        ctx.canvas.width,
        0,
        0,
      );
      const waveChosen: keyof waveOptionsInterface = this.waveChoice;
      const chosenOption: string = this.waveOptions[waveChosen];
      w[chosenOption]();
    },
    resizeCanvas() {
      if (window.innerWidth <= 325) {
        this.canvasWidth = 250;
        this.canvasHeight = 250;
      } else if (window.innerWidth > 325 && window.innerWidth <= 480) {
        this.canvasWidth = 300;
        this.canvasHeight = 250;
      } else if (window.innerHeight < 570) {
        this.canvasWidth = 450;
        this.canvasHeight = 250;
      } else if (window.innerWidth > 480 && window.innerWidth <= 992) {
        this.canvasWidth = 680;
        this.canvasHeight = 350;
      } else {
        this.canvasWidth = 800;
        this.canvasHeight = 500;
      }
      this.updateWidthLimit(this.canvasWidth);
      this.updateHeightLimit(this.canvasHeight / 2);
      this.updateAmplitude(50);
      this.updateFrequency(50);
    },
  },
});
</script>

<style scoped>
.oscilloscope {
  margin-bottom: 15px;
}
.oscilloscope__canvas {
  border: 3px solid #c0c0c0;
}
</style>
