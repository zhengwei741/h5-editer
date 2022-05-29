import Http from '@/utils/http'

interface fileType {
  fileName: string
}

export const uploadFile = function (data: any) {
  return Http.post('test', {
    data,
  })
}

// uploadFile(123).then((res: AxiosResponse<fileType>) => {
// })

// const wapperFn = (url: string) => {
//   return (data: any): Promise<fileType> => {
//     return Http.post(url, data).then((res) => {
//       return res
//     })
//   }
// }
