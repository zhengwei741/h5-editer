<template>
  <IconSwitch></IconSwitch>
  <FileUploader></FileUploader>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IconSwitch from '@/components/IconSwitch/index.vue'
import FileUploader from '@/components/fileUploader/index.vue'

export default defineComponent({
  components: {
    IconSwitch,
    FileUploader,
  },
})
</script>
