<template>
  <a-layout class="editer">
    <a-layout-sider theme="light" width="350">
      <component-list />
    </a-layout-sider>
    <a-layout-content>
      <edite-wrapper
        v-for="component of components"
        :key="component.id"
        :id="component.id"
        :active="component.id === (currentElement && currentElement.id)"
        @set-active="setActive"
      >
        <component :is="component.name" v-bind="component.props" />
      </edite-wrapper>
    </a-layout-content>
    <a-layout-sider theme="light" width="350">
      <props-table :props="currentElement?.props" @change="handleChange" />
    </a-layout-sider>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store/index'
import { ComponentProps } from '@/store/editer'

import LText from '@/components/LText/index.vue'
import ComponentList from '@/components/componentList/index.vue'
import EditeWrapper from '@/components/editeWrapper/index.vue'
import PropsTable from '@/components/propsTable/index.vue'

export default defineComponent({
  components: {
    LText,
    ComponentList,
    EditeWrapper,
    PropsTable,
  },
  setup() {
    const store = useStore<GlobalDataProps>()

    const components = computed(() => store.state.editer.components)

    const currentElement = computed(() => store.getters.getCurrentElement)

    const deleteComponent = (component: ComponentProps) => {
      store.commit('deleteComponent', component)
    }

    const setActive = (id: string) => {
      store.commit('setActive', id)
    }

    const handleChange = (event: any) => {
      store.commit('updateComponent', event)
    }

    return {
      components,
      deleteComponent,
      setActive,
      currentElement,
      handleChange,
    }
  },
})
</script>

<style lang="less" scoped>
.editer {
  height: 100%;
}
</style>
