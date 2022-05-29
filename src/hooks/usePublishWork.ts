import { ref } from 'vue'
import { takeScreenshotAndUpload } from '@/shared/helper'

const usePublishWork = () => {
  const isPublishing = ref(false)

  const publish = async (el: HTMLElement) => {
    isPublishing.value = true
    const data = await takeScreenshotAndUpload(el)
    isPublishing.value = false
    return data
  }

  return {
    publish,
    isPublishing,
  }
}

export default usePublishWork
