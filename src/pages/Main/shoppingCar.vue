<template>
  <div class="main">
    <div class="content">
      <nav-list></nav-list>
      <carousel></carousel>
      <el-breadcrumb separator=">" style="font-size:large"> 
        <el-breadcrumb-item :to="{ path: '/home' }" replace
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item style="font-weight:bloder"
          >购物车</el-breadcrumb-item
        >
      </el-breadcrumb>

      <el-row>
        <el-col :span="4" style="visibility:hidden">a</el-col>
        <el-col :span="16">
          <shopping-carlist></shopping-carlist>
        </el-col>
        <el-col :span="4" style="visibility:hidden">a</el-col>
      </el-row>
    </div>
    <div class="footer">
      <myfooter></myfooter>
    </div>
  </div>
</template>

<script>
import Carousel from "../../components/Home/carousel.vue";
import myfooter from '../../components/Home/footer.vue';
import NavList from "../../components/Home/navList.vue";
import ShoppingCarlist from "../../components/ShoppingCar/shoppingCarlist.vue";
export default {
  name: "shoppingCar",
  components: { NavList, Carousel, ShoppingCarlist, myfooter },
};
</script>

<style>
.main {
  width: 100%;
  margin: 0;
  padding: 0;
}
.content {
  min-height: calc(100vh - 100px);
}
.footer {
  height: 100px;
  width: 100%;
}
</style>
