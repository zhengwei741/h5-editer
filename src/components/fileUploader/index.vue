<template>
  <div class="uploader">
    <input
      type="file"
      :style="{ display: 'none' }"
      ref="fileInputRef"
      @change="handlefileChange"
    />
    <button @click="triggerUpload">
      <span v-if="state === 'ready'">点击上传</span>
      <span v-else-if="state === 'uploading'">上传中</span>
      <span v-else-if="state === 'success'">上传成功</span>
      <span v-else>上传失败</span>
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { uploadFile } from '@/api/test'

type fileUploaderState = 'ready' | 'uploading' | 'success' | 'error'

export default defineComponent({
  setup() {
    const fileInputRef = ref<null | HTMLInputElement>(null)

    const state = ref<fileUploaderState>('ready')

    const triggerUpload = () => {
      fileInputRef.value?.click()
    }

    const handlefileChange = (event: Event) => {
      const target = event.target as HTMLInputElement

      const files = target.files

      if (files) {
        state.value = 'uploading'
        uploadFile(files)
          .then(() => {
            state.value = 'success'
          })
          .catch(() => {
            state.value = 'error'
          })
      }
    }

    return {
      fileInputRef,
      state,
      triggerUpload,
      handlefileChange,
    }
  },
})
</script>
