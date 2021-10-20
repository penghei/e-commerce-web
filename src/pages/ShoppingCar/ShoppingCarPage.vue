<template>
  <div class="main">
    <div class="content">
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
import myfooter from '../../components/Basic/BaseFooter.vue';
import ShoppingCarlist from "../../components/ShoppingCar/ShoppingCar.vue";
export default {
  name: "shoppingCar",
  components: { ShoppingCarlist, myfooter },
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
