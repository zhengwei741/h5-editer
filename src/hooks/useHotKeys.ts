import { onMounted, onUnmounted } from 'vue'
import hotkeys, { HotkeysEvent } from 'hotkeys-js'

const useHotKeys = (hotkey: string, cb: any) => {
  const keyHandle = (
    keyboardEvent: KeyboardEvent,
    hotkeysEvent: HotkeysEvent
  ) => {
    if (typeof cb === 'function') {
      cb(keyboardEvent, hotkeysEvent)
    }
  }
  onMounted(() => {
    hotkeys(hotkey, keyHandle)
  })
  onUnmounted(() => {
    hotkeys.unbind(hotkey, keyHandle)
  })
}

export default useHotKeys
