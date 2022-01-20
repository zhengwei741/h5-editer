<template>
  <a-tooltip>
    <template #title> 撤销 </template>
    <a-button shape="circle" @click="undoHistory" :disabled="undoDisabled">
      <template #icon><UndoOutlined /> </template>
    </a-button>
  </a-tooltip>
  <a-tooltip>
    <template #title> 重做 </template>
    <a-button shape="circle" @click="redoHistory" :disabled="redoDisabled">
      <template #icon><RedoOutlined /> </template>
    </a-button>
  </a-tooltip>
  <!-- <ul class="operateList">
    <li
      v-for="(item, index) in history"
      :class="{ active: index === historyIndex }"
      :key="index"
    >
      {{ item.type }} - {{ item.data && item.data.key }}
    </li>
  </ul> -->
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

import { RedoOutlined, UndoOutlined } from '@ant-design/icons-vue'
import { GlobalDataProps } from '@/store/index'

export default defineComponent({
  components: {
    RedoOutlined,
    UndoOutlined,
  },
  setup() {
    const store = useStore<GlobalDataProps>()

    const history = computed(() => store.state.editer.history.data)

    const historyIndex = computed(() => store.state.editer.history.historyIndex)

    const undoHistory = () => {
      store.commit('undo')
    }

    const redoHistory = () => {
      store.commit('redo')
    }

    const undoDisabled = computed(() => store.getters.undoDisabled)

    const redoDisabled = computed(() => store.getters.redoDisabled)

    return {
      history,
      historyIndex,
      undoHistory,
      redoHistory,
      undoDisabled,
      redoDisabled,
    }
  },
})
</script>
<style lang="less">
// .operateList {
//   position: fixed;
//   z-index: 999;
//   right: 0;
//   background-color: white;
//   .active {
//     color: red;
//   }
// }
</style>
