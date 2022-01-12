<template>
  <div>
    <a-row>
      <a-col :span="8"> 阴影颜色 </a-col>
      <a-col :span="16">
        <color-picker :value="shadowColor" @change="onColorChangeHandle" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8"> 阴影X轴 </a-col>
      <a-col :span="16">
        <a-slider
          :min="-30"
          :max="30"
          v-model:value="shadowX"
          @change="onChangeHandle"
        />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8"> 阴影Y轴 </a-col>
      <a-col :span="16">
        <a-slider
          :min="-30"
          :max="30"
          v-model:value="shadowY"
          @change="onChangeHandle"
        />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8"> 阴影模糊 </a-col>
      <a-col :span="16">
        <a-slider v-model:value="shadowVague" @change="onChangeHandle" />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import ColorPicker from '@/components/colorPicker/index.vue'

export default defineComponent({
  components: {
    ColorPicker,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const org = ref(props.value)
    const shadowList = computed(() => org.value.split(' '))
    const shadowX = ref(Number(shadowList.value[0] || 0))
    const shadowY = ref(Number(shadowList.value[1] || 0))
    const shadowVague = ref(Number(shadowList.value[2] || 0))
    const shadowColor = ref(shadowList.value[3] || 'black')

    const onColorChangeHandle = (e: string) => {
      shadowColor.value = e
      emit(
        'change',
        `${shadowX.value}px ${shadowY.value}px ${shadowVague.value}px ${shadowColor.value}`
      )
    }

    const onChangeHandle = () => {
      // box-shadow: 10px 10px 5px #888888;
      emit(
        'change',
        `${shadowX.value}px ${shadowY.value}px ${shadowVague.value}px ${shadowColor.value}`
      )
    }

    return {
      shadowColor,
      shadowX,
      shadowY,
      shadowVague,
      onChangeHandle,
      onColorChangeHandle,
    }
  },
})
</script>
