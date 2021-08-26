<template>
  <fieldset class="oscilloscope">
    <legend>DISPLAY</legend>
    <canvas
      class="oscilloscope__canvas"
      id="oscilloscopeCanvas"
      :width="canvasWidth"
      :height="canvasHeight"
    />
  </fieldset>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import drawBackground from '@/utils/drawBackground';
import Wave from '@/utils/waveForm';

export default {
  name: 'TheOscilloscope',
  data() {
    return {
      canvasHeight: null,
      canvasWidth: null,
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
    this.timer = setInterval(() => {
      this.plotCanvas();
    }, 25);
  },
  methods: {
    ...mapMutations(
      ['updateAmplitude', 'updateFrequency', 'updateHeightLimit', 'updateWidthLimit'],
    ),
    plotCanvas() {
      const ctx = drawBackground(document.getElementById('oscilloscopeCanvas').getContext('2d'));
      const w = new Wave(
        this.amplitude,
        ctx,
        this.frequency,
        ctx.canvas.height,
        this.noiseLevel,
        ctx.canvas.width,
        0,
        0,
      );
      w[this.waveOptions[this.waveChoice]]();
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
};
</script>

<style scoped>
.oscilloscope {
  margin-bottom: 15px;
}
.oscilloscope__canvas {
  border: 3px solid #c0c0c0;
}
</style>
