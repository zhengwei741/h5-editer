<template>
  <!-- <IconSwitch></IconSwitch> -->
  <image-uploader />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// import IconSwitch from '@/components/IconSwitch/index.vue'
import ImageUploader from '@/components/imageUploader/index.vue'

export default defineComponent({
  components: {
    // IconSwitch,
    ImageUploader,
  },
  methods: {
    beforeUpload(file: any) {
      console.log(file)
    },
  },
})
</script>
