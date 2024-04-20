<script lang="ts" setup>
withDefaults(defineProps<{ controller?: boolean, legend: string }>(), { controller: false });
</script>

<template>
  <fieldset :class="{ controller }">
    <legend v-once>
      {{ legend }}
    </legend>
    <slot />
  </fieldset>
</template>

<style>
.controller {
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 100%;
}

fieldset {
  border: 0;
}

fieldset>legend {
  color: var(--violet-fallback);
  color: var(--violet);
}
</style>
