//引入VueRouter
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

//创建并暴露一个 Router
const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "Login",
    },
    {
      path: "/Login",
      name: "Login",
      meta: {
        title: "登录",
      },
      component: () => import("@/pages/Login/Login.vue"),
    },
    {
      path: "/layout",
      name: "layout",
      component: () => import("@/layout/index.vue"),
      children: [
        {
          path: "/index",
          name: "index",
          meta: {
            title: "首页",
          },
          component: () => import("@/pages/index/index.vue"),
        },
        {
          path: "/user/equipment",
          name: "equipment",
          meta: {
            title: "器材列表",
          },
          component: () => import("@/pages/user/equipment.vue"),
        },
        {
          path: "/user/competition",
          name: "competition",
          meta: {
            title: "竞赛列表",
          },
          component: () => import("@/pages/user/competition.vue"),
        },
        {
          path: "/user/competitionDetail",
          name: "competitionDetail",
          meta: {
            title: "竞赛详情",
          },
          component: () => import("@/pages/user/competitionDetail.vue"),
        },
        {
          path: "/user/order",
          name: "order",
          meta: {
            title: "我的订单",
          },
          component: () => import("@/pages/user/order.vue"),
        },
        {
          path: "/notice/Details",
          name: "Details",
          meta: {
            title: "公告详情",
          },
          component: () => import("@/pages/notice/Details.vue"),
        },
        {
          path: "/notice/noticeList",
          name: "noticeList",
          meta: {
            title: "公告列表",
          },
          component: () => import("@/pages/notice/noticeList.vue"),
        },
        {
          path: "/userCenter",
          name: "UserCenter",
          meta: {
            title: "个人中心",
          },
          component: () => import("@/pages/UserCenter.vue"),
        },
      ],
    },
  ],
});

// // 挂载路由守卫
// router.beforeEach((to, from, next) => {
//     if (to.path === '/Login') return next()
//     //获取token
//     const tokenStr = window.sessionStorage.getItem('token')
//     if (tokenStr === null || tokenStr === "") return next('/Login')
//     next()
// })

export default router;
