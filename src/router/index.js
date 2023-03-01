import { createRouter, createWebHashHistory } from 'vue-router'
import axios from 'axios'
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/:pathMatch(.*)", // 不识别的path自动匹配404
            redirect: '/NotFound',
            children: [
                {
                    path: '/NotFound', // 这里要加上/404,和上面的redirect对应,必须加上/
                    name: 'NotFound',
                    component: () => import('@/components/NotFound.vue'),
                },
            ],
        },
        {
            path: '/Signup',
            component: () => import('@/components/Signup.vue'),
            name: 'Signup',
        }
    ]
})

const whitePaths = ['/NotFound']

// 注册导航守卫
router.beforeEach((to, from, next) => {
    next()
    if (whitePaths.includes(to.path.toLocaleLowerCase()) === true) {
        next()
    } else {
        axios.get(`https://your-api.com/user/role`).then(res => {
            if (res.data.role === 'admin') {
                next('/Signup')
            } else {
                next('/NotFound')
            }
        }).catch(() => {
            next('/NotFound')
        })
    }
})

export default router
