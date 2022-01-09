<template>
  <!-- <IconSwitch></IconSwitch> -->
  <!-- <image-uploader /> -->
  <div class="image-wapper">
    <img
      id="image"
      src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%3A%2F%2Fdingyue.ws.126.net%2F2021%2F0128%2F6cd17366j00qnmnle008uc000vk00xcm.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643210383&t=85b0bdb2f86ba7486fdad23fd66dd36d"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// import IconSwitch from '@/components/IconSwitch/index.vue'
// import ImageUploader from '@/components/imageUploader/index.vue'

import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

export default defineComponent({
  components: {
    // IconSwitch,
    // ImageUploader,
  },
  mounted() {
    const image = document.getElementById('image') as HTMLImageElement
    new Cropper(image, {
      aspectRatio: 16 / 9,
      crop(event) {
        console.log(event.detail.x)
        console.log(event.detail.y)
        console.log(event.detail.width)
        console.log(event.detail.height)
        console.log(event.detail.rotate)
        console.log(event.detail.scaleX)
        console.log(event.detail.scaleY)
      },
    })
  },
  methods: {
    beforeUpload(file: any) {
      console.log(file)
    },
  },
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
