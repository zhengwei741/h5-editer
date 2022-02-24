import html2canvas from 'html2canvas'
import axios from 'axios'
import { RespUploadData } from '@/shared/responseType'

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

function getCanvasBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob(resolve)
  })
}

export const uploadFile = async <T = any>(
  url: string,
  file: Blob | File,
  fileName: string
) => {
  const newFile = file instanceof File ? file : new File([file], fileName)
  const formData = new FormData()
  formData.append(newFile.name, newFile)
  const { data } = await axios.post<T>(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data
}

export const takeScreenshotAndUpload = async (el: HTMLElement) => {
  // 1获取canvas
  const canvas = await html2canvas(el, {
    width: 375,
    scale: 1,
    useCORS: true,
  })
  // 2获取blob对象
  const canvasBlob = await getCanvasBlob(canvas)
  if (canvasBlob) {
    // 3上传
    return await uploadFile<RespUploadData>(
      '/uplaod',
      canvasBlob,
      'screenshot.png'
    )
  }
}
