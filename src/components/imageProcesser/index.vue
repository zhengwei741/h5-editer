<template>
  <div class="image-processer">
    <a-modal
      v-model:visible="visible"
      title="裁剪图片"
      :keyboard="false"
      :maskClosable="false"
      okText="确定"
      cancelText="取消"
      @ok="handleOk"
    >
      <div class="image-cropper">
        <img ref="imageRef" id="processed-image" :src="value" />
      </div>
    </a-modal>

    <a-row>
      <a-col :span="12">
        <div class="image-preview" :style="previewStyle"></div>
      </a-col>
      <a-col :span="12" class="image-process">
        <image-uploader @success="onUploadeSuccess">
          <template #default>
            <a-button shape="round" style="width: 100%">
              <template #icon>
                <ScissorOutlined />
                更换图片
              </template>
            </a-button>
          </template>
          <template #uploading>
            <a-button shape="round" style="width: 100%" :loading="true">
              <template #icon>
                <ScissorOutlined />
                上传中
              </template>
            </a-button>
          </template>
        </image-uploader>
        <a-button shape="round" @click="showModal">
          <template #icon>
            <DeleteOutlined />
            裁剪图片
          </template>
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, nextTick, computed } from 'vue'
import { DeleteOutlined, ScissorOutlined } from '@ant-design/icons-vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { uploadFile } from '@/api/upload'
import ImageUploader from '@/components/imageUploader/index.vue'

interface CropData {
  x: number
  y: number
  width: number
  height: number
}

export default defineComponent({
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  components: {
    DeleteOutlined,
    ScissorOutlined,
    ImageUploader,
  },
  emits: ['change'],
  setup(props, { emit }) {
    const visible = ref<boolean>(false)

    const imageRef = ref<null | HTMLImageElement>(null)

    let cropper: Cropper

    let cropData = ref<CropData | null>(null)

    watch(visible, async (newVal) => {
      await nextTick()
      if (newVal && imageRef.value) {
        cropper = new Cropper(imageRef.value, {
          crop(event: any) {
            cropData.value = {
              x: event.detail.x,
              y: event.detail.y,
              width: event.detail.width,
              height: event.detail.height,
            }
          },
        })
      } else {
        if (cropper) {
          cropper.destroy()
        }
      }
    })

    const showModal = () => {
      visible.value = true
    }

    const handleOk = () => {
      visible.value = false

      cropper.getCroppedCanvas().toBlob((blod) => {
        if (blod) {
          const formData = new FormData()
          formData.append('croppedImage', blod, 'test.png')
          uploadFile(formData).then(() => {
            emit(
              'change',
              'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F003bba6c74ce151d3ce31aaa6cb7c6ecb72683e917605-ekncjt_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1644329888&t=d370131054c3de2541f9ef164d3401f5'
            )
          })
        }
      })
    }

    const previewStyle = computed(() => {
      return {
        backgroundImage: `url(${props.value})`,
      }
    })

    const onUploadeSuccess = () => {
      emit(
        'change',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%3A%2F%2Fdingyue.ws.126.net%2F2021%2F0916%2Fef325777j00qziup0009gc000uj00j1m.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1644330592&t=b0ddfb6c855ee479cc289e5f4b94eb3f'
      )
    }
    return {
      visible,
      imageRef,
      showModal,
      handleOk,
      previewStyle,
      onUploadeSuccess,
    }
  },
})
</script>

<style lang="less" scoped>
.image-preview {
  width: 150px;
  height: 84px;
  border: 1px dashed #e6ebed;
  background: no-repeat 50% / contain;
}
.image-processer {
  padding: 10px;
}
.image-process {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.image-cropper img {
  display: block;
  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
</style>
