import { Module } from 'vuex'
import { GlobalDataProps } from './index'
import { AllComponentProps } from '@/shared/defaultProps'

export interface ComponentProps {
  id: string
  props: AllFormProps
  name: string
  isLock?: boolean
  isHide?: boolean
  layerName: string
}

export interface PageProps {
  'background-color': string
  'background-image': string
  'background-repeat': string
  'background-size': string
  height: string
}

export interface PageData {
  props?: PageProps
}

const pageDefaultProps = {
  'background-color': '#ffffff',
  'background-image': '',
  'background-repeat': 'no-repeat',
  'background-size': 'cover',
  height: '560px',
}

const pageData: PageData = {
  props: pageDefaultProps,
}

export type AllFormProps = PageProps & Partial<AllComponentProps>

export interface EditerProps {
  components: ComponentProps[]
  currentElement: string
  page: PageData
}
const componentsData: ComponentProps[] = []

const editer: Module<EditerProps, GlobalDataProps> = {
  state: {
    components: componentsData,
    currentElement: '',
    page: pageData,
  },
  mutations: {
    addComponent(state, component) {
      component.layerName = '图层' + (state.components.length + 1)
      state.components.push(component)
    },
    deleteComponent(state, component) {
      state.components = state.components.filter(
        (cmp) => cmp.id !== component.id
      )
    },
    updateComponentList(state, list) {
      state.components = list
    },
    updateComponent(state, { key, value, isRoot, id }) {
      if (!key) {
        return
      }
      const updateComponent = state.components.find(
        (component) => component.id === (id || state.currentElement)
      )
      if (isRoot) {
        ;(updateComponent as any)[key as string] = value
        // updateComponent[key as keyof ComponentProps] = value
      } else {
        if (updateComponent) {
          const newKey = key as keyof AllFormProps
          updateComponent.props[newKey] = value
        }
      }
    },
    setActive(state, currentId: string) {
      state.currentElement = currentId
    },
    updatePage(state, { key, value, isRoot }) {
      const newKey = key as keyof PageProps
      if (isRoot) {
        console.log(1)
      } else {
        if (state.page.props) {
          state.page.props[newKey] = value
        }
      }
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
