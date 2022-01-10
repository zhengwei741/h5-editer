import { Module } from 'vuex'
import { GlobalDataProps } from './index'

export interface ComponentProps {
  id: string
  props: { [key: string]: string }
  name: string
  isLock: boolean
  isHide: boolean
}

export interface UpdateComponentData {
  key: string
  value: string | string[]
  id: string
  isRoot?: boolean
}

export interface EditerProps {
  components: ComponentProps[]
  currentElement: string
}
const componentsData: ComponentProps[] = []

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
        (cmp) => cmp.id !== component.id
      )
    },
    updateComponent(state, { key, value, isRoot, id }) {
      const updateComponent = state.components.find(
        (component) => component.id === (id || state.currentElement)
      )
      if (isRoot) {
        ;(updateComponent as any)[key as string] = value
      } else {
        if (updateComponent) {
          updateComponent.props[key] = value
        }
      }
    },
    setActive(state, currentId: string) {
      state.currentElement = currentId
    },
  },
  actions: {},
  getters: {
    getCurrentElement(state) {
      return state.components.find((comp) => comp.id === state.currentElement)
    },
  },
}

export default editer
