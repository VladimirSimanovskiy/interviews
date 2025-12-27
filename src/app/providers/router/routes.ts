import type { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/shared/api/firebase'

const checkAuth = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    unsubscribe()
    if (user) {
      next()
    } else {
      next('/auth')
    }
  })
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
