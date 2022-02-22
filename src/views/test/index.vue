<template>
  <!-- <IconSwitch></IconSwitch> -->
  <!-- <image-uploader /> -->
  <div id="test">
    <div
      class="content-inner"
      id="editerContent"
      data-v-681b2dd8=""
      style="
        background-color: rgb(255, 255, 255);
        background-repeat: no-repeat;
        background-size: cover;
        height: 530px;
      "
    >
      <div
        class="edit-wrapper"
        data-cid="ae8760cc-43e9-4b57-b462-76dc9d601fc3"
        data-v-681b2dd8=""
        style="position: absolute; top: 309px; left: 114px; width: 100px"
      >
        <h2
          data-v-681b2dd8=""
          style="
            font-size: 30px;
            font-weight: bold;
            width: 100px;
            padding: 0px;
            border-style: none;
            border-color: rgb(0, 0, 0);
            border-width: 0px;
            border-radius: 0px;
            box-shadow: rgb(0, 0, 0) 0px 0px 0px;
            opacity: 1;
            position: absolute;
            left: 114px;
            top: 309px;
            right: 0px;
          "
        >
          大标题
        </h2>
        <!--v-if-->
      </div>
      <div
        class="edit-wrapper"
        data-cid="d155bbdd-78d1-41b7-9d3b-a5d774f0666e"
        data-v-681b2dd8=""
        style="position: absolute; top: 42px; left: 167px; width: 100px"
      >
        <p
          data-v-681b2dd8=""
          style="
            font-size: 30px;
            width: 100px;
            padding: 0px;
            border-style: none;
            border-color: rgb(0, 0, 0);
            border-width: 0px;
            border-radius: 0px;
            box-shadow: rgb(0, 0, 0) 0px 0px 0px;
            opacity: 1;
            position: absolute;
            left: 167px;
            top: 42px;
            right: 0px;
          "
        >
          正文内容
        </p>
        <!--v-if-->
      </div>
      <div
        class="edit-wrapper"
        data-cid="79141ace-c901-418c-8ac4-1fe64c846c29"
        data-v-681b2dd8=""
        style="position: absolute; top: 140px; left: 91px; width: 100px"
      >
        <p
          data-v-681b2dd8=""
          style="
            font-size: 30px;
            text-decoration: underline;
            color: rgb(24, 144, 255);
            width: 100px;
            padding: 0px;
            border-style: none;
            border-color: rgb(0, 0, 0);
            border-width: 0px;
            border-radius: 0px;
            box-shadow: rgb(0, 0, 0) 0px 0px 0px;
            opacity: 1;
            position: absolute;
            left: 91px;
            top: 140px;
            right: 0px;
          "
        >
          链接内容
        </p>
        <!--v-if-->
      </div>
    </div>
  </div>
  <img id="img" />
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'

import html2canvas from 'html2canvas'

// import IconSwitch from '@/components/IconSwitch/index.vue'
// import ImageUploader from '@/components/imageUploader/index.vue'

// import Cropper from 'cropperjs'
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
      const el = document.getElementById('test') as HTMLElement
      html2canvas(el, { width: 375, useCORS: true, scale: 1 }).then(
        (canvas) => {
          const img = document.getElementById('img') as HTMLElement
          img.setAttribute('src', canvas.toDataURL())
        }
      )
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
