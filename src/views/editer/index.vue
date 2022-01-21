<template>
  <a-layout class="editer">
    <a-layout-sider theme="light" width="350" class="sider">
      <component-list />
    </a-layout-sider>
    <a-layout-content class="content">
      <operate-list />
      <div class="content-inner" :style="page.props" id="editerContent">
        <edite-wrapper
          v-for="component of components"
          :key="component.id"
          :id="component.id"
          :hidden="component.isHide"
          :active="component.id === (currentElement && currentElement.id)"
          :props="component.props"
          @set-active="setActive"
          @update-position="updatePosition"
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

import initHotKeys from '@/plugins/hotKeys'
import initMenus from '@/plugins/menus'

import OperateList from '@/components/operateList/index.vue'

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
    OperateList,
  },
  setup() {
    initHotKeys()
    initMenus()

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

    const updatePosition = (pos: any) => {
      const key = Object.keys(pos).filter((key) => key !== 'id')
      const value = Object.values(pos).map((v) => v + 'px')
      store.commit('updateComponent', {
        key,
        id: pos.id,
        value,
      })
    }

    const menus = [
      {
        label: 'xxx',
        action() {
          console.log(123)
        },
      },
    ]

    return {
      components,
      deleteComponent,
      setActive,
      currentElement,
      handleChange,
      activePanel,
      page,
      onPageHandleChange,
      updatePosition,
      menus,
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
    position: relative;
    .content-inner {
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      background: white;
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      width: 375px;
    }
  }
  .sider {
    padding: 10px;
    overflow-y: auto;
  }
}
</style>
