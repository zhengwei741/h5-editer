import createMenus, { MenuType } from '@/components/menus/createMenus'
import { onMounted, onUnmounted } from 'vue'
import { GlobalDataProps } from '@/store'
import { useStore } from 'vuex'

const initMenus = () => {
  let destroy: any
  const store = useStore<GlobalDataProps>()

  const menus: MenuType[] = [
    {
      label: '拷贝图层',
      hotKey: 'ctrl+c, command+c',
      action() {
        store.commit('copy')
      },
    },
    {
      label: '粘贴图层',
      hotKey: 'ctrl+v, command+v',
      action() {
        store.commit('paste')
      },
    },
    {
      label: '删除图层',
      hotKey: 'delete',
      action(cid: string | null) {
        store.commit('delete', cid)
      },
    },
    {
      label: '取消选中',
      hotKey: 'esc',
      action() {
        store.commit('escape')
      },
    },
  ]

  onMounted(() => {
    destroy = createMenus(menus, 'edit-wrapper')
  })
  onUnmounted(() => {
    destroy()
  })
}

export default initMenus
