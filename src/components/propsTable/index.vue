<template>
  <div
    v-for="(value, key) in finalProps"
    :key="key"
    :class="'props-table-item' + ' ' + value.component"
    :id="`item-${key}`"
  >
    <span class="label" v-if="value.text">{{ value.text }}</span>
    <component
      class="prop-component"
      :is="value.component"
      :[value.valueProp]="value.value"
      v-bind="value.extarProps"
      v-on="value.events"
    >
      <template v-if="value.options">
        <component
          :is="value.subComponent"
          v-for="(option, index) in value.options"
          :key="index"
          :value="option.value"
        >
          <render-vnode :vNode="option.text" />
        </component>
      </template>
    </component>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { reduce } from 'lodash-es'
import { AllComponentProps } from '@/shared/defaultProps'
import { PropToForm, PropsToForms, mapToPropsToForms } from '@/shared/propsMap'
import RenderVnode from './renderVnode.vue'

import ColorPicker from '@/components/colorPicker/index.vue'
import IconSwitch from '@/components/IconSwitch/index.vue'
import ImageProcesser from '@/components/imageProcesser/index.vue'
import ShadowPicker from '@/components/shadowPicker/index.vue'

interface FormProps extends PropToForm {
  value?: string
  events: { [key: string]: (e: any) => any }
}

export default defineComponent({
  components: {
    RenderVnode,
    ColorPicker,
    IconSwitch,
    ImageProcesser,
    ShadowPicker,
  },
  props: {
    props: {
      type: Object as PropType<AllComponentProps>,
    },
  },
  emits: ['change'],
  setup(props, context) {
    const finalProps = computed(() => {
      return reduce(
        props.props,
        (result, value, key) => {
          const newKeys = key as keyof PropsToForms
          const item = mapToPropsToForms[newKeys]
          if (item) {
            const {
              valueProp = 'value',
              initalTransform,
              afterTransform,
              eventName = 'change',
            } = item

            const newItem: FormProps = {
              ...item,
              valueProp,
              eventName,
              value: initalTransform ? initalTransform(value) : value,
              events: {
                [eventName]: (e) => {
                  context.emit('change', {
                    key,
                    value: afterTransform ? afterTransform(e) : e,
                  })
                },
              },
            }

            result[newKeys] = newItem
          }
          return result
        },
        {} as { [key: string]: FormProps }
      )
    })

    return {
      finalProps,
    }
  },
})
</script>
<style lang="less" scoped>
.props-table-item {
  display: flex;
  align-items: center;
  padding: 5px 0;
}
.label {
  width: 25%;
  flex: 1;
}
.prop-component {
  width: 75%;
  flex: 3;
}
.icon-switch {
  display: inline-block;
  margin-left: 80px;
}
#item-textDecoration {
  margin-left: 20px;
}
#item-fontStyle {
  margin-left: 20px;
}
</style>
