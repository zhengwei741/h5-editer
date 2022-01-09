import Http from '@/utils/http'

export const uploadFile = function (data: any) {
  console.log(data)
  // return Http.post('/uploadFile', data)
  return Promise.resolve()
}
