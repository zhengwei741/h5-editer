<template>
  <div
    class="edit-wrapper"
    @click="onItemClick(id)"
    :class="{ active: active, hidden: hidden }"
    :style="wrapperStyle"
    @mousedown="onMousedown"
    @mouseup="onMouseup"
    ref="wrapperRef"
  >
    <slot></slot>
    <div class="resizer-wapper" v-if="active">
      <div class="resizer resizer-top-left"></div>
      <div class="resizer resizer-top-right"></div>
      <div class="resizer resizer-bottom-left"></div>
      <div
        class="resizer resizer-bottom-right"
        @mousedown.stop="(e) => onResizerMousedown('bottom-right')"
        @mouseup="onResizerMouseUp"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
    },
    hidden: {
      type: Boolean,
    },
  },
  emits: ['set-active'],
  setup(props, { emit }) {
    const onItemClick = (id: string) => {
      emit('set-active', id)
    }
    const top = ref(20)
    const left = ref(20)
    const height = ref<number | string>('')
    const width = ref<number | string>('')
    const wrapperStyle = computed(() => {
      return {
        top: `${top.value}px`,
        left: `${left.value}px`,
        height: `${height.value ? height.value : ''}px`,
        width: `${width.value ? width.value : ''}px`,
      }
    })
    const paddingLeft = ref(0)
    const paddingTop = ref(0)
    const wrapperRef = ref<null | HTMLElement>(null)
    const onMousedown = (e: MouseEvent) => {
      if (wrapperRef.value && rect) {
        const { pageX, pageY } = e
        const wrapperRefRect = wrapperRef.value.getBoundingClientRect()
        paddingLeft.value = pageX - wrapperRefRect.left
        paddingTop.value = pageY - wrapperRefRect.top
        document.addEventListener('mousemove', move)
      }
    }
    const onMouseup = () => {
      document.removeEventListener('mousemove', move)
    }
    const editerContent = document.getElementById(
      'editerContent'
    ) as HTMLElement
    const rect = editerContent?.getBoundingClientRect()
    const move = (e: MouseEvent) => {
      e.preventDefault()
      if (rect) {
        const { pageX, pageY } = e
        left.value = pageX - rect.left - paddingLeft.value
        top.value =
          pageY - rect.top - paddingTop.value + editerContent?.scrollTop
      }
    }
    let dir = ref('')
    const calculateLocation = (position: any) => {
      if (wrapperRef.value) {
        let { left, top } = wrapperRef.value.getBoundingClientRect()
        let { x, y } = position
        switch (dir.value) {
          case 'bottom-right':
            return {
              width: x - left,
              height: y - top,
            }
          default:
            break
        }
      }
    }
    const onResizerMousedown = (direction: string) => {
      dir.value = direction
      document.addEventListener('mousemove', resizerMove)
    }
    const resizerMove = (e: MouseEvent) => {
      e.preventDefault()
      const rect = calculateLocation({
        x: e.pageX,
        y: e.pageY,
      })
      if (rect) {
        height.value = rect.height
        width.value = rect.width
      }
    }
    const onResizerMouseUp = () => {
      document.removeEventListener('mousemove', resizerMove)
    }

    return {
      onItemClick,
      wrapperStyle,
      onMousedown,
      onMouseup,
      wrapperRef,
      onResizerMousedown,
      onResizerMouseUp,
    }
  },
})
</script>
<style lang="less" scoped>
.edit-wrapper {
  padding: 0px;
  cursor: pointer;
  border: 1px solid transparent;
  user-select: none;
  box-sizing: content-box !important;
  position: absolute;
  top: 20px;
  left: 20px;
}
.edit-wrapper > * {
  position: static !important;
  width: 100% !important;
  height: 100% !important;
}
.edit-wrapper:hover {
  border: 1px dashed #ccc;
}
.edit-wrapper.hidden {
  display: none;
}
.edit-wrapper.active {
  border: 1px solid #1890ff;
  user-select: none;
  z-index: 1500;
}
.edit-wrapper .resizers {
  display: none;
}
.edit-wrapper.active .resizers {
  display: block;
}
.resizer-wapper {
  position: absolute;
  .resizer {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    position: absolute;
    background: #fff;
    border: 3px solid #1890ff;
  }
  .resizer-top-left {
    top: -5px;
    left: -5px;
    cursor: nwse-resize;
  }
  .resizer-top-right {
    top: -5px;
    right: -5px;
    cursor: nesw-resize;
  }
  .resizer-bottom-left {
    bottom: -5px;
    left: -5px;
    cursor: nesw-resize;
  }
  .resizer-bottom-right {
    bottom: -5px;
    right: -5px;
    cursor: nwse-resize;
  }
}
</style>
