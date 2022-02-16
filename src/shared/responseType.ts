// export interface responseType<T> {
//   erroron: number
//   data: T
//   message?: string
// }

// interface ListData<T> {
//   list: T[]
//   count: number
// }

// export type ResponseListData<T> = responseType<ListData<T>>

// {
//   result: [],
//   rspCode: 200,
//   rspMsg: 'Success'
// }

export interface responseType<T> {
  result?: T | T[]
  errorno: number
  rspMsg: string
}

interface listType<T> {
  list: T[]
  pageNum: number
  pageSize: number
  pages: number
  total: number
}

export type ResponseListData<T> = responseType<listType<T>>
