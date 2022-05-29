import { Module, Mutation } from 'vuex'
import { GlobalDataProps } from './index'
import { AllComponentProps } from '@/shared/defaultProps'
import store from '@/store'
import { cloneDeep, debounce } from 'lodash-es'
import { v4 as uuidv4 } from 'uuid'
import { message } from 'ant-design-vue'
import { RespWorkData } from '@/shared/responseType'

export interface PageProps {
  'background-color': string
  'background-image': string
  'background-repeat': string
  'background-size': string
  height: string
}

export interface PageData {
  id?: number
  props?: PageProps
  title?: string
  desc?: string
  coverImg?: string
  uuid?: string
  setting?: { [key: string]: any }
  isTemplate?: boolean
  isHot?: boolean
  isNew?: boolean
  author?: string
  copiedCount?: number
  status?: number
  user?: {
    gender: string
    nickName: string
    picture: string
    userName: string
  }
}

const pageDefaultProps = {
  'background-color': '#ffffff',
  'background-image': '',
  'background-repeat': 'no-repeat',
  'background-size': 'cover',
  height: '530px',
}

const pageData: PageData = {
  props: pageDefaultProps,
}

export type AllFormProps = PageProps & Partial<AllComponentProps>

export type historyType = 'add' | 'delete' | 'modify'

export type HistoryData = {
  type: historyType
  id?: string
  data?: any
}

export interface history {
  data: HistoryData[]
  historyIndex: number
  cacheOldValue: Array<string>
}

export interface EditerProps {
  components: ComponentData[]
  currentElement: string
  page: PageData
  copyElement?: ComponentData | null
  history: history
  isDirty: boolean
}

export interface ComponentData {
  // 这个元素的 属性，属性请详见下面
  props: Partial<AllComponentProps>
  // id，uuid v4 生成
  id: string
  // 业务组件库名称 l-text，l-image 等等
  name: 'l-text' | 'l-image' | 'l-shape'
  // 图层是否隐藏
  isHidden?: boolean
  // 图层是否锁定
  isLocked?: boolean
  // 图层名称
  layerName?: string
}

export interface updateComponentData {
  key: Array<keyof AllComponentProps> | keyof AllComponentProps
  value: string[] | string
  isRoot: boolean
  id: string
}

type DirectionType = 'up' | 'down' | 'left' | 'right'

const componentsData: ComponentData[] = []

const pushHistory = (state: EditerProps, historyData: HistoryData) => {
  // 如果进行撤销
  const { history } = state
  if (history.historyIndex !== -1) {
    // 清空之后所有的历史记录
    history.data.splice(history.historyIndex)
    // 重置historyIndex
    // -1 撤销 执行最后一个历史记录 不能重做
    history.historyIndex = -1
  }
  history.data.push(historyData)
  history.cacheOldValue = []
}

const pushHistoryDebounce = debounce(pushHistory, 300)

const modifyHistory = (
  historyData: HistoryData,
  state: EditerProps,
  type: string
) => {
  const { key, oldValue, newValue } = historyData.data
  const find = state.components.find(
    (component) => component.id === historyData.id
  )
  if (find) {
    const newKey = key as Array<keyof AllComponentProps>
    newKey.forEach((k, index) => {
      find.props[k] = type === 'undo' ? oldValue[index] : newValue[index]
    })
  }
}

const setDirty = (callBack: Mutation<EditerProps>) => {
  return (state: EditerProps, option: any) => {
    state.isDirty = true
    callBack(state, option)
  }
}

const editer: Module<EditerProps, GlobalDataProps> = {
  state: {
    components: componentsData,
    // 选中组件
    currentElement: '',
    page: pageData,
    // 快捷键拷贝副本
    copyElement: null,
    // 历史记录
    history: {
      data: [],
      historyIndex: -1,
      cacheOldValue: [],
    },
    isDirty: false,
  },
  mutations: {
    addComponent: setDirty((state, component) => {
      component.layerName = '图层' + (state.components.length + 1)
      state.components.push(component)
      pushHistory(state, {
        type: 'add',
        id: component.id,
        data: component,
      })
    }),
    deleteComponent: setDirty((state, component) => {
      state.components = state.components.filter(
        (cmp) => cmp.id !== component.id
      )
      pushHistory(state, {
        type: 'delete',
        data: component,
        id: component.id,
      })
    }),
    updateComponentList(state, list) {
      state.components = list
    },
    updateComponent: setDirty(
      (state, { key, value, isRoot, id }: updateComponentData) => {
        if (!key) {
          return
        }
        const updateComponent = state.components.find(
          (component) => component.id === (id || state.currentElement)
        )
        if (isRoot) {
          ;(updateComponent as any)[key as string] = value
        } else {
          if (updateComponent) {
            const oldValue = Array.isArray(key)
              ? key.map((item) => updateComponent.props[item] as string)
              : [updateComponent.props[key] as string]

            if (!state.history.cacheOldValue.length) {
              state.history.cacheOldValue = oldValue
            }
            pushHistoryDebounce(state, {
              type: 'modify',
              data: {
                key: Array.isArray(key) ? key : [key],
                oldValue: state.history.cacheOldValue,
                newValue: Array.isArray(value) ? value : [value],
              },
              id: updateComponent.id,
            })

            if (typeof key === 'string' && typeof value === 'string') {
              updateComponent.props[key] = value
            } else if (Array.isArray(key) && Array.isArray(value)) {
              key.forEach((item, index) => {
                updateComponent.props[item] = value[index]
              })
            }
          }
        }
      }
    ),
    setActive(state, currentId: string) {
      state.currentElement = currentId
    },
    updatePage: setDirty((state, { key, value, isRoot }) => {
      const newKey = key as keyof PageProps
      if (isRoot) {
        console.log(1)
      } else {
        if (state.page.props) {
          state.page.props[newKey] = value
        }
      }
    }),
    fetchWork(state, { data }: RespWorkData) {
      const { content, ...rest } = data
      state.page = { ...state.page, ...rest }
      if (content.props) {
        state.page.props = content.props
      }
      state.components = content.components
    },
    saveWork(state) {
      state.isDirty = false
    },
    // 快捷键
    copy(state, cid) {
      let currentElement
      if (cid) {
        currentElement = state.components.find(
          (component) => component.id === cid
        )
      }
      if (!currentElement) {
        currentElement = store.getters.getCurrentElement
      }
      if (currentElement) {
        const copyElement = cloneDeep(currentElement)
        copyElement.id = uuidv4()
        state.copyElement = copyElement
        message.info('已拷贝当前图层')
      }
    },
    // 粘贴
    paste(state) {
      const copyElement = cloneDeep(state.copyElement)
      if (copyElement) {
        copyElement.id = uuidv4()
        copyElement.layerName = `${copyElement.layerName}副本`
        store.commit('addComponent', copyElement)
        message.info('已粘贴拷贝图层')
      }
    },
    delete(state, cid) {
      let currentElement
      if (cid) {
        currentElement = state.components.find(
          (component) => component.id === cid
        )
      }
      if (!currentElement) {
        currentElement = store.getters.getCurrentElement
      }
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
    // 重做
    redo(state) {
      if (store.getters.redoDisabled) {
        return
      }
      // eslint-disable-next-line prefer-const
      let { data, historyIndex } = state.history
      const historyData = data[historyIndex]
      switch (historyData.type) {
        // 删除添加的组件
        case 'add':
          state.components.push(cloneDeep(historyData.data))
          break
        // 恢复删除的组件
        case 'delete':
          state.components = state.components.filter(
            (comp) => comp.id !== historyData.id
          )
          break
        // 恢复修改的属性
        case 'modify':
          modifyHistory(historyData, state, 'redo')
          break
      }
      state.history.historyIndex++
    },
    // 撤销
    undo(state) {
      if (store.getters.undoDisabled) {
        return
      }
      // eslint-disable-next-line prefer-const
      let { data, historyIndex } = state.history
      if (historyIndex === -1) {
        historyIndex = data.length - 1
      } else {
        historyIndex--
      }
      // 取出最后的动作
      const historyData = data[historyIndex]
      state.history.historyIndex = historyIndex
      switch (historyData.type) {
        // 删除添加的组件
        case 'add':
          state.components = state.components.filter(
            (comp) => comp.id !== historyData.id
          )
          break
        // 恢复删除的组件
        case 'delete':
          state.components.push(cloneDeep(historyData.data))
          break
        // 恢复修改的属性
        case 'modify':
          modifyHistory(historyData, state, 'undo')
          break
      }
    },
    escape(state) {
      state.currentElement = ''
    },
  },
  actions: {},
  getters: {
    getCurrentElement(state) {
      return state.components.find((comp) => comp.id === state.currentElement)
    },
    redoDisabled(state) {
      return (
        state.history.historyIndex === state.history.data.length ||
        state.history.historyIndex === -1
      )
    },
    undoDisabled(state) {
      return state.history.data.length === 0 || state.history.historyIndex === 0
    },
  },
}

export default editer
