//引入VueRouter
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//创建并暴露一个 Router
const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: 'Login',
        },
        {
            path: '/Login',
            name: 'Login',
            component: () => import('@/pages/Login.vue')
        },
        {
            path: '/layout',
            name: 'layout',
            component: () => import('@/layout/index.vue')
        },

    ]
})

// // 挂载路由守卫
// router.beforeEach((to, from, next) => {
//     if (to.path === '/Login') return next()
//     //获取token
//     const tokenStr = window.sessionStorage.getItem('token')
//     if (tokenStr === null || tokenStr === "") return next('/Login')
//     next()
// })

export default router

