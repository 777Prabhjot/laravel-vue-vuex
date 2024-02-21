import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../Views/HomeView.vue'
import AddVlogView from '../Views/AddVlogView.vue';
import UpdateVlogView from '../Views/UpdateVlogView.vue';
import RegisterView from '../Views/RegisterView.vue';
import LoginView from '../Views/LoginView.vue';

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
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
  ]
})

export default router
