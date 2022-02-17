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
  totalTemplates: number
  works: TemplateProps[]
  totalWorks: number
}

const templates: Module<TemplatesProps, GlobalDataProps> = {
  state: {
    // 模板数据
    data: [],
    totalTemplates: 0,
    works: [],
    totalWorks: 0,
  },
  mutations: {},
  actions: {},
  getters: {},
}

export default templates
