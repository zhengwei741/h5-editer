<template>
  <a-layout class="home">
    <a-layout-header>Header</a-layout-header>
    <a-layout-content class="content">
      <template-list />
    </a-layout-content>
    <a-layout-footer class="footer">Footer</a-layout-footer>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TemplateList from '@/components/templateList/index.vue'

export default defineComponent({
  components: {
    TemplateList,
  },
})
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  .content {
    padding: 0 100px;
    overflow: auto;
  }
  .footer {
    background: #001529;
  }
}
</style>
