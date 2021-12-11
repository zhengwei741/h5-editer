<template>
  <a-layout class="editer">
    <a-layout-sider theme="light" width="350">
      <component-list />
    </a-layout-sider>
    <a-layout-content>
      <div
        v-for="component of components"
        :key="component.id"
        class="component-wapper"
      >
        <span class="close" @click="deleteComponent(component)">删除</span>
        <component :is="component.name" v-bind="component.props" />
      </div>
    </a-layout-content>
    <a-layout-sider theme="light" width="350">Sider</a-layout-sider>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store/index'

import LText from '@/components/LText/index.vue'
import ComponentList from '@/components/componentList/index.vue'
import { ComponentProps } from '@/store/editer'

export default defineComponent({
  components: {
    LText,
    ComponentList,
  },
  setup() {
    const store = useStore<GlobalDataProps>()

    const components = computed(() => store.state.editer.components)

    const deleteComponent = (component: ComponentProps) => {
      store.commit('deleteComponent', component)
    }

    return {
      components,
      deleteComponent,
    }
  },
})
</script>

<style lang="less" scoped>
.editer {
  height: 100%;
  .component-wapper {
    position: relative;
    .close {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
</style>
