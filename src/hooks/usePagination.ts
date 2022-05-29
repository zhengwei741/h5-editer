import { ref, Ref, reactive, ComputedRef, computed } from 'vue'

export type paginationAction = (param: queryParam) => Promise<any>

export interface queryParam {
  pageSize: number
  pageNum: number
  [key: string]: any
}

const usePagination = (
  action: paginationAction,
  total: ComputedRef<number> | Ref<number>,
  queryParam: queryParam = { pageNum: 0, pageSize: 10 }
) => {
  const isLoading = ref(false)

  const isLastPage = computed(() => param.pageNum + 1 === totalPage.value)

  const isFirstPage = computed(() => param.pageNum === 0)

  const nextPage = () => {
    param.pageNum++
    return queryData()
  }

  const prevPage = () => {
    param.pageNum--
    return queryData()
  }

  const goToPage = (pageNum: number) => {
    param.pageNum = pageNum
    return queryData()
  }

  const param = reactive<queryParam>(queryParam)

  const queryData = async () => {
    try {
      isLoading.value = true
      return await action(param)
    } finally {
      isLoading.value = false
    }
  }

  const totalPage = computed(() => Math.ceil(total.value / param.pageSize))

  const currentPage = computed(() => param.pageNum + 1)

  return {
    currentPage,
    totalPage,
    isLoading,
    isLastPage,
    isFirstPage,
    nextPage,
    prevPage,
    goToPage,
  }
}

export default usePagination
