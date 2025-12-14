import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../pages/LandingPage.vue'
import Register from '../pages/Register.vue'
import Login from '../pages/Login.vue'

const routes = [
  { path: '/', name: 'Landing', component: LandingPage },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },

  { path: '/home', component: () => import('../pages/appweb/Home.vue') },
  { path: '/settings', component: () => import('../pages/appweb/Settings.vue') },
  { path: '/allreminders', component: () => import('../pages/appweb/AllReminders.vue') },
  { path: '/notifications', component: () => import('../pages/appweb/Notifications.vue') },
  { path: '/allchats', component: () => import('../pages/appweb/AllChats.vue') },
  { path: '/trash', component: () => import('../pages/appweb/Trash.vue') },
  { path: '/archived', component: () => import('../pages/appweb/Archived.vue') },
  { path: '/group/:id', component: () => import('../pages/appweb/MyGroup.vue'), props: true },

  //{ path: '/group/:groupId/files', name: 'CardFile', component: CardFile, props: true },
  //{ path: '/group/:groupId/files/new', name: 'NewFile', component: NewFile, props: true },
  //{ path: '/group/:groupId/files/:fileId', name: 'FileInside', component: FileInside, props: true },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router