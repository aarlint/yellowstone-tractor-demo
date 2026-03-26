import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./views/PublicHome.vue')
    },
    {
      path: '/equipment/:id',
      component: () => import('./views/EquipmentDetail.vue')
    },
    {
      path: '/admin/login',
      component: () => import('./views/AdminLogin.vue')
    },
    {
      path: '/admin',
      component: () => import('./views/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          redirect: '/admin/equipment'
        },
        {
          path: 'equipment',
          component: () => import('./views/AdminEquipmentList.vue')
        },
        {
          path: 'equipment/new',
          component: () => import('./views/AdminEquipmentForm.vue')
        },
        {
          path: 'equipment/:id',
          component: () => import('./views/AdminEquipmentForm.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth || to.matched.some(r => r.meta.requiresAuth)) {
    const token = localStorage.getItem('yt_token')
    if (!token) return { path: '/admin/login' }
  }
})

export default router
