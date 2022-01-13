<template>
  <image-processer
    v-if="value"
    :value="value"
    @change="handleChange"
    showDelete
  />
  <image-uploader v-else @success="imageUploadHandle" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ImageUploader from '@/components/imageUploader/index.vue'
import ImageProcesser from '@/components/imageProcesser/index.vue'

export default defineComponent({
  components: {
    ImageUploader,
    ImageProcesser,
  },
  props: {
    value: {
      type: String,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const handleChange = (e: any) => {
      emit('change', e)
    }

    const imageUploadHandle = () => {
      // TODO
      const url =
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%3A%2F%2Fdingyue.ws.126.net%2F2021%2F0128%2F6cd17366j00qnmnle008uc000vk00xcm.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643210383&t=85b0bdb2f86ba7486fdad23fd66dd36d'
      emit('change', url)
    }

    return {
      handleChange,
      imageUploadHandle,
    }
  },
})
</script>
