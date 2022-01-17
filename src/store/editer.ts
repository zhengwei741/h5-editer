import { Module } from 'vuex'
import { GlobalDataProps } from './index'
import { AllComponentProps } from '@/shared/defaultProps'
import store from '@/store'
import { cloneDeep } from 'lodash-es'
import { v4 as uuidv4 } from 'uuid'
import { message } from 'ant-design-vue'

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
  copyElement?: ComponentProps | null
}

type DirectionType = 'up' | 'down' | 'left' | 'right'

const componentsData: ComponentProps[] = []

const editer: Module<EditerProps, GlobalDataProps> = {
  state: {
    components: componentsData,
    currentElement: '',
    page: pageData,
    copyElement: null,
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
    // 快捷键
    copy(state) {
      const currentElement = store.getters.getCurrentElement
      if (currentElement) {
        const copyElement = cloneDeep(currentElement)
        copyElement.id = uuidv4()
        state.copyElement = copyElement
        message.info('已拷贝当前图层')
      }
    },
    paste(state) {
      const copyElement = cloneDeep(state.copyElement)
      if (copyElement) {
        copyElement.id = uuidv4()
        copyElement.layerName = `${copyElement.layerName}副本`
        store.commit('addComponent', copyElement)
        message.info('已粘贴拷贝图层')
      }
    },
    delete() {
      const currentElement = store.getters.getCurrentElement
      if (currentElement) {
        store.commit('deleteComponent', currentElement)
        message.success('删除当前图层成功')
      }
    },
    move(state, data: { direction: DirectionType; value: number }) {
      const currentElement = store.getters.getCurrentElement
      const { direction, value } = data
      if (currentElement) {
        const oldTop = parseInt(currentElement.props.top || '0')
        const oldLeft = parseInt(currentElement.props.left || '0')
        const { id } = currentElement
        switch (direction) {
          case 'up':
            store.commit('updateComponent', {
              key: 'top',
              value: `${oldTop - value}px`,
              id,
            })
            break
          case 'down':
            store.commit('updateComponent', {
              key: 'top',
              value: `${oldTop + value}px`,
              id,
            })
            break
          case 'left':
            store.commit('updateComponent', {
              key: 'left',
              value: `${oldLeft - value}px`,
              id,
            })
            break
          case 'right':
            store.commit('updateComponent', {
              key: 'left',
              value: `${oldLeft + value}px`,
              id,
            })
            break
          default:
            break
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
