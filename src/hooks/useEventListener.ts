import { Ref, ref, watch, unref } from 'vue'
import { debounce, throttle } from 'lodash-es'

interface UseEventParams {
  el?: Element | Ref<Element | undefined> | Window | any
  name: string
  listener: EventListener
  options?: boolean | AddEventListenerOptions
  autoRemove?: boolean
  isDebounce?: boolean
  wait?: number
}
export type RemoveEventFn = () => void
const useEventListener = ({
  el = window,
  name,
  listener,
  options,
  autoRemove = true,
  isDebounce = true,
  wait = 80,
}: UseEventParams) => {
  /* eslint-disable-next-line */
  let remove: RemoveEventFn = () => { }
  const isAddRef = ref(false)

  if (el) {
    const element = ref(el as Element) as Ref<Element>

    const handle = isDebounce
      ? debounce(listener, wait)
      : throttle(listener, wait)

    const realHandler = wait ? handle : listener

    const addEventListener = (e: Element) => {
      e.addEventListener(name, realHandler, options)
    }
    const removeEventListener = (e: Element) => {
      isAddRef.value = true
      e.removeEventListener(name, realHandler, options)
    }
    watch(element, (value, oldValue, cleanUp) => {
      if (value) {
        unref(isAddRef) && addEventListener(value)
        cleanUp(() => {
          autoRemove && removeEventListener(value)
        })
      }
    })
    remove = () => {
      removeEventListener(element.value)
    }
  }
  return {
    removeEvent: remove,
  }
}

export default useEventListener
