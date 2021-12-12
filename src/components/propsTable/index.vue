<template>
  <div>
    <div v-for="(value, key) in finalProps" :key="key" class="props-table-item">
      <span class="label">{{ value.text }}</span>
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
            >{{ option.text }}</component
          >
        </template>
      </component>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { reduce } from 'lodash-es'
import { TextComponentProps } from '@/shared/defaultProps'
import { PropToForm, PropsToForms, mapToPropsToForms } from '@/shared/propsMap'

interface FormProps extends PropToForm {
  value?: string
  events: { [key: string]: (e: any) => any }
}

export default defineComponent({
  props: {
    props: {
      type: Object as PropType<TextComponentProps>,
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
}
.label {
  width: 30%;
  flex: 1;
}
.prop-component {
  width: 70%;
  flex: 3;
}
</style>
