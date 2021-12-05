import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/login/index.vue'),
  },
  {
    path: '/editer',
    name: 'editer',
    component: () =>
      import(/* webpackChunkName: "editer" */ '../views/editer/index.vue'),
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

export default router
