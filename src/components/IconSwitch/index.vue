<template>
  <div class="icon-switch-warpper">
    <a-tooltip placement="top">
      <template #title>
        <span>{{ tip }}</span>
      </template>
      <div
        class="icon-switch"
        @click="onChange"
        :class="val ? 'isClick' : 'unClick'"
      >
        <span class="text">
          <slot>B</slot>
        </span>
      </div>
    </a-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    value: {
      type: Boolean,
    },
    tip: {
      type: String,
    },
  },
  emits: ['change'],
  setup(props, context) {
    const val = ref(props.value)

    const onChange = () => {
      val.value = !val.value
      context.emit('change', val.value)
    }

    return {
      val,
      onChange,
    }
  },
})
</script>
<style lang="less" scoped>
.icon-switch {
  border-radius: 50%;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dddd;
  cursor: pointer;
  .text {
    font-size: 30px;
  }
}
.isClick {
  background-color: #669eff;
  .text {
    color: white;
  }
}
.unClick {
  background-color: #fff;
  .text {
    color: #669eff;
  }
}
</style>
