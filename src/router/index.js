import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundComponent from '@/components/NotFoundComponent.vue'

// import services
import AuthStoreService from '@/services/AuthStoreService'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: false,
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        requiresAuth: false,
      }
    },
    {
      path: '/LocationDisallow',
      name: "locationDisallow",
      component: () => import('../components/LocationDisallowComponent.vue'),
      meta: {
        requiresAuth: false,
      }
    },
    {
      path: '/membersOnly',
      name: 'membersArea',
      component: () => import('../views/MemberAreaView.vue'), 
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/LoginComponent.vue'),
      meta: {
        requiresAuth: false,
      }
    },
    {
      path: '/:pathMatch(.*)*', 
      name: "notfound",
      component: NotFoundComponent,
      meta: {
        requiresAuth: false,
      }
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!AuthStoreService.isLoggedIn()) next('/login');
    else next();
  }
  else next()
})

export default router
