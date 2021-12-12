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
  currentElement: string
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
    currentElement: '',
  },
  mutations: {
    addComponent(state, component) {
      state.components.push(component)
    },
    deleteComponent(state, component) {
      state.components = state.components.filter(
        (cmp) => cmp.id === component.id
      )
    },
    updateComponent(state, { key, value }) {
      const updateComponent = state.components.find(
        (component) => component.id === state.currentElement
      )
      if (updateComponent) {
        updateComponent.props[key] = value
      }
    },
    setActive(state, currentId: string) {
      state.currentElement = currentId
    },
  },
  actions: {},
  getters: {
    getEditer(state) {
      return state
    },
    getCurrentElement(state) {
      return state.components.find((comp) => comp.id === state.currentElement)
    },
  },
}

export default editer
