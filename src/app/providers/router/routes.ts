import type { RouteRecordRaw } from 'vue-router'
import { ensureUserSessionReady, useUserStore } from '@/entities/user'

const checkAuth = async () => {
  await ensureUserSessionReady()
  const userStore = useUserStore()
  return userStore.userId ? true : '/auth'
}
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/home'),
    beforeEnter: checkAuth,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/pages/auth'),
  },
  {
    path: '/interview/:id',
    name: 'Interview',
    component: () => import('@/pages/interview'),
    beforeEnter: checkAuth,
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('@/pages/list'),
    beforeEnter: checkAuth,
  },
  {
    path: '/statistic',
    name: 'Statistic',
    component: () => import('@/pages/statistic'),
    beforeEnter: checkAuth,
  },
]
