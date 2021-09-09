<template>
  <fieldset class="controller">
    <legend v-once>NOISE</legend>
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

<script lang='ts'>
import { defineComponent } from 'vue';
import { mapState, mapMutations } from 'vuex';

export default defineComponent({
  name: 'TheNoiseController',
  computed: {
    ...mapState(['noiseLevel']),
    noiseLevelValue: {
      get(): number {
        return this.noiseLevel;
      },
      set(value: number) {
        this.updateNoiseLevel(value);
      },
    },
  },
  methods: {
    ...mapMutations(['updateNoiseLevel']),
  },
});
</script>

<style scoped>
.controller__label {
  width: auto;
}
</style>
