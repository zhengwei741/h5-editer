<template>
  <a-row
    v-for="component in componentList"
    :key="component.id"
    class="layer-item"
    @click="onClickHandle(component)"
    :class="selectedId === component.id ? 'active' : ''"
  >
    <a-col :span="8" class="layer-operate">
      <a-tooltip title="拖动排序">
        <a-button shape="circle" class="handle">
          <template v-slot:icon><DragOutlined /> </template
        ></a-button>
      </a-tooltip>
      <a-tooltip :title="component.isHide ? '显示' : '隐藏'">
        <a-button
          shape="circle"
          @click.stop="handleChange(component.id, 'isHide', !component.isHide)"
        >
          <template v-slot:icon v-if="component.isHide"
            ><EyeOutlined />
          </template>
          <template v-slot:icon v-else><EyeInvisibleOutlined /> </template>
        </a-button>
      </a-tooltip>
      <a-tooltip :title="component.isLock ? '解锁' : '锁定'">
        <a-button
          shape="circle"
          @click.stop="handleChange(component.id, 'isLock', !component.isLock)"
        >
          <template v-slot:icon v-if="component.isLock"
            ><UnlockOutlined />
          </template>
          <template v-slot:icon v-else><LockOutlined /> </template>
        </a-button>
      </a-tooltip>
    </a-col>
    <a-col :span="16">
      <a-input v-model:value="component.layerName" placeholder="图层名" />
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  DragOutlined,
  LockOutlined,
  UnlockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from '@ant-design/icons-vue'
import { ComponentProps } from '@/store/editer'

export default defineComponent({
  components: {
    DragOutlined,
    LockOutlined,
    UnlockOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
  },
  props: {
    componentList: {
      type: Array,
      required: true,
    },
    selectedId: {
      type: String,
    },
  },
  emits: ['change', 'clickItem'],
  setup(props, { emit }) {
    const onClickHandle = (component: ComponentProps) => {
      emit('clickItem', component.id)
    }

    const handleChange = (id: string, key: string, value: boolean) => {
      const data = {
        id,
        key,
        value,
        isRoot: true,
      }
      emit('change', data)
    }

    return {
      onClickHandle,
      handleChange,
    }
  },
})
</script>
<style lang="less" scoped>
.layer-item {
  border: 1px solid #ddd;
  padding: 5px 0;
  margin-bottom: 5px;
}
.layer-item:hover {
  border: 1px solid #1890ff;
}
.active {
  border: 1px solid #1890ff;
}
.layer-operate {
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  > span {
    cursor: pointer;
    flex: 1;
  }
}
</style>
