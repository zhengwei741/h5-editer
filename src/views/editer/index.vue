<template>
  <a-layout class="editer">
    <a-layout-sider theme="light" width="350" class="sider">
      <component-list />
    </a-layout-sider>
    <a-layout-content class="content">
      <div class="content-inner" :style="page.props">
        <edite-wrapper
          v-for="component of components"
          :key="component.id"
          :id="component.id"
          :hidden="component.isHide"
          :active="component.id === (currentElement && currentElement.id)"
          @set-active="setActive"
        >
          <component :is="component.name" v-bind="component.props" />
        </edite-wrapper>
      </div>
    </a-layout-content>
    <a-layout-sider theme="light" width="350" class="sider">
      <a-tabs v-if="currentElement" type="card" v-model:activeKey="activePanel">
        <a-tab-pane key="component" tab="属性设置">
          <div v-if="!currentElement.isLock">
            <edit-group :props="currentElement?.props" @change="handleChange" />
          </div>
          <a-empty v-else>
            <template #description>
              <span> 该图层已被锁定 </span>
            </template>
          </a-empty>
        </a-tab-pane>
        <a-tab-pane key="layer" tab="图层设置" force-render>
          <layer-list
            :componentList="components"
            :selectedId="currentElement.id"
            @clickItem="setActive"
            @change="handleChange"
          ></layer-list>
        </a-tab-pane>
        <a-tab-pane key="background" tab="背景设置" force-render>
          <props-table :props="page.props" @change="onPageHandleChange" />
        </a-tab-pane>
      </a-tabs>
    </a-layout-sider>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store/index'
import { ComponentProps } from '@/store/editer'

import LText from '@/components/LText/index.vue'
import LImage from '@/components/LImage/index.vue'
import ComponentList from '@/components/componentList/index.vue'
import EditeWrapper from '@/components/editeWrapper/index.vue'
import EditGroup from '@/components/editGroup/index.vue'
import LayerList from '@/components/layerList/index.vue'
import PropsTable from '@/components/propsTable/index.vue'

export default defineComponent({
  components: {
    LText,
    LImage,
    ComponentList,
    EditeWrapper,
    EditGroup,
    LayerList,
    PropsTable,
  },
  setup() {
    const store = useStore<GlobalDataProps>()

    const components = computed(() => store.state.editer.components)

    const currentElement = computed(() => store.getters.getCurrentElement)

    const page = computed(() => store.state.editer.page)

    const deleteComponent = (component: ComponentProps) => {
      store.commit('deleteComponent', component)
    }

    const setActive = (id: string) => {
      store.commit('setActive', id)
    }

    const handleChange = (event: any) => {
      if (Array.isArray(event)) {
        store.commit('updateComponentList', event)
      } else {
        store.commit('updateComponent', event)
      }
    }

    const activePanel = ref('component')

    const onPageHandleChange = (e: any) => {
      store.commit('updatePage', e)
    }

    return {
      components,
      deleteComponent,
      setActive,
      currentElement,
      handleChange,
      activePanel,
      page,
      onPageHandleChange,
    }
  },
})
</script>

<style lang="less" scoped>
.editer {
  height: 100%;
  .content {
    height: 100%;
    padding: 10px;
    .content-inner {
      height: 100%;
      overflow-y: auto;
      background: white;
    }
  }
  .sider {
    padding: 10px;
  }
}
</style>
