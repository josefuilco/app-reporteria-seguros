import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'sign-in' }
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('../module/auth/presentation/views/SignInView.vue')
    }
  ],
})

export default router
