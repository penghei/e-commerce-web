<template>
  <div class="main">
    <div class="content">
      <el-breadcrumb separator=">" style="font-size: large">
        <el-breadcrumb-item :to="{ path: '/home' }" replace>
          首页
        </el-breadcrumb-item>
        <el-breadcrumb-item style="font-weight: bloder">
          商品详情
        </el-breadcrumb-item>
      </el-breadcrumb>
      <el-row>
        <el-col :span="5" style="visibility: hidden">a</el-col>
        <el-col :span="14">
          <goods-block></goods-block>
          <goods-commit></goods-commit>
        </el-col>
        <el-col :span="5"> </el-col>
      </el-row>
    </div>
    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Footer from "../../components/Basic/Basefooter.vue";
import GoodsBlock from '../../components/GoodsDetail/GoodsDisplayBlock.vue';
import GoodsCommit from '../../components/GoodsDetail/GoodsCommit.vue';
export default {
  name: "goodsDetails",
  components: { Footer, GoodsBlock, GoodsCommit },
  data() {
    return {
      goodsId: "",
      allGoods: [],
    };
  },
  methods: {},
  mounted() {
    this.allGoods = this.$store.state.goodsLists;
  },
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
