<template>
  <draggable v-model="list" handle=".handle" animation="300" @end="onEnd">
    <a-row
      v-for="component in list"
      :key="component.id"
      class="layer-item"
      @click="onClickHandle(component)"
      :class="selectedId === component.id ? 'active' : ''"
    >
      <a-col :span="6" class="layer-operate">
        <a-tooltip :title="component.isHide ? '显示' : '隐藏'">
          <a-button
            shape="circle"
            @click.stop="
              handleChange(component.id, 'isHide', !component.isHide)
            "
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
            @click.stop="
              handleChange(component.id, 'isLock', !component.isLock)
            "
          >
            <template v-slot:icon v-if="component.isLock"
              ><UnlockOutlined />
            </template>
            <template v-slot:icon v-else><LockOutlined /> </template>
          </a-button>
        </a-tooltip>
      </a-col>
      <a-col :span="14" class="edit-warpper">
        <inline-edit
          :value="component.layerName"
          @change="(val) => handleChange(selectedId, 'layerName', val)"
        ></inline-edit>
      </a-col>
      <a-col :span="4">
        <a-tooltip title="拖动排序">
          <a-button shape="circle" class="handle">
            <template v-slot:icon><DragOutlined /> </template
          ></a-button>
        </a-tooltip>
      </a-col>
    </a-row>
  </draggable>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import {
  DragOutlined,
  LockOutlined,
  UnlockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from '@ant-design/icons-vue'
import { ComponentData } from '@/store/editer'
import InlineEdit from '@/components/inlineEdit/index.vue'

export default defineComponent({
  components: {
    DragOutlined,
    LockOutlined,
    UnlockOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
    InlineEdit,
    Draggable: VueDraggableNext,
  },
  props: {
    componentList: {
      type: Array as PropType<ComponentData[]>,
      required: true,
    },
    selectedId: {
      type: String,
      required: true,
    },
  },
  emits: ['change', 'clickItem'],
  setup(props, { emit }) {
    const onClickHandle = (component: ComponentData) => {
      emit('clickItem', component.id)
    }

    const list = ref(props.componentList)

    const handleChange = (id: string, key: string, value: boolean | string) => {
      const data = {
        id,
        key,
        value,
        isRoot: true,
      }
      emit('change', data)
    }

    const onEnd = () => {
      emit('change', list.value)
    }

    return {
      list,
      onClickHandle,
      handleChange,
      onEnd,
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
  background-color: #f0f5fa;
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
.edit-warpper {
  padding: 0 5px;
  display: flex;
  align-items: center;
}
</style>
