import { Module } from 'vuex'
import { GlobalDataProps } from './index'
import { v4 as uuidv4 } from 'uuid'

export interface ComponentProps {
  id: string
  props: { [key: string]: string }
  name: string
}

export interface EditerProps {
  components: ComponentProps[]
}

const componentsData: ComponentProps[] = [
  {
    id: uuidv4(),
    props: {
      text: '123',
      color: 'red',
    },
    name: 'l-text',
  },
]

const editer: Module<EditerProps, GlobalDataProps> = {
  state: {
    components: componentsData,
  },
  mutations: {},
  actions: {},
  getters: {
    getEditer(state) {
      return state
    },
  },
}

export default editer
