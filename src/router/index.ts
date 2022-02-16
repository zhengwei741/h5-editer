import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    meta: {
      redirectAlreadyLogin: true,
    },
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/login/index.vue'),
  },
  {
    path: '/editer',
    name: 'editer',
    meta: {
      requiredLogin: true,
    },
    component: () =>
      import(/* webpackChunkName: "editer" */ '../views/editer/index.vue'),
  },
  {
    path: '/test',
    name: 'test',
    component: () =>
      import(/* webpackChunkName: "test" */ '../views/test/index.vue'),
  },
  {
    path: '/',
    component: () =>
      import(/* webpackChunkName: "layout" */ '../components/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () =>
          import(/* webpackChunkName: "home" */ '../views/home/index.vue'),
      },
      {
        path: '/templateDetail',
        name: 'templateDetail',
        component: () =>
          import(
            /* webpackChunkName: "templateDetail" */ '../views/templateDetail/index.vue'
          ),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
router.beforeEach(async (to) => {
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  const { isLogin, token } = store.state.user
  if (isLogin) {
    if (redirectAlreadyLogin) {
      return '/'
    }
  } else {
    if (token) {
      try {
        await store.dispatch('fetchCurrentUser', token)
        if (redirectAlreadyLogin) {
          return '/'
        }
      } catch (error) {
        store.commit('loginOut')
        return '/login'
      }
    } else {
      if (requiredLogin) {
        return '/login'
      }
    }
  }
})

export default router
