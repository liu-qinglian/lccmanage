import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
// import test1 from '../views/test1.vue'
// import test2 from '../views/test2.vue' 
import Chat from '../components/chat.vue'
import adminInfo from '../views/AdminInfo.vue'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    hidden: true,

  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/chat',
        name: '在线聊天',
        component: Chat,
      }, {
        path: '/userInfo',
        name: '个人中心',
        component: adminInfo,
      }
    ]

  },
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: Home,
  //   children: [
  //     {
  //       path: 'test1',
  //       name: 'test1',
  //       component: test1
  //     }, {
  //       path: 'test2',
  //       name: 'test2',
  //       component: test2
  //     },
  //   ]
  // },

]

const router = new VueRouter({
  routes
})

export default router
