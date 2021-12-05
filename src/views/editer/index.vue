<template>
  <a-layout class="editer">
    <a-layout-sider theme="light" width="350">Sider</a-layout-sider>
    <a-layout-content>
      <!-- <div v-for="component of components" :key="component.id">
        {{ component }}
      </div>
      <l-text tag="span" text="123"></l-text> -->
      <component
        v-for="component of components"
        :key="component.id"
        :is="component.name"
        v-bind="component.props"
      ></component>
    </a-layout-content>
    <a-layout-sider theme="light" width="350">Sider</a-layout-sider>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store/index'

import LText from '@/components/LText/index.vue'

export default defineComponent({
  components: {
    LText,
  },
  setup() {
    const store = useStore<GlobalDataProps>()

    const components = computed(() => store.state.editer.components)

    return {
      components,
    }
  },
})
</script>

<style lang="less" scoped>
.editer {
  height: 100%;
}
</style>
