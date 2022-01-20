<template>
  <div
    class="content-menu ant-dropdown ant-dropdown-placement-bottomLeft"
    ref="contextMenuRef"
  >
    <div class="ant-dropdown-content">
      <ul
        class="ant-dropdown-menu ant-dropdown-menu-root ant-dropdown-menu-vertical ant-dropdown-menu-light"
      >
        <li
          class="ant-dropdown-menu-item ant-dropdown-menu-item-only-child"
          v-for="(menu, index) in menus"
          :key="index"
          @click="onMenusClick(menu)"
        >
          <span class="ant-dropdown-menu-title-content">
            {{ menu.label }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted, ref } from 'vue'

interface menuType {
  label: string
  action: () => void
}

export default defineComponent({
  props: {
    menus: {
      type: Array as PropType<menuType[]>,
      default() {
        return []
      },
    },
    triggerClass: {
      type: String,
      default: 'edit-wrapper',
    },
  },
  setup() {
    onMounted(() => {
      document.addEventListener('contextmenu', triggerContextMenu)
      document.addEventListener('click', handleClick)
    })

    const contextMenuRef = ref<null | HTMLElement>(null)

    const triggerContextMenu = (e: MouseEvent) => {
      const ref = contextMenuRef.value
      if (ref) {
        e.preventDefault()
        ref.style.display = 'block'
        ref.style.top = e.pageY + 'px'
        ref.style.left = e.pageX + 'px'
      }
    }

    const handleClick = () => {
      const domElement = contextMenuRef.value as HTMLElement
      domElement.style.display = 'none'
    }

    const onMenusClick = (menu: menuType) => {
      const ref = contextMenuRef.value
      if (ref) {
        ref.style.display = 'none'
      }
      menu.action()
    }
    return {
      contextMenuRef,
      onMenusClick,
    }
  },
})
</script>

<style lang="less" scoped>
.content-menu {
  top: 0;
  left: 0;
  position: absolute;
  display: none;
  min-width: 150px;
}
</style>
