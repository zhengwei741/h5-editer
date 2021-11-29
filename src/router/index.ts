import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
  {
    path: '/',
    name: 'home',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/home/index.vue'),
  },
  {
    path: '/editer',
    name: 'editer',
    component: () =>
      import(/* webpackChunkName: "editer" */ '../views/editer/index.vue'),
  },
  {
    path: '/templateDetail',
    name: 'templateDetail',
    component: () =>
      import(
        /* webpackChunkName: "templateDetail" */ '../views/templateDetail/index.vue'
      ),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
