<template>
  <div class="inline-edit" @click="clickHandle" ref="warpper">
    <input
      ref="inlineEditRef"
      v-model="innerValue"
      class="ant-input"
      v-if="isEditing"
    />
    <slot v-else :text="innerValue"
      ><span>{{ innerValue }}</span></slot
    >
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, nextTick } from 'vue'
import useKeyPress from '@/hooks/useKeyPress'
import useClickOutside from '@/hooks/useClickOutside'

export default defineComponent({
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const inlineEditRef = ref<null | HTMLInputElement>(null)

    const warpper = ref<null | HTMLInputElement>(null)
    const isOutside = useClickOutside(warpper)

    const innerValue = ref<string>(props.value)

    const isEditing = ref(false)

    const originalValue = ref<string>(props.value)

    watch(isEditing, async (val) => {
      await nextTick()
      if (val) {
        inlineEditRef.value?.focus()
      }
    })

    useKeyPress('Enter', () => {
      if (isEditing.value) {
        emit('change', innerValue.value)
      }
      originalValue.value = innerValue.value
      isEditing.value = false
    })

    useKeyPress('Escape', () => {
      isEditing.value = false
      innerValue.value = originalValue.value
    })

    watch(isOutside, (val) => {
      if (val) {
        isEditing.value = false
        originalValue.value = innerValue.value
        emit('change', innerValue.value)
      }
      isOutside.value = false
    })

    const clickHandle = () => {
      isEditing.value = true
    }

    return {
      warpper,
      innerValue,
      inlineEditRef,
      isEditing,
      clickHandle,
    }
  },
})
</script>
<style lang="less" scoped>
.inline-edit {
  cursor: pointer;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
}
.ant-input.input-error {
  border: 1px solid #f5222d;
}
.ant-input.input-error:focus {
  border-color: #f5222d;
}
.ant-input.input-error::placeholder {
  color: #f5222d;
}
</style>
