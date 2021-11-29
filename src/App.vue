<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    console.log(123)
  },
})
</script>
<style>
#app {
  height: 100%;
  width: 100%;
}
</style>
