import { useUserStore } from '@/entities/user'
import { AdminPage } from '@/pages/adminPage'
import { LicensePage } from '@/pages/licensePage'
import { LoginPage } from '@/pages/loginPage'
import { NotFoundPage } from '@/pages/notFoundPage'
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
    component: AdminPage,
    name: 'admin',
    meta: { requiresAuth: true, adminOnly: true },
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundPage,
    meta: { requiresAuth: false },
  },
]

const router = createRouter({ routes, history: createWebHistory() })

router.beforeEach((to, from) => {
  const user = useUserStore()
  if (to.meta.requiresAuth && !user.isLogged) return { name: 'login' }
  if (to.name == 'login' && user.isLogged) return { name: 'main' }
  if (to.meta.adminOnly && !user.canManageUsersAndRoles) return from
})

export { router }
