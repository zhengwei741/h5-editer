import { ref, nextTick } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store/index'
import html2canvas from 'html2canvas'

const usePublishWork = () => {
  const canvasFix = ref(false)
  const store = useStore<GlobalDataProps>()

  const publish = async (el: HTMLElement) => {
    store.commit('setActive', null)
    canvasFix.value = true
    await nextTick()
    return new Promise((resolve, reject) => {
      html2canvas(el, { width: 375, scale: 1, useCORS: true })
        .then((canvas) => {
          canvasFix.value = false
          resolve(canvas.toDataURL())
        })
        .catch(reject)
    })
  }

  return {
    publish,
    canvasFix,
  }
}

export default usePublishWork
