import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import( "../views/login/index.vue"),
  }
  
];

const router = new VueRouter({
  routes,
});
//设置路由守卫
router.beforeEach(function(to,from,next){
  let token = localStorage.getItem('token');
  console.log(token)
  if(to.name == 'login'){
    next()
  }else if(token){
    next()
  }else{
    next({path:"/login"})
  }

})




export default router;
