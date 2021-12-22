<template>
  <div class="uploader">
    <input
      type="file"
      :style="{ display: 'none' }"
      ref="fileInputRef"
      @change="handlefileChange"
    />

    <a-button type="primary" :loading="isUploading" @click="triggerUpload">
      <span v-if="isUploading">上传中</span>
      <span v-else>点击上传</span>
    </a-button>

    <ul class="uploadFile-list">
      <li
        class="uploadFile-item"
        v-for="(file, index) in fileList"
        :key="file.uid"
        @mouseenter="active = index"
        @mouseleave="active = null"
        :class="file.state"
      >
        <span>{{ file.name }}</span>
        <span v-if="file.state === 'uploading'">
          <loading-outlined />
        </span>
        <span v-else>
          <close-outlined
            v-show="file.state === 'error' || active === index"
            :style="
              file.state === 'error' ? { color: 'red' } : { color: 'black' }
            "
            @click="onDelFileHandle(file)"
          />
        </span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

import { CloseOutlined, LoadingOutlined } from '@ant-design/icons-vue'

type fileUploaderState = 'ready' | 'uploading' | 'success' | 'error'

interface UploaderFile {
  uid: string
  state: fileUploaderState
  name: string
  raw: File
  size: number
  response?: any
}

export default defineComponent({
  props: {
    actions: {
      type: String,
      required: true,
    },
    beforeUpload: {
      type: Function,
    },
  },
  emits: ['success', 'error'],
  components: {
    CloseOutlined,
    LoadingOutlined,
  },
  setup(props, { emit }) {
    const fileInputRef = ref<null | HTMLInputElement>(null)

    const fileList = ref<UploaderFile[]>([])

    const isUploading = computed(() =>
      fileList.value.some((file) => file.state === 'uploading')
    )

    const active = ref<null | number>(null)

    const triggerUpload = () => {
      fileInputRef.value?.click()
    }

    const handlefileChange = (event: Event) => {
      const target = event.target as HTMLInputElement

      const files = target.files

      if (files && files[0]) {
        const file = files[0]
        const fileObj: UploaderFile = {
          name: file.name,
          raw: file,
          size: file.size,
          state: 'ready',
          uid: uuidv4(),
        }
        // 校验 beforeUpload 钩子
        if (props.beforeUpload) {
          const result = props.beforeUpload(file)
          if (result && result instanceof Promise) {
            result
              .then(() => {
                postFile(fileObj)
              })
              .catch((e) => {
                console.error(e)
              })
          } else if (result !== false) {
            postFile(fileObj)
          }
        } else {
          postFile(fileObj)
        }
      }
    }

    const onDelFileHandle = (file: UploaderFile) => {
      fileList.value = fileList.value.filter((f) => f.uid !== file.uid)
    }

    const postFile = (readyFile: UploaderFile) => {
      readyFile.state = 'uploading'
      const formData = new FormData()
      formData.append(readyFile.name, readyFile.raw)
      axios
        .post(props.actions, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          readyFile.state = 'success'
          readyFile.response = res
          fileList.value.push(readyFile)
          emit('success', {
            file: readyFile,
            fileList,
          })
        })
        .catch((e) => {
          readyFile.state = 'error'
          emit('error', {
            error: e,
            file: readyFile,
            fileList,
          })
        })
        .finally(() => {
          // 清空原本的值防止重复上传不触发chagne
          if (fileInputRef.value) {
            fileInputRef.value.value = ''
          }
        })
    }

    return {
      fileInputRef,
      isUploading,
      fileList,
      active,
      triggerUpload,
      handlefileChange,
      onDelFileHandle,
    }
  },
})
</script>

<style lang="less" scoped>
.uploadFile-list {
  .uploadFile-item {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 0 5px;
  }
  .uploadFile-item:hover {
    background-color: rgba(128, 128, 128, 0.171);
  }
  .error {
    color: red;
  }
  .success {
    color: green;
  }
}
</style>
