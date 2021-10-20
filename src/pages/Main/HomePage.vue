<template>
  <div class="main">
    <div class="content">
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
        <el-col :span="4" ><div class="checkBoxDisplay"><CheckBox></CheckBox></div></el-col>
        <el-col :span="12"><shopping-list></shopping-list></el-col>
        <el-col :span="4">
          <div class="recommandBlock">
            <recommand></recommand>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="footer">
      <myFooter></myFooter>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';

import CheckBox from "../../components/Home/ShoppingCheckBox.vue";
import myFooter from "../../components/Basic/Basefooter.vue";
import Recommand from '../../components/Home/ShoppingRecommand.vue';
import ShoppingList from "../../components/Home/ShoppingList.vue";
export default {
  name: "home",
  components: { ShoppingList, CheckBox, myFooter, Recommand },
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
@media screen and (max-width:800px) {
  .checkBoxDisplay{
    display: none;
  }
}
.recommandBlock{
  position: sticky;
}
</style>
