import { useUserStore } from '@/entities/user'
import { LicensePage } from '@/pages/licensePage'
import { LoginPage } from '@/pages/loginPage'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: LicensePage,
    name: 'main',
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    component: LoginPage,
    name: 'login',
    meta: { requiresAuth: false },
  },
  {
    path: '/admin',
    redirect: 'login',
    name: 'admin',
    meta: { requiresAuth: true },
  },
]

const router = createRouter({ routes, history: createWebHistory() })

router.beforeEach((to) => {
  if (!to.meta.requiresAuth) return true
  if (!useUserStore().isLogged) return { name: 'login' }
})

export { router }
