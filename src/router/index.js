import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'
import Home from '../views/Home/Home.vue'
import Login from '../views/Login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'Layout',
    component: Layout,
    redirect:'/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home,
        meta:{
          isLogin:true
        },
      },
      {
        path: '/active',
        name: 'Active',
        component: () => import('../views/ActiveDisplay/ActiveDisplay.vue'),
        meta:{
          isLogin:true
        }
      },
      {
        path: '/static',
        name: 'Static',
        component: () => import('../views/StaticDisplay/StaticDisplay.vue'),
        meta:{
          isLogin:true
        }
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  }
]


const router = new VueRouter({
  routes
})

// 为路由对象，添加 beforeEach 导航守卫
router.beforeEach((to, from, next) => {
  // 如果用户访问的登录页，直接放行
  if (to.meta.isLogin){
    let token = sessionStorage.getItem("token")
    if(token){
      next()
    }else{
      next('/login')
    }
  }else{
    next()
  }
  })

export default router
