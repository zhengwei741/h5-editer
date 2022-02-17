<template>
  <!-- <IconSwitch></IconSwitch> -->
  <!-- <image-uploader /> -->
  <div>{{ test }}</div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'

// import IconSwitch from '@/components/IconSwitch/index.vue'
// import ImageUploader from '@/components/imageUploader/index.vue'

import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

export default defineComponent({
  components: {
    // IconSwitch,
    // ImageUploader,
  },
  setup() {
    const test = ref(false)

    watch(test, (newV, oldV, cleanUp) => {
      console.log(newV)
      console.log(oldV)
      console.log(cleanUp)
      cleanUp(() => {
        console.log(111)
      })
    })

    setTimeout(() => {
      test.value = true
      setTimeout(() => {
        test.value = false
      }, 500)
    }, 500)

    return {
      test,
    }
  },
  // mounted() {
  //   const image = document.getElementById('image') as HTMLImageElement
  //   new Cropper(image, {
  //     aspectRatio: 16 / 9,
  //     crop(event) {
  //       console.log(event.detail.x)
  //       console.log(event.detail.y)
  //       console.log(event.detail.width)
  //       console.log(event.detail.height)
  //       console.log(event.detail.rotate)
  //       console.log(event.detail.scaleX)
  //       console.log(event.detail.scaleY)
  //     },
  //   })
  // },
  // methods: {
  //   beforeUpload(file: any) {
  //     console.log(file)
  //   },
  // },
})
</script>
<style lang="less" scoped>
.image-wapper {
  /* Ensure the size of the image fit the container perfectly */
  img {
    display: block;

    /* This rule is very important, please don't ignore this */
    max-width: 100%;
  }
}
</style>
