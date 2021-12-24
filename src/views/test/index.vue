<template>
  <!-- <IconSwitch></IconSwitch> -->
  <FileUploader
    actions="https://jsonplaceholder.typicode.com/posts/"
    :beforeUpload="beforeUpload"
    drag
    multiple
    autoUpload
  >
  </FileUploader>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// import IconSwitch from '@/components/IconSwitch/index.vue'
import FileUploader from '@/components/fileUploader/index.vue'

export default defineComponent({
  components: {
    // IconSwitch,
    FileUploader,
  },
  methods: {
    beforeUpload(file: any) {
      console.log(file)
    },
  },
})
</script>
