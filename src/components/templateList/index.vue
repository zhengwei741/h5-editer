<template>
  <a-row :gutter="16" class="templateList">
    <a-col :span="6" v-for="(item, index) of list" :key="index">
      <a-card hoverable>
        <template #cover>
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        </template>
        <template #actions>
          <setting-outlined key="setting" />
          <edit-outlined key="edit" />
          <ellipsis-outlined key="ellipsis" />
        </template>
        <a-card-meta title="Card title" description="This is the description">
          <template #avatar>
            <a-avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </template>
        </a-card-meta>
      </a-card>
    </a-col>
  </a-row>
</template>
<script>
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
} from '@ant-design/icons-vue'
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    list: {
      type: Array,
      default() {
        return [
          1, 2, 3, 43, 45, 56, 6, 6, 7, 7, 2, 8, 2, 2, 3, 3, 34, 4, 4, 4, 1, 41,
          4, 1, 4, 124,
        ]
      },
    },
  },
  components: {
    SettingOutlined,
    EditOutlined,
    EllipsisOutlined,
  },
})
</script>
<style lang="less" scoped>
.templateList {
  text-align: center;
}
</style>
