import { createRouter, createWebHistory } from 'vue-router'
import BuilderView from '@/views/BuilderView.vue'

const routes = [
  {
    path: '/',
    name: 'builder',
    component: BuilderView
  },
  {
    path: '/docs/mini-player',
    name: 'mini-player-docs',
    component: () => import('@/views/docs/MiniPlayerDocs.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80
      }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

export default router
