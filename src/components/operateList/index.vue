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
  <a-tooltip>
    <template #title> 保存 </template>
    <a-button shape="circle" @click="save" :loading="saveLoading">
      <template #icon><SaveOutlined /> </template>
    </a-button>
  </a-tooltip>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { RedoOutlined, UndoOutlined, SaveOutlined } from '@ant-design/icons-vue'
import { GlobalDataProps } from '@/store/index'
import useSaveWork from '@/hooks/useSaveWork'

export default defineComponent({
  components: {
    RedoOutlined,
    UndoOutlined,
    SaveOutlined,
  },
  setup() {
    const store = useStore<GlobalDataProps>()

    const history = computed(() => store.state.editer.history.data)

    const historyIndex = computed(() => store.state.editer.history.historyIndex)

    const undoHistory = () => store.commit('undo')

    const redoHistory = () => store.commit('redo')

    const { save, saveLoading } = useSaveWork()

    const undoDisabled = computed(() => store.getters.undoDisabled)

    const redoDisabled = computed(() => store.getters.redoDisabled)

    const publishLoading = computed(() => store.getters.isOpLoading('/publish'))

    return {
      history,
      historyIndex,
      undoHistory,
      redoHistory,
      save,
      undoDisabled,
      redoDisabled,
      saveLoading,
      publishLoading,
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
