<template>
  <FileUploader
    actions="https://jsonplaceholder.typicode.com/posts/"
    :beforeUpload="beforeUpload"
    :showUploadList="false"
    autoUpload
    @success="onSuccessHandle"
    @error="onErrorHandle"
  >
    <template #uploading>
      <a-button :loading="true" disabled>上传中</a-button>
    </template>
    <template #default>
      <a-button>上传图片</a-button>
    </template>
  </FileUploader>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FileUploader from '@/components/fileUploader/index.vue'
import { message } from 'ant-design-vue'

export default defineComponent({
  components: {
    FileUploader,
  },
  emits: ['success'],
  methods: {
    beforeUpload(file: File) {
      const format = ['image/jpeg', 'image/png']
      if (!format.includes(file.type)) {
        message.error('只能上传图片类型')
        return false
      }
      if (file.size >= 3145728) {
        message.error('不能大于3M')
        return false
      }
    },
    onSuccessHandle(file: any) {
      this.$emit('success', file)
    },
    onErrorHandle() {
      // TODO
      this.onSuccessHandle(null)
      message.error('上传失败')
    },
  },
})
</script>
