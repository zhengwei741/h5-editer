<template>
  <div class="color-picker">
    <input
      type="color"
      class="color-input"
      :value="value"
      @change="onInputChangeHandle"
    />
    <ul class="color-picker-list">
      <li
        class="color-item"
        v-for="(color, index) of colors"
        :key="index"
        @click.prevent="onChangeHandle(color)"
      >
        <div :style="{ background: color }" v-if="color"></div>
        <div class="transparent-back" v-else></div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

const defaultColors = [
  '#ffffff',
  '#f5222d',
  '#fa541c',
  '#fadb14',
  '#52c41a',
  '#1890ff',
  '#722ed1',
  '#8c8c8c',
  '#000000',
  '',
]

export default defineComponent({
  props: {
    value: {
      type: String,
    },
    colors: {
      type: Array as PropType<string[]>,
      default: defaultColors,
    },
  },
  emits: ['change'],
  setup(props, context) {
    const onChangeHandle = (color: any) => {
      context.emit('change', color)
    }

    const onInputChangeHandle = (e: Event) => {
      const target = e.target as HTMLInputElement
      context.emit('change', target.value)
    }

    return {
      onChangeHandle,
      onInputChangeHandle,
    }
  },
})
</script>
<style lang="less" scoped>
.color-picker {
  display: flex;
  .color-input {
    flex: 1;
    height: 50px;
  }
  .color-picker-list {
    flex: 2;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .color-item {
      flex: 1;
      width: 20%;
      min-width: 20%;
      max-width: 20%;
      padding: 3px;
      > div {
        padding: 3px;
        width: 20px;
        height: 20px;
        border-radius: 3px;
        margin-right: 5px;
        cursor: pointer;
        border: 1px solid #ccc;
      }
    }
    .transparent-back {
      background: url('~@/assets/img/transparent.png') no-repeat;
    }
  }
}
</style>
