<script setup lang="ts">
defineProps({
  controllerId: { required: true, type: String },
  controllerLabel: {
    default: 'LEVEL',
    required: false,
    type: String,
  },
  max: { default: 0, type: Number },
  min: { default: 0, type: Number },
  value: { required: true, type: Number },
});

defineEmits<{
  (e: 'update:value', id: number): void
}>();
</script>

<template>
  <label :for="controllerId">
    {{ controllerLabel }}
    <input
      :id="controllerId"
      :max="max"
      :min="min"
      step="1"
      type="range"
      :value="value"
      @input="$emit(
        'update:value',
        Number(($event.target as HTMLInputElement).value)
      )"
    >
  </label>
</template>

<style scoped>
label {
  display: flex;
  flex-direction: column;
  margin: 10px 0px;
  width: auto;
}

label > input[type=range] {
  accent-color: red;
  background: black;
  border: 2px solid red;
  height: 5px;
  margin-top: 10px;
  outline: none;
}

label > input[type=range]:focus-visible {
  border-color: yellowgreen;
}

/* for Chrome/Safari */
label > input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  background: black;
  border: 1px solid white;
  border-radius: 2px;
  cursor: pointer;
  height: 15px;
  width: 15px;
}

label > input[type=range]::-webkit-slider-thumb:hover {
  background: red;
}

/* for Firefox */
label > input[type=range]::-moz-range-thumb {
  background: black;
  border: 2px solid white;
  border-radius: 2px;
  cursor: pointer;
  height: 15px;
  width: 15px;
}

label > input[type=range]::-moz-range-thumb:hover {
  background: red;
}

@media only screen
  and (min-device-width: 768px)
  and (max-device-width: 1024px)
  and (-webkit-min-device-pixel-ratio: 1) {
    label {
      margin: 20px;
    }
}
</style>
