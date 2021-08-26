<template>
  <fieldset class="controller">
    <legend>NOISE</legend>
    <label class="controller__label">
      LEVEL
      <input
        v-model.number="noiseLevelValue"
        type="range"
        min="0"
        max="30"
        step="1"
        class="controller__range"
      />
    </label>
  </fieldset>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'TheNoiseController',
  computed: {
    ...mapState(['noiseLevel']),
    noiseLevelValue: {
      get() {
        return this.noiseLevel;
      },
      set(value) {
        this.updateNoiseLevel(value);
      },
    },
  },
  methods: {
    ...mapMutations(['updateNoiseLevel']),
  },
};
</script>

<style scoped>
.controller__label {
  width: auto;
}
</style>
