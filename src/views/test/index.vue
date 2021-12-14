<template>
  <color-picker></color-picker>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import ColorPicker from '@/components/colorPicker/index.vue'

export default defineComponent({
  components: {
    ColorPicker,
  },
})
</script>
