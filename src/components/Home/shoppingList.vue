<template>
  <div>
    <div align="center">
      <el-button @click="selectGoods" type="danger">筛选</el-button>
    </div>
    <div v-for="good in goods" :key="good.id" class="inner">
      <el-card class="goodsCard" v-show="good.ifSelect">
        <el-image
          :src="good.picUrl"
          fit="fill"
          @click="goodDetail(good.id,good.name,good.price,good.picUrl)"
          style="heigth:200px;width:100px"
        />
        <br />
        <span>{{ good.name }}</span>
        <br />
        <span>￥{{ good.price }}</span>
        <br />
        <span>
          <el-button type="danger" @click="goodDetail(good.id,good.name)"
            >查看详情</el-button
          >
        </span>
      </el-card>
    </div>
    <el-empty description="什么都没搜到" v-show="ifEmpty"></el-empty>
  </div>
</template>

<script>
import uuid from "uuidjs";
export default {
  name: "shoppingList",
  data() {
    return {
      goods: [
        {
          picUrl:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          name: "商品1",
          price: "100",
          id: uuid.generate(),
          ifSelect: true,
        },
        {
          picUrl:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          name: "商品2",
          price: "250",
          id: uuid.generate(),
          ifSelect: true,
        },
        {
          picUrl:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          name: "商品3",
          price: "500",
          id: uuid.generate(),
          ifSelect: true,
        },
        {
          picUrl:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          name: "商品4",
          price: "1000",
          id: uuid.generate(),
          ifSelect: true,
        },
        {
          picUrl:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          name: "商品5",
          price: "430",
          id: uuid.generate(),
          ifSelect: true,
        },
      ],
      selected: 1,
      allGoods: [],
      ifEmpty:false
    };
  },
  methods: {
    getGoods() {},
    addToShoppingCar() {},
    goodDetail(id,name,price,picUrl) {
      this.$router.push({
        path:`/home/goodsdetail/goodsCommit`
      })
      this.$store.commit('setGoodsList',this.allGoods)
      this.$store.commit('setSelectedGoodsInfo',{id,name,price,picUrl})
    },
    selectGoods() {
      this.selected =  this.$store.state.checkSelect
      this.goods = [...this.allGoods];
      let newGoods = [];
      let price;
      switch (this.selected) {
        case 1:
          newGoods = this.goods.filter((obj) => {
            price = Number(obj.price)
            return price <= 500;
          });
          break;
        case 2:
          newGoods = this.goods.filter((obj) => {
            price = Number(obj.price)
            return obj.price > 500 && obj.price <= 1000;
          });
          break;
        case 3:
          newGoods = this.goods.filter((obj) => {
            price = Number(obj.price)
           
            return obj.price > 1000 && obj.price <= 1500;
          });
          break;
        case 4:
          newGoods = this.goods.filter((obj) => {
            price = Number(obj.price)
            return obj.price > 1500 && obj.price <= 3000;
          });
          break;
        case 5:
          newGoods = this.goods.filter((obj) => {
            price = Number(obj.price)
            return obj.price > 3000;
          });
          break;
        default:
          break;
      }
      this.goods = [...newGoods];
      if(this.goods.length === 0){
        this.ifEmpty = true;
      }else{
        this.ifEmpty = false;
      }
    },
  },
  mounted() {
    this.allGoods = this.goods;
  },
};
</script>

<style scoped>
.inner {
  text-align: center;
  width: 33%;
  min-width: 20%;
  float: left;
}
</style>
