import { PageData, PageProps, ComponentData } from '@/store/editer'

// eslint-disable-next-line @typescript-eslint/ban-types
export interface RespData<T = {}> {
  errno: number
  data: T
  message?: string
}

interface ListType<T> {
  list: T[]
  pageNum: number
  pageSize: number
  pages: number
  total: number
}

export interface WorkData extends Omit<PageData, 'props'> {
  content: {
    components: ComponentData[]
    props?: PageProps
  }
}

export type RespWorkData = RespData<WorkData>
export type ResponseListData<T> = RespData<ListType<T>>
