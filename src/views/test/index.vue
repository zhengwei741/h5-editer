<template>
  总数{{ total }}

  总页数 {{ totalPage }}

  当前页数 {{ currentPage }}

  <a-button :disabled="isFirstPage" :loading="isLoading" @click="prevPage"
    >上一页</a-button
  >

  <ul>
    <li @click="goto(item)" v-for="item of totalPage" :key="item">
      {{ item }}
    </li>
  </ul>

  <a-button>加载更多</a-button>

  <a-button :disabled="isLastPage" :loading="isLoading" @click="nextPage"
    >下一页</a-button
  >
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import usePagination from '@/hooks/usePagination'
import axios from 'axios'

export default defineComponent({
  components: {},
  setup() {
    const action = (params = { pageNum: 0, pageSize: 10 }) => {
      console.log(params)
      return axios.get('/api/test', {
        params,
      })
    }
    const total = ref(50)
    const {
      currentPage,
      totalPage,
      isLoading,
      isLastPage,
      isFirstPage,
      nextPage,
      prevPage,
      goToPage,
    } = usePagination(action, total, { pageNum: 0, pageSize: 20 })

    const goto = (page: number) => {
      goToPage(--page)
    }

    return {
      currentPage,
      totalPage,
      isLoading,
      isLastPage,
      isFirstPage,
      nextPage,
      prevPage,
      total,
      goto,
    }
  },
})
</script>
<style lang="less" scoped>
.image-wapper {
  /* Ensure the size of the image fit the container perfectly */
  img {
    display: block;

    /* This rule is very important, please don't ignore this */
    max-width: 100%;
  }
}
</style>
