import { onMounted, onUnmounted, Ref, ref } from 'vue'

const useClickOutside = (el: Ref<null | HTMLElement>) => {
  const isOutside = ref(false)

  const handler = (e: MouseEvent) => {
    const target = e.target
    if (el && el.value && el.value.contains(target as HTMLElement)) {
      isOutside.value = false
    } else {
      isOutside.value = true
    }
  }

  onMounted(() => {
    document.addEventListener('click', handler)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })

  return isOutside
}

export default useClickOutside
