<template>
  <a-layout class="app">
    <a-layout-header>Header</a-layout-header>
    <a-layout-content class="content">
      <router-view />
    </a-layout-content>
    <a-layout-footer class="footer">Footer</a-layout-footer>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    console.log(123)
  },
})
</script>
<style lang="less" scoped>
.app {
  height: 100%;
  .content {
    overflow: auto;
  }
  .footer {
    background: #001529;
  }
}
</style>
<style>
#app {
  height: 100%;
  width: 100%;
}
</style>
