<template>
  <div>
    <div>
      <el-row class="head">
        <el-col :span="6" style="text-align:center"><div>物品</div></el-col>
        <el-col :span="4"><div>商品名称</div></el-col>
        <el-col :span="4"><div>单价</div></el-col>
        <el-col :span="4"><div>数量</div></el-col>
        <el-col :span="6" style="text-align:center"><div>操作</div></el-col>
      </el-row>
    </div>
    <div class="list" v-for="(good, index) in list" :key="index">
      <el-card shadow="hover" class="carList">
        <el-row>
          <el-col :span="6" style="text-align:center">
            <img :src="good.pic" style="height:100px" />
          </el-col>
          <el-col :span="4">
            <p>{{ good.name }}</p>
          </el-col>
          <el-col :span="4">
            <p>{{ good.price }}</p>
          </el-col>
          <el-col :span="4">
            <p>{{ good.number }}</p>
          </el-col>
          <el-col :span="6" style="text-align:center" class="btn">
            <div >
              <el-button type="danger" @click="deletGoods(good.name)">删除</el-button>
              <el-button type="danger" @click="orderGoods(good.name,good.number)">立即购买</el-button>
            </div>
          </el-col>
        </el-row>
      </el-card>
      <el-divider><i class="el-icon-shopping-cart-2"></i></el-divider>
    </div>
    <el-empty description="这里空空如也" v-show="!ifHave"></el-empty>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "shoppingCarList",
  data() {
    return {
      list: [],
      ifHave: true,
    };
  },
  methods: {
    deletGoods(name) {
      this.$store.commit("changeShoppingCar", name);
      this.list = this.list.filter((obj) => {
        return obj.name !== name;
      });
      if(this.list.length ===0){
        this.ifHave = false
      }
    },
    orderGoods(name,number){
      let selectedGoods = this.list.find(obj => {
        return obj.name === name;
      })
      selectedGoods["number"] = number
      console.log(selectedGoods)
      this.$store.commit('setSelectedGoodsInfo',selectedGoods)
      // this.$store.commit('selectFromCar',selectedGoods);
      this.deletGoods(name);
      this.$router.push('/home/goodsdetail/address');
    }
  },
  mounted() {
    if (this.$store.state.shoppingCar.length !== 0) {
      this.list = [...this.$store.state.shoppingCar];
    }
    if (this.list.length === 0) {
      this.ifHave = false;
    }
    axios
      .post('/api/shoppingcar',this.list)
      .then(res=>{
        if(res.data === 'error'){this.$message({type:'error',message:"登录异常"});return}
      })
      .catch(err=>{this.$message({type:'error',message:err})})
  },
};
</script>

<style>
.head {
  color: orange;
  font-size: 20px;
  font-weight: bolder;
  margin-bottom: 20px;
}
.carList {
  color: brown;
  font-size: 25px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  position: relative;
  height: 14vh;
}
.btn{
  position: relative;
  top:2vh
}
</style>
