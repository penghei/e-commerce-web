<template>
  <div class="main">
      <div class="content">
        <nav-list></nav-list>
        <carousel></carousel>
        <el-breadcrumb separator=">" style="font-size:large">
          <el-breadcrumb-item :to="{ path: '/home' }" replace>
            首页
          </el-breadcrumb-item>
          <el-breadcrumb-item style="font-weight: bloder">
            商品详情
          </el-breadcrumb-item>
        </el-breadcrumb>
          <el-row>
              <el-col :span="5" style="visibility:hidden">a</el-col>
              <el-col :span="14">
                  <!-- <goods-block></goods-block>
                  <br>
                  <commits></commits> -->
                  <router-view></router-view>
              </el-col>
              <el-col :span="5" style="visibility:hidden">a</el-col>
          </el-row>
      </div> 
      <div class="footer">
          <Footer></Footer>
      </div>
  </div>
</template>

<script>
// import Commits from '../../components/GoodsDetail/commits.vue';
// import GoodsBlock from '../../components/GoodsDetail/goodsBlock.vue';

import carousel from "../../components/Home/carousel.vue";
import Footer from '../../components/Home/footer.vue';
import NavList from "../../components/Home/navList.vue";

export default {
  name: "goodsDetails",
  components: { carousel, NavList, Footer},
  data() {
    return {
      goodsId:'',
      allGoods:[]
    };
  },
  methods: {

  },
  mounted(){
    this.allGoods = this.$store.state.goodsLists
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
