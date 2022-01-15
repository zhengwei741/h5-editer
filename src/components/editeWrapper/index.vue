<template>
  <div
    class="edit-wrapper"
    @click="onItemClick(id)"
    :class="{ active: active, hidden: hidden }"
    @mousedown="startMove"
    ref="editWrapper"
  >
    <slot></slot>
    <div class="resizer-wapper" v-if="active">
      <div
        class="resizer resizer-top-left"
        @mousedown.stop="startResize('top-left')"
      ></div>
      <div
        class="resizer resizer-top-right"
        @mousedown.stop="startResize('top-right')"
      ></div>
      <div
        class="resizer resizer-bottom-left"
        @mousedown.stop="startResize('bottom-left')"
      ></div>
      <div
        class="resizer resizer-bottom-right"
        @mousedown.stop="startResize('bottom-right')"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue'

type ResizeDirection = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
interface OriginalPositions {
  left: number
  right: number
  top: number
  bottom: number
}

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
    const gap = {
      x: 0,
      y: 0,
    }
    const editWrapper = ref<null | HTMLElement>(null)

    const caculateMovePosition = (e: MouseEvent) => {
      const container = document.getElementById('editerContent') as HTMLElement
      const containerRect = container.getBoundingClientRect()
      const left = e.clientX - gap.x - containerRect.left
      const top = e.clientY - gap.y - containerRect.top + container.scrollTop
      return {
        left,
        top,
      }
    }

    const startMove = (e: MouseEvent) => {
      const currentElement = editWrapper.value as HTMLElement
      if (currentElement) {
        const { left, top } = currentElement.getBoundingClientRect()
        gap.x = e.pageX - left
        gap.y = e.pageY - top
      }

      const handleMove = (e: MouseEvent) => {
        e.preventDefault()
        const { left, top } = caculateMovePosition(e)
        currentElement.style.left = `${left}px`
        currentElement.style.top = `${top}px`
      }
      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMove)
        nextTick(() => {
          document.removeEventListener('mouseup', handleMouseUp)
        })
      }
      document.addEventListener('mousemove', handleMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    const caculateSize = (
      direction: ResizeDirection,
      e: MouseEvent,
      positions: OriginalPositions
    ) => {
      const container = document.getElementById('editerContent') as HTMLElement
      const containerRect = container.getBoundingClientRect()
      switch (direction) {
        case 'bottom-right':
          return {
            width: e.clientX - positions.left,
            height: e.clientY - positions.top,
          }
        case 'top-right':
          return {
            top: e.clientY - containerRect.top,
            width: e.clientX - positions.left,
            height: positions.bottom - e.clientY,
          }
        case 'bottom-left':
          return {
            left: e.clientX - containerRect.left,
            width: positions.right - e.clientX,
            height: e.clientY - positions.top,
          }
        case 'top-left':
          return {
            top: e.clientY - containerRect.top,
            left: e.clientX - containerRect.left,
            width: positions.right - e.clientX,
            height: positions.bottom - e.clientY,
          }
      }
    }

    const startResize = (direction: ResizeDirection) => {
      const currentElement = editWrapper.value as HTMLElement
      const { left, right, top, bottom } =
        currentElement.getBoundingClientRect()
      const handleMove = (e: MouseEvent) => {
        const size = caculateSize(direction, e, { left, right, top, bottom })
        const { style } = currentElement
        if (size) {
          style.width = size.width + 'px'
          style.height = size.height + 'px'
          if (size.left) {
            style.left = size.left + 'px'
          }
          if (size.top) {
            style.top = size.top + 'px'
          }
        }
      }
      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMove)
        nextTick(() => {
          document.removeEventListener('mouseup', handleMouseUp)
        })
      }
      document.addEventListener('mousemove', handleMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return {
      onItemClick,
      editWrapper,
      startMove,
      startResize,
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
