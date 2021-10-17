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
          >商品列表</el-breadcrumb-item
        >
      </el-breadcrumb>
      <el-row>
        <el-col :span="4" style="visibility:hidden">a</el-col>
        <el-col :span="4"><CheckBox></CheckBox></el-col>
        <el-col :span="12"><shopping-list></shopping-list></el-col>
        <el-col :span="4" style="visibility:hidden">a</el-col>
      </el-row>
    </div>
    <div class="footer">
      <myFooter></myFooter>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
import Carousel from "../../components/Home/carousel.vue";
import CheckBox from "../../components/Home/checkBox.vue";
import myFooter from "../../components/Home/footer.vue";
import NavList from "../../components/Home/navList.vue";
import ShoppingList from "../../components/Home/shoppingList.vue";
export default {
  name: "home",
  components: { NavList, Carousel, ShoppingList, CheckBox, myFooter },
  mounted(){
    
  }
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
