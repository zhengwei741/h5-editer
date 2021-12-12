<template>
  <div class="component-list">
    <div
      v-for="(template, index) of templates"
      class="component-item"
      :key="index"
      @click="onItemClick(template)"
    >
      <l-tetx v-bind="template"></l-tetx>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

import LTetx from '../LText/index.vue'
import { defaultTextTemplates } from '@/shared/defaultTemplates'
import { CommonDefaultProps } from '../../shared/defaultProps'

import { v4 as uuidv4 } from 'uuid'

export default defineComponent({
  components: {
    LTetx,
  },
  setup() {
    const templates = computed(() => defaultTextTemplates)
    const store = useStore()

    const onItemClick = (template: Partial<CommonDefaultProps>) => {
      store.commit('addComponent', {
        props: template,
        name: 'l-text',
        id: uuidv4(),
      })
    }

    return {
      templates,
      onItemClick,
    }
  },
})
</script>
<style lang="less" scoped>
.component-list {
  .component-item {
    text-align: center;
    display: flex;
    justify-content: center;
    cursor: pointer;
    padding: 5px;
  }
}
</style>
