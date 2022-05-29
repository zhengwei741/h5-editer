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

  <a-button @click="save">加载更多</a-button>

  <a-button :disabled="isLastPage" :loading="isLoading" @click="nextPage"
    >下一页</a-button
  >

  <!-- a标签下载 http请求会获取文件数据 -->
  <!-- ajax 只能以字符型读取 res -->
  <a href="/api/download">下载</a>
  <Rate :value="3"></Rate>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import usePagination from '@/hooks/usePagination'
import axios from 'axios'
import { saveAs } from '@/shared/download'
import Rate from './rate.vue'

export default defineComponent({
  components: {
    Rate,
  },
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

    const save = () => {
      // saveAs('/api/download', 'default.png')
      axios.get('/api/download').then((res: any) => {
        console.log(res)
      })
    }

    const color = ref('red')

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
      save,
      color,
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
.image-wapper {
  color: v-bind(color);
}
</style>
