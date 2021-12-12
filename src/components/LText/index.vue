<template>
  <component :is="tag" :style="styleProps" @click="handleClick">
    {{ text }}
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  transformToComponentProps,
  TextComponentProps,
  textDefaultProps,
} from '../../shared/defaultProps'
import useCommonComponent from '../../hooks/useCommonComponent'

const defaultProps = transformToComponentProps(TextComponentProps)

export default defineComponent({
  props: {
    tag: {
      type: String,
      default: 'span',
    },
    ...defaultProps,
  },
  setup(props) {
    const { styleProps, handleClick } = useCommonComponent(
      props,
      textDefaultProps
    )
    return {
      styleProps,
      handleClick,
    }
  },
})
</script>
