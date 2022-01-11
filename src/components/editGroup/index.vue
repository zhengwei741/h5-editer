<template>
  <a-collapse v-model:activeKey="activeKey" accordion>
    <a-collapse-panel
      v-for="(group, index) in editGroups"
      :key="'item' + index"
      :header="group.text"
    >
      <props-table :props="group.props" @change="handleChange"></props-table>
    </a-collapse-panel>
  </a-collapse>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue'
import { AllComponentProps } from '../../shared/defaultProps'
import { difference } from 'lodash-es'
import PropsTable from '@/components/propsTable/index.vue'

export interface GroupProps {
  text: string
  items: string[]
}
const defaultEditGroups: GroupProps[] = [
  {
    text: '尺寸',
    items: [
      'height',
      'width',
      'paddingLeft',
      'paddingRight',
      'paddingTop',
      'paddingBottom',
    ],
  },
  {
    text: '边框',
    items: ['borderStyle', 'borderColor', 'borderWidth', 'borderRadius'],
  },
  {
    text: '阴影与透明度',
    items: ['opacity', 'boxShadow'],
  },
  {
    text: '位置',
    items: ['left', 'top'],
  },
  {
    text: '事件功能',
    items: ['actionType', 'url'],
  },
]

export default defineComponent({
  components: {
    PropsTable,
  },
  props: {
    props: {
      type: Object as PropType<AllComponentProps>,
      required: true,
    },
    groups: {
      type: Array as PropType<GroupProps[]>,
      default: defaultEditGroups,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const activeKey = ref(['item0'])

    const newGroups = computed(() => {
      const allItems = defaultEditGroups.reduce((prve, current) => {
        return [...prve, ...current.items]
      }, [] as string[])
      return [
        {
          text: '基本属性',
          items: difference(Object.keys(props.props), allItems),
        },
        ...defaultEditGroups,
      ]
    })

    let editGroups = computed(() => {
      return newGroups.value.map((groups) => {
        const groupsProps = groups.items.reduce((prve, current) => {
          const key = current as keyof AllComponentProps
          prve[key] = props.props[key] || ''
          return prve
        }, {} as AllComponentProps)
        return {
          text: groups.text,
          props: groupsProps,
        }
      })
    })
    const handleChange = (e: any) => {
      emit('change', e)
    }
    return {
      editGroups,
      activeKey,
      handleChange,
    }
  },
})
</script>
