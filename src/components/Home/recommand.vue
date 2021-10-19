<template>
  <div style="" class="main">
    <div class="label">
      <p style="font-size:larger;font-weight:bolder;">看了又看</p>
    </div>
    <div v-for="rec in recommands" :key="rec.id">
      <div class="inner" @click="rcmdIn(rec.name)">
        <img :src="rec.picUrl" style="max-width:100px;max-height:100px" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "recommand",
  data() {
    return {
      recommands: [],
      loading: false,
    };
  },
  methods: {
    rcmdIn(name) {
      let allGoods = this.$store.state.goodsList;
      let found = allGoods.find((obj) => {
        return obj.name === name;
      });
      if (found !== undefined) {
        this.$store.commit("setSelectedGoodsInfo", found);
        this.$router.push("/home");
        const loading = this.$loading({
            lock: true,
            text: "拼命加载中.......",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
        setTimeout(() => {
          loading.close();
          this.$router.push("/home/goodsdetail/goodsCommit");
        }, 100);
      }
    },
  },
  mounted() {
    axios.get("/api/goodsDetail").then((res) => {
      let list = res.data;
      let radlist = [];
      while (radlist.length < 3) {
        let num = Math.floor(Math.random() * 7);
        if (radlist.indexOf(num) == -1) {
          radlist.push(num);
        }
      }
      console.log(radlist, list);
      list.forEach((obj) => {
        if (radlist.includes(list.indexOf(obj))) {
          this.recommands.push({ picUrl: obj.picUrl, name: obj.name });
        }
      });
    });
  },
};
</script>

<style scoped>
.main {
  border: 2px solid orange;
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), 0 0 6px rgba(0, 0, 0, 0.06);
  max-width: 15vh;
  float: right;
  position: fixed;
}
.label {
  color: red;
  text-align: center;
}
.inner {
  min-width: 5vh;
  padding: 10px;
  text-align: center;
}
@media screen and (max-width: 500px) {
  .inner {
    display: none;
  }
}
</style>
