<template>
  <a-layout class="editer">
    <a-layout-header>Header</a-layout-header>
    <a-layout>
      <a-layout-sider theme="light" width="350">Sider</a-layout-sider>
      <a-layout-content class="content">Content</a-layout-content>
      <a-layout-sider theme="light" width="350">Sider</a-layout-sider>
    </a-layout>
  </a-layout>
</template>
<style lang="less" scoped>
.editer {
  height: 100%;
  .content {
    padding: 0 100px;
    overflow: auto;
  }
}
</style>
