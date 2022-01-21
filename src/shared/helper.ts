export const getImageDimensions = (url: string | File) => {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const img = new Image()
    img.src = typeof url === 'string' ? url : URL.createObjectURL(url)
    img.addEventListener('load', () => {
      const { naturalWidth: width, naturalHeight: height } = img
      resolve({
        width,
        height,
      })
    })
    img.addEventListener('error', (e: any) => {
      console.error(e)
      reject(new Error('加载图片出错'))
    })
  })
}

/**
 * 查找父级元素
 * @param el dom节点
 * @param className 类名
 * @returns 节点或者为空
 */
export const findParentElement = (
  el: HTMLElement,
  className: string
): HTMLElement | null => {
  while (el.parentElement) {
    const parentElement = el.parentElement
    if (parentElement.classList.contains(className)) {
      return parentElement
    }
    el = parentElement
  }
  return null
}
