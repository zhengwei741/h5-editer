<template>
  <template-list :list="templateList" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import TemplateList from '@/components/templateList/index.vue'

import { GlobalDataProps } from '@/store/index'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    TemplateList,
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const templateList = computed(() => store.state.templates.data)

    return {
      templateList,
    }
  },
})
</script>
