import Http from '@/utils/http'

import axios from 'axios'

export const uploadFile = function (files: any) {
  return axios.post('test')
  // return new Promise((resolve, reject) => {
  //   Http.get('test')
  //   setTimeout(() => {
  //     Math.random() > 0.5 ? resolve(files) : reject()
  //   }, 1000)
  // })
}
