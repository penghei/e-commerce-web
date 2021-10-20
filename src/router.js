import VueRouter from "vue-router";
import login from "./pages/LoginPage.vue";
import home from "./pages/Main/HomePage.vue";
import userData from "./pages/User/UserInformationPage.vue";
import shoppingCar from "./pages/ShoppingCar/ShoppingCarPage.vue";
import goodsDetails from "./pages/Goods/GoodsDetailsPage.vue";
import address from "./pages/Goods/OrderPage.vue";
import parchase from "./pages/Goods/PayPage.vue";
import allMainPages from "./pages/AllMainPage.vue";

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/login",
      component: login,
    },
    {
      path: "/main",
      component: allMainPages,
      children: [
        {
          path: "/home",
          component: home,
        },
        {
          path: "/home/user",
          component: userData,
        },
        {
          path: "/home/goodsdetail",
          component: goodsDetails,
        },
        {
          path: "/home/address",
          component: address,
        },
        {
          path: "/home/parchase",
          component: parchase,
        },
        {
          path: "/home/shoppingCar",
          component: shoppingCar,
        },
      ],
    },

    {
      path: "/",
      redirect: "login",
    },
  ],
});

export default router;
