<template>
  <div :style="fontstyle">
    <div class="rate" @mouseout="mouseOut">
      <span @mouseover="mouseOver(num)" v-for="num in 5" :key="num">☆</span>
      <span class="hollow" :style="fontwidth">
        <span @mouseover="mouseOver(num)" v-for="num in 5" :key="num">★</span>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed, ref } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  theme: {
    type: String,
    default: 'red',
  },
})
const rates = computed(() =>
  '★★★★★☆☆☆☆☆'.slice(5 - props.value, 10 - props.value)
)
const themeObj = {
  black: '#00',
  white: '#fff',
  red: '#f5222d',
  orange: '#fa541c',
  yellow: '#fadb14',
  green: '#73d13d',
  blue: '#40a9ff',
}
const fontstyle = computed(() => {
  // return `color:${themeObj[props.theme as string]};`
  return `color:red;`
})
let width = ref(props.value)
function mouseOver(i: any) {
  width.value = i
}
function mouseOut() {
  width.value = props.value
}
const fontwidth = computed(() => `width:${width.value}em;`)

const queryTop3Element = () => {
  Object.entries(
    [...document.querySelectorAll('*')]
      .map((el) => el.nodeName)
      .reduce((prev, next) => {
        prev[next] = (prev[next] || 0) + 1
        return prev
      }, {} as { [key: string]: any })
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
}
</script>
<style scoped>
.rate {
  position: relative;
  display: inline-block;
}
.rate > span.hollow {
  position: absolute;
  display: inline-block;
  top: 0;
  left: 0;
  width: 0;
  overflow: hidden;
}
</style>
