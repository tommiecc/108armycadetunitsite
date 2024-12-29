import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundComponent from '@/components/NotFoundComponent.vue'

import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

const store = {
  state: {},
  mutations: {},
  actions: {},
  plugins: [vuexLocal.plugin]
}

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
      path: '/membersOnlycad',
      name: 'membersArea',
      component: () => import('../views/MemberAreaView.vue'), 
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/Login',
      name: 'login',
      component: () => import('../components/LoginComponent.vue'),
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

export default router
