<template>
  <div class="uploader">
    <input
      type="file"
      :style="{ display: 'none' }"
      ref="fileInputRef"
      @change="handlefileChange"
      :multiple="multiple"
    />

    <div
      class="drag-area"
      v-if="drag"
      v-on="events"
      :class="isDragOver ? 'is-drag-over' : ''"
    >
      <div>
        <upload-outlined class="area-icon" />
        <div>将文件拖到此处，或<em>点击上传</em></div>
      </div>
    </div>

    <a-button
      v-else
      type="primary"
      :loading="isUploading"
      @click="triggerUpload"
    >
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

import {
  CloseOutlined,
  LoadingOutlined,
  UploadOutlined,
} from '@ant-design/icons-vue'

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
    drag: Boolean,
    autoUpload: Boolean,
    multiple: Boolean,
  },
  emits: ['success', 'error'],
  components: {
    CloseOutlined,
    LoadingOutlined,
    UploadOutlined,
  },
  setup(props, { emit }) {
    const fileInputRef = ref<null | HTMLInputElement>(null)

    const fileList = ref<UploaderFile[]>([])

    const isUploading = computed(() =>
      fileList.value.some((file) => file.state === 'uploading')
    )

    const active = ref<null | number>(null)

    const addFileToList = (file: File) => {
      const fileObj: UploaderFile = {
        name: file.name,
        raw: file,
        size: file.size,
        state: 'ready',
        uid: uuidv4(),
      }
      fileList.value.push(fileObj)
      if (props.autoUpload) {
        postFile(fileObj)
      }
    }

    const uploadFiles = () => {
      fileList.value
        .filter((file) => file.state === 'ready')
        .forEach((readyFile) => postFile(readyFile))
    }

    const beforeUploadCheck = (files: null | FileList) => {
      if (files) {
        if (props.beforeUpload) {
          const result = props.beforeUpload(props.multiple ? files : files[0])
          if (result && result instanceof Promise) {
            result
              .then(() => {
                Array.prototype.forEach.call(files, (file) => {
                  addFileToList(file)
                })
              })
              .catch((e) => {
                console.error(e)
              })
          } else if (result !== false) {
            Array.prototype.forEach.call(files, (file) => {
              addFileToList(file)
            })
          }
        } else {
          Array.prototype.forEach.call(files, (file) => {
            addFileToList(file)
          })
        }
      }
    }

    const triggerUpload = () => {
      fileInputRef.value?.click()
    }

    const handlefileChange = (event: Event) => {
      const target = event.target as HTMLInputElement
      beforeUploadCheck(target.files)
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

    const isDragOver = ref<boolean>(false)

    const handleDrag = (e: DragEvent, over: boolean) => {
      e.preventDefault()
      isDragOver.value = over
    }

    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      isDragOver.value = false

      if (e.dataTransfer) {
        beforeUploadCheck(e.dataTransfer.files)
      }
    }

    let events: { [key: string]: (e: any) => void } = {
      click: triggerUpload,
    }
    // 拖拽事件
    if (props.drag) {
      events = {
        ...events,
        dragover: (e: DragEvent) => {
          handleDrag(e, true)
        },
        dragleave: (e: DragEvent) => {
          handleDrag(e, false)
        },
        drop: handleDrop,
      }
    }

    return {
      fileInputRef,
      isUploading,
      fileList,
      active,
      events,
      isDragOver,
      triggerUpload,
      handlefileChange,
      onDelFileHandle,
      uploadFiles,
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
.drag-area {
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  box-sizing: border-box;
  width: 360px;
  height: 180px;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  em {
    color: #409eff;
    font-style: normal;
  }
  .area-icon {
    font-size: 64px;
  }
}
.is-drag-over {
  border: 1px solid #409eff;
}
</style>
