<template>
  <div>
    <div>
      <div>排序:</div>
      <el-select
        v-model="sortType"
        placeholder="请选择排序方式"
        @change="sortGoods"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div v-for="good in goods" :key="good.id" class="inner">
      <el-card class="goodsCard" shadow="hover">
        <img
          :src="good.picUrl"
          @click="goodDetail(good.id, good.name, good.price, good.picUrl)"
          style="height:100px"
        />
        <br />
        <span style="font-size:20px;color:red;">{{ good.name }}</span>
        <br />
        <span style="font-size:40px;color:orange;font-weight:bold"
          >￥{{ good.price }}</span
        >
        <br />
        <span>
          <el-button type="danger" @click="goodDetail(good.id, good.name)"
            >查看详情</el-button
          >
        </span>
      </el-card>
    </div>
    <el-empty description="什么都没搜到" v-show="ifEmpty"></el-empty>
  </div>
</template>

<script>
import pubsub from "pubsub-js";
import uuid from "uuidjs";
import axios from "axios";
export default {
  name: "shoppingList",
  data() {
    return {
      goods: [],
      selected: 1,
      allGoods: [],
      ifEmpty: false,
      options: [
        {
          label: "按价格从小到大排序",
          value: "sort1",
        },
        {
          label: "按价格从大到小排序",
          value: "sort2",
        },
        {
          label: "按名称排序",
          value: "sort3",
        },
      ],
      sortType: "",
    };
  },
  methods: {
    getGoods() {
      axios
        .get("/api/goodsDetail")
        .then((res) => {
          if (res.data == "notfound") {
            this.$message("未找到商品信息");
          }
          let goodList = [...res.data];
          console.log(goodList);
          goodList.forEach((obj) => {
            obj["id"] = uuid.generate();
            obj["ifSelected"] = false;
          });
          this.goods = goodList;
          this.allGoods = this.goods;
          this.$store.commit("setGoodsList", this.allGoods);
        })
        .catch((err) => console.log(err));
    },
    addToShoppingCar() {},
    goodDetail(id, name, price, picUrl) {
      this.$router.push({
        path: `/home/goodsdetail`,
      });

      this.$store.commit("setSelectedGoodsInfo", { id, name, price, picUrl });
    },
    selectGoods() {
      // this.selected =  this.$store.state.checkSelect
      if (this.allGoods.length >= this.goods.length) {
        this.goods = [...this.allGoods];
      }
      let newGoods = [];
      let price;
      console.log(this.selected);
      switch (this.selected) {
        case 1:
          newGoods = this.allGoods;
          break;
        case 2:
          newGoods = this.goods.filter((obj) => {
            price = Number(obj.price);
            return price <= 500;
          });
          break;
        case 3:
          newGoods = this.goods.filter((obj) => {
            price = Number(obj.price);
            return obj.price > 500 && obj.price <= 1000;
          });
          break;
        case 4:
          newGoods = this.goods.filter((obj) => {
            price = Number(obj.price);

            return obj.price > 1000 && obj.price <= 1500;
          });
          break;
        case 5:
          newGoods = this.goods.filter((obj) => {
            price = Number(obj.price);
            return obj.price > 1500 && obj.price <= 3000;
          });
          break;
        case 6:
          newGoods = this.goods.filter((obj) => {
            price = Number(obj.price);
            return obj.price > 3000;
          });
          break;

        default:
          break;
      }
      console.log(newGoods, "new");
      this.goods = [...newGoods];
      if (this.goods.length === 0) {
        this.ifEmpty = true;
      } else {
        this.ifEmpty = false;
      }
    },
    sortGoods() {
      const compare = (prop) => (obj1, obj2) => {
        var val1 = obj1[prop];
        var val2 = obj2[prop];
        if (val1 < val2) {
          return -1;
        } else if (val1 > val2) {
          return 1;
        } else {
          return 0;
        }
      };
      switch (this.sortType) {
        case "sort1":
          this.goods.sort(compare("price"));
          break;
        case "sort2":
          this.goods = this.goods.sort(compare("price")).reverse();
          break;
        case "sort3":
          this.goods.sort(compare("name"));
          break;
        default:
          break;
      }
    },
  },
  mounted() {
    this.getGoods();

    pubsub.subscribe("radio", (_, data) => {
      this.selected = data;
      this.selectGoods();
    });
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
.goodsCard {
  margin: 10px;
  min-height: 300px;
  max-height: 300px;
  min-width: 200px;
}
@media screen and (max-width: 1200px) {
  .inner {
    width: 50%;
  }
}
@media screen and (max-width: 950px) {
  .inner {
    width: 100%;
  }
}
</style>
