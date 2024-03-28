//引入VueRouter
import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
import axios from "@/utils/request";

Vue.use(Router);

//创建并暴露一个 Router
const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "layout",
      redirect: "index",
      component: () => import("@/layout/index.vue"),
      children: [
        {
          path: "index",
          name: "index",
          meta: {
            title: "首页",
          },
          component: () => import("@/pages/index/index.vue"),
        },
        {
          path: "user/equipment",
          name: "equipment",
          meta: {
            title: "器材列表",
          },
          component: () => import("@/pages/user/equipment.vue"),
        },
        {
          path: "user/competition",
          name: "competition",
          meta: {
            title: "竞赛列表",
          },
          component: () => import("@/pages/user/competition.vue"),
        },
        {
          path: "user/competitionDetail",
          name: "competitionDetail",
          meta: {
            title: "竞赛详情",
          },
          component: () => import("@/pages/user/competitionDetail.vue"),
        },
        {
          path: "user/order",
          name: "order",
          meta: {
            title: "我的订单",
          },
          component: () => import("@/pages/user/order.vue"),
        },
        {
          path: "notice/Details",
          name: "Details",
          meta: {
            title: "公告详情",
          },
          component: () => import("@/pages/notice/Details.vue"),
        },
        {
          path: "notice/noticeList",
          name: "noticeList",
          meta: {
            title: "公告列表",
          },
          component: () => import("@/pages/notice/noticeList.vue"),
        },
        {
          path: "userCenter",
          name: "UserCenter",
          meta: {
            title: "个人中心",
          },
          component: () => import("@/pages/UserCenter.vue"),
        },
      ],
    },
    {
      path: "/Login",
      name: "Login",
      meta: {
        title: "登录",
      },
      component: () => import("@/pages/Login/Login.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  let hasRoute = store.state.menus.hasRoute;
  let token = window.sessionStorage.getItem("token");

  if (to.path == "/Login") {
    next();
  } else if (!token) {
    next({ path: "/Login" });
  } else if (token && !hasRoute) {
    axios
      .get("/sys/menu/nav", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        //拿到menuList
        store.commit("setMenuList", res.data.data.nav);
        //拿到用户权限
        store.commit("setPermList", res.data.data.authorities);
        //动态绑定路由
        let newRoutes = router.options.routes;
        res.data.data.nav.forEach((menu) => {
          if (menu.children) {
            menu.children.forEach((e) => {
              //转成路由
              let route = menuToRoute(e);
              //把路由添加到路由管理中
              if (route) {
                newRoutes[0].children.push(route);
              }
            });
          }
        });
        router.addRoutes(newRoutes);
        hasRoute = true;
        store.commit("changeRoutesStatus", hasRoute);
      });
  }
  next();
});

const menuToRoute = (menu) => {
  if (!menu.component) {
    return null;
  }
  let route = {
    name: menu.name,
    path: menu.path,
    meta: {
      icon: menu.icon,
      title: menu.title,
    },
  };
  route.component = () => import("@/pages/" + menu.component + ".vue");
  return route;
};

export default router;
