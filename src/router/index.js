import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../pages/LandingPage.vue'
import Register from '../pages/Register.vue'
import Login from '../pages/Login.vue'
import NewGroup from '../pages/NewGroup.vue'
import Seguimiento from '../components/mobile/Seguimiento.vue'
import MemberDetailPage from '../components/mobile/MemberDetailPage.vue'
import GroupEdit from '../components/mobile/GroupEdit.vue'

const routes = [
  { path: '/', name: 'Landing', component: LandingPage },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },

  { path: '/home', name: 'Home', component: () => import('../pages/appweb/Home.vue') },
  { path: '/notifications', name: 'Notifications', component: () => import('../pages/appweb/Notifications.vue') },
  { path: '/allchats', name: 'AllChats', component: () => import('../pages/appweb/AllChats.vue') },
  { path: '/trash', name: 'Trash', component: () => import('../pages/appweb/Trash.vue') },
  { path: '/archived', name: 'Archived', component: () => import('../pages/appweb/Archived.vue') },

  { path: '/new-group', name: 'NewGroup', component: NewGroup },
  { path: '/groups/:id/edit', name: 'group-edit', component: GroupEdit, props: true },

  { path: '/group/:id', name: 'MyGroup', component: () => import('../pages/appweb/MyGroup.vue'), props: true },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
