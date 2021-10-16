import VueRouter from 'vue-router'
import login from './pages/login.vue'
import home from './pages/Main/home.vue'
import userData from './pages/User/userData.vue'
import shoppingCar from './pages/Main/shoppingCar.vue'
import goodsDetails from './pages/Goods/goodsDetails.vue'
import address from './pages/Goods/myaddress.vue'
import parchase from './pages/Goods/parchase.vue'
import goodsCommit from './pages/Goods/goodsCommit.vue'

const router =  new VueRouter({
    mode:'history',
    routes:[
        {
            path:'/login',
            component:login,
        },
        {
            path:'/home',
            component:home,
            children:[
                
            ]
        },
        {
            path:'/home/user',
            component:userData
        },
        {
            path:'/home/goodsdetail',
            component:goodsDetails,
            children:[
                {
                    path:'/home/goodsdetail/address',
                    component:address
                },
                {
                    path:'/home/goodsdetail/parchase',
                    component:parchase
                },
                {
                    path:'/home/goodsdetail/goodsCommit',
                    component:goodsCommit
                },
                {
                    path:'/home/goodsdetail',
                    redirect:'goodsCommit'
                }
            ]
        },
        {
            path:'/home/shoppingCar',
            component:shoppingCar
        },
        {
            path:'/',
            redirect:'login'
        }
    ]
})

export default router