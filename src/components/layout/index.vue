<template>
  <a-layout class="app">
    <a-layout-header class="header">
      <a-dropdown v-if="user.isLogin">
        <a-avatar>{{ user.userName }}</a-avatar>
        <template #overlay>
          <a-menu>
            <a-menu-item key="1" @click="loginOut">登出</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <a-button v-else type="primary" @click="goToLogin">登录</a-button>
    </a-layout-header>
    <a-layout-content class="content">
      <a-layout class="templateDetail">
        <router-view></router-view>
      </a-layout>
    </a-layout-content>
    <a-layout-footer class="footer">Footer</a-layout-footer>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { GlobalDataProps } from '@/store/index'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const store = useStore<GlobalDataProps>()
    const user = computed(() => store.state.user)
    const router = useRouter()

    const goToLogin = () => {
      router.push({ path: '/login' })
    }

    const loginOut = () => {
      store.commit('loginOut')
    }

    return {
      user,
      goToLogin,
      loginOut,
    }
  },
})
</script>
<style lang="less" scoped>
.app {
  height: 100%;
  .content {
    overflow: auto;
  }
  .footer {
    background: #001529;
  }
  .header {
    text-align: right;
  }
}
</style>
