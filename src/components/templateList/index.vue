<template>
  <a-row :gutter="[32, 16]" class="templateList">
    <a-col :span="6" v-for="template of list" :key="template.id">
      <a-card hoverable>
        <template #cover>
          <img alt="example" :src="template.coverImg" />
        </template>
        <template #actions>
          <setting-outlined key="setting" />
          <edit-outlined key="edit" />
          <ellipsis-outlined key="ellipsis" />
        </template>
        <a-card-meta
          :title="template.author"
          :description="template.description"
        >
          <template #avatar>
            <a-avatar :src="template.authorImg" />
          </template>
        </a-card-meta>
      </a-card>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
} from '@ant-design/icons-vue'

import { defineComponent, PropType } from 'vue'
import { TemplateProps } from '@/store/index'

export default defineComponent({
  props: {
    list: {
      type: Array as PropType<TemplateProps[]>,
    },
  },
  components: {
    SettingOutlined,
    EditOutlined,
    EllipsisOutlined,
  },
})
</script>
<style lang="less" scoped></style>
