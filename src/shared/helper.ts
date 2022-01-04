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
