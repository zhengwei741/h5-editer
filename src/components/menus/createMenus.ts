import { render, createVNode } from 'vue'
import Menus from './index.vue'

export interface MenuType {
  label: string
  action: (cid: string | null) => void
}

const createMenus = (menus: MenuType[], triggerClass: string) => {
  const container = document.createElement('div')
  const options = {
    menus,
    triggerClass,
  }
  const vm = createVNode(Menus, options)
  render(vm, container)
  document.body.appendChild(container)
  return () => {
    render(null, container)
    document.body.removeChild(container)
  }
}

export default createMenus
