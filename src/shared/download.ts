import axios from 'axios'

const saveAs = (url: string, fileName: string) => {
  const link = document.createElement('a')
  link.download = fileName
  link.rel = 'noopener'

  if (link.origin !== location.origin) {
    axios
      .get(url, { responseType: 'blob' })
      .then((res) => {
        link.href = URL.createObjectURL(res.data)
        setTimeout(() => {
          click(link)
        })
        setTimeout(() => {
          URL.revokeObjectURL(link.href)
        }, 10000)
      })
      .catch((e) => {
        console.error(e)
        link.target = '_blank'
        link.href = url
        click(link)
      })
  } else {
    link.href = url
    click(link)
  }
}

const click = (node: HTMLElement) => {
  try {
    node.dispatchEvent(new MouseEvent('click'))
  } catch (e) {
    const evt = document.createEvent('MouseEvents')
    evt.initMouseEvent(
      'click',
      true,
      true,
      window,
      0,
      0,
      0,
      80,
      20,
      false,
      false,
      false,
      false,
      0,
      null
    )
    node.dispatchEvent(evt)
  }
}

export { saveAs }
