import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'
import useHotKeys from '@/hooks/useHotKeys'
import { HotkeysEvent, KeyHandler } from 'hotkeys-js'

const wrap = function (callback: KeyHandler) {
  return function (keyboardEvent: KeyboardEvent, hotkeysEvent: HotkeysEvent) {
    keyboardEvent.preventDefault()
    callback(keyboardEvent, hotkeysEvent)
  }
}

const initHotKeys = () => {
  const store = useStore<GlobalDataProps>()

  useHotKeys('ctrl+c, command+c', () => {
    store.commit('copy')
  })
  useHotKeys('ctrl+v, command+v', () => {
    store.commit('paste')
  })
  useHotKeys('delete', () => {
    store.commit('delete')
  })
  useHotKeys(
    'up',
    wrap(() => {
      store.commit('move', { direction: 'up', value: 1 })
    })
  )
  useHotKeys(
    'down',
    wrap(() => {
      store.commit('move', { direction: 'down', value: 1 })
    })
  )
  useHotKeys(
    'left',
    wrap(() => {
      store.commit('move', { direction: 'left', value: 1 })
    })
  )
  useHotKeys(
    'right',
    wrap(() => {
      store.commit('move', { direction: 'right', value: 1 })
    })
  )
}

export default initHotKeys
