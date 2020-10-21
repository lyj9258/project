import Vue from 'vue'
import VueRouter from 'vue-router'

import centerRouter from './routes/center'
import cinemaRouter from './routes/cinema'
import filmRouter from './routes/film'
import detailRouter from './routes/detail'
import cityRouter from './routes/city'
import vuexRouter from './routes/vuex'
import authRouter from './routes/auth'


Vue.use(VueRouter)

const routes = [
  centerRouter,
  cinemaRouter,
  filmRouter,
  detailRouter,
  cityRouter,
  vuexRouter,
  ...authRouter,
  {
    path:'/',
    redirect:"/film"
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

//全局路由守卫
router.beforeEach((to,from,next)=>{
  let arr = [
    //存需要登录的页面
    "/cinema",
  //   ...
   ];
   if(arr.includes(to.path)){
     //返回真则在
     if(localStorage.getItem('_token')){
      next()
     }else{
      next({path:'/login',query:{'refer':to.fullPath}})
     }
   }else{
     //不在 （不需要登录判断）
     next()
   }

})

export default router;
