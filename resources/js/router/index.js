import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../Views/HomeView.vue'
import AddVlogView from '../Views/AddVlogView.vue';
import UpdateVlogView from '../Views/UpdateVlogView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/addvlog',
      name: 'addvlog',
      component: AddVlogView
    },
    {
      path: '/update/:id',
      name: 'updatevlog',
      component: UpdateVlogView
    },
  ]
})

export default router
