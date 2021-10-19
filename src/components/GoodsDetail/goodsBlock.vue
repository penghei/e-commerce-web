<template>
  <div>
    <el-card :style="'width:'+cardWidth+'px'">
      <el-row>
        <el-col :span="10"  class="imgPic">
          <img :src="picurl" style="height:200px;max-width:200px"/>
        </el-col>
        <el-col :span="14" class="goodsBlock">
          <div class="detail">
            <h3>{{ goodsName }}</h3>
            <p>价格:</p>
            <p>￥{{ goodsPrice }}</p>
            <span>
              购买数量:<el-input-number
                v-model="goodsnum"
                @change="handleChange"
                :min="1"
                :max="10"
                size="small"
              ></el-input-number>
            </span>
            <br />
            <div style="padding-top:10px">
              <el-button type="danger" @click="routeTo">立即购买</el-button>
              <el-button type="danger" @click="addToCar">加入购物车</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>

export default {
  name: "goodsBlock",
  data() {
    return {
      goodsName: "",
      goodsPrice: "",
      goodsId: "",
      goodsnum: 1,
      picurl: "",
      goodsList: [],
      cardWidth:1000
    };
  },
  methods: {
    handleChange() {},
    addToCar(){
      let goods = {
        name:this.goodsName,
        price:this.goodsPrice,
        number:this.goodsnum,
        pic:this.picurl,
        id:this.goodsId
      }
      this.$store.commit('addShoppingCar',goods)
      this.$message({
        type:'success',
        message:'添加成功，宝贝在购物车等你哦'
      })
      this.goodsnum = 1;
    },
    routeTo() {
      this.$router.push("/home/goodsdetail/address");
      this.$store.commit('setSelectedGoodsNum',this.goodsnum );
      this.goodsnum = 1;
    },
    changeCarWidth(width){
      if(width > 1000)
      this.cardWidth = width - 700
    }
  },
  mounted() {
    this.goodsList = [...this.$store.state.goodsList];
    let selectedGoods = this.goodsList.find(obj=>{
      return obj.id === this.$store.state.selectedGoods.id
    })
    if (selectedGoods !== undefined) {
      this.goodsName = selectedGoods.name;
      this.goodsPrice = selectedGoods.price;
      this.picurl = selectedGoods.picUrl;
    }
    window.onresize = () => {
      return (() => {
        // 重新赋值最新窗口数据
        let screenWidth = document.body.clientWidth;
        // this.screenHeight = document.body.clientHeight;
        this.changeCarWidth(screenWidth);
      })();
    };
  },
};
</script>

<style>
.detail {
  float: left;
}
.detail>p:nth-of-type(2){
  font-family: fantasy;
  color: red;
  font-weight: 100;
  font-size: 50px;
  margin: 0;
}
.detail>h3{
  color: orange;
  font-weight: 400;
}
.detail>span{
  font-size: 5px;
  font-weight: 200;
}
.imgPic{
  text-align: center;
}
@media screen and (max-width:1300px) {
  .goodsBlock.el-col.el-col-14{
    width: 500px;
  }
}

</style>
