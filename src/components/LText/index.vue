<template>
  <component :is="tag" :style="styleProps">
    {{ text }}
  </component>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { pick } from 'lodash-es'
import {
  transformToComponentProps,
  TextComponentProps,
  textDefaultProps,
} from '@/shared/defaultProps'

const defaultProps = transformToComponentProps(TextComponentProps)

export default defineComponent({
  props: {
    tag: {
      type: String,
      default: 'span',
    },
    text: {
      type: String,
      default: '',
    },
    ...defaultProps,
  },
  setup(props) {
    const styleProps = computed(() => pick(props, textDefaultProps))
    return {
      styleProps,
    }
  },
})
</script>
