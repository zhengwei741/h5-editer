<template>
  <template-list :list="templateList" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import TemplateList from '@/components/templateList/index.vue'

import { fetchTemplates } from '@/api/templates'

import { TemplateProps } from '@/store/templates'

export default defineComponent({
  components: {
    TemplateList,
  },
  setup() {
    const templateList = ref<TemplateProps[]>([])

    const getTemplates = () => {
      fetchTemplates().then((res: any) => {
        const { data } = res
        templateList.value = data.list
      })
    }

    onMounted(() => {
      getTemplates()
    })

    return {
      templateList,
    }
  },
})
</script>
