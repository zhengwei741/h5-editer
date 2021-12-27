<template>
  <component
    :is="type"
    :style="styleProps"
    @click.prevent="handleClick"
    class="l-image-component"
    :src="src"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  transformToComponentProps,
  imageDefaultProps,
  imageStylePropsNames,
} from '../../shared/defaultProps'
import useCommonComponent from '../../hooks/useCommonComponent'

const defaultProps = transformToComponentProps(imageDefaultProps)

export default defineComponent({
  props: {
    ...defaultProps,
  },
  setup(props) {
    const { styleProps, handleClick } = useCommonComponent(
      props,
      imageStylePropsNames
    )
    return {
      styleProps,
      handleClick,
      type: 'img',
    }
  },
})
</script>
<style scoped>
.l-image-component {
  max-width: 100%;
  position: relative !important;
}
</style>
