import { Module } from 'vuex'
import { GlobalDataProps } from './index'

export interface TemplateProps {
  id: number
  title: string
  coverImg: string
  author: string
  copiedCount: number
  description: string
  authorImg: string
}

export interface TemplatesProps {
  data: TemplateProps[]
}

const testData: TemplateProps = {
  id: 1,
  title: 'title',
  coverImg: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  author: '张三',
  copiedCount: 10,
  description: 'description',
  authorImg: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
}

const templates: Module<TemplatesProps, GlobalDataProps> = {
  state: {
    // 模板数据
    data: [testData],
  },
  mutations: {},
  actions: {},
  getters: {},
}

export default templates
