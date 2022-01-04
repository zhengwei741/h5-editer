<template>
  <div class="component-list">
    <div
      v-for="(template, index) of templates"
      class="component-item"
      :key="index"
      @click="onItemClick(template)"
    >
      <l-tetx v-bind="template"></l-tetx>
    </div>
    <div class="component-item">
      <image-uploader @success="imageUploadHandle" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import { clone } from 'lodash-es'

import LTetx from '../LText/index.vue'
import { defaultTextTemplates } from '@/shared/defaultTemplates'
import {
  CommonDefaultProps,
  imageDefaultProps,
} from '../../shared/defaultProps'

import ImageUploader from '@/components/imageUploader/index.vue'
import { getImageDimensions } from '../../shared/helper'

export default defineComponent({
  components: {
    LTetx,
    ImageUploader,
  },
  setup() {
    const templates = computed(() => defaultTextTemplates)
    const store = useStore()

    const onItemClick = (template: Partial<CommonDefaultProps>) => {
      store.commit('addComponent', {
        props: clone(template),
        name: 'l-text',
        id: uuidv4(),
      })
    }

    const imageUploadHandle = () => {
      const url =
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%3A%2F%2Fdingyue.ws.126.net%2F2021%2F0128%2F6cd17366j00qnmnle008uc000vk00xcm.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643210383&t=85b0bdb2f86ba7486fdad23fd66dd36d'

      getImageDimensions(url).then(({ width }) => {
        const maxWidth = 375
        imageDefaultProps.width = (width > maxWidth ? maxWidth : width) + 'px'
        store.commit('addComponent', {
          props: {
            ...imageDefaultProps,
            src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%3A%2F%2Fdingyue.ws.126.net%2F2021%2F0128%2F6cd17366j00qnmnle008uc000vk00xcm.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643210383&t=85b0bdb2f86ba7486fdad23fd66dd36d',
          },
          name: 'l-image',
          id: uuidv4(),
        })
      })
    }

    return {
      templates,
      onItemClick,
      imageUploadHandle,
    }
  },
})
</script>
<style lang="less" scoped>
.component-list {
  .component-item {
    text-align: center;
    display: flex;
    justify-content: center;
    cursor: pointer;
    padding: 5px;
  }
}
</style>
