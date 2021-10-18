<template>
  <div>
    <el-menu class="elmenu" mode="horizontal" active-text-color="#000000">
      <el-menu-item index="1" class="logo">
        <el-image
          style="height:50px;width:50px"
          src="https://mall.cxmmao.com/img/github.a5ee684f.png"
          @click="routeTo(3)"
        ></el-image>
      </el-menu-item>
      <el-menu-item index="2" class="listavatar" :style="'left:' + left + 'px'">
        <img
          style="height:50px;width:50px"
          :src="avatarUrl"
          v-if="avatarUrl !== ''"
          @click="routeTo(1)"
        />
        <img
          style="height:50px;width:50px"
          v-else
          @click="routeTo(1)"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        />
      </el-menu-item>
      <el-menu-item
        index="3"
        class="shoppingCar"
        :style="'left:' + left + 'px'"
      >
        <el-image
          style="height:50px;width:50px"
          src="https://mall.cxmmao.com/img/cart.db98cbfe.svg"
          @click="routeTo(2)"
        ></el-image>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "navList",
  data() {
    return {
      avatarUrl: "",
      screenWidth: document.body.clientWidth,
      left: 1300,
      left1: 1400,
    };
  },
  methods: {
    routeTo(type) {
      switch (type) {
        case 1:
          this.$router.push("/home/user");
          break;
        case 2:
          this.$router.push("/home/shoppingCar");
          break;
        case 3:
          this.$router.push("/home");
          break;
        default:
          break;
      }
    },
    getWidth() {
      if (this.screenWidth < 600) {
        return;
      } else {
        this.left = this.screenWidth - 600;
        this.left1 = this.screenWidth - 500;
      }
    },
  },
  mounted() {
    axios
      .get("/api/userInfo")
      .then((res) => {
        let userInfo = res.data;
        this.avatarUrl = userInfo.privacy.avatar;
      })
      .catch((err) => console.log(err));

    this.screenWidth = document.body.clientWidth;
    this.screenHeight = document.body.clientHeight;

    // 监听窗口变化
    window.onresize = () => {
      return (() => {
        // 重新赋值最新窗口数据
        this.screenWidth = document.body.clientWidth;
        // this.screenHeight = document.body.clientHeight;
        this.getWidth();
      })();
    };
  },
};
</script>
<style>
.elmenu {
  width: 100%;
  height: 60px;
}

.listavatar {
  position: relative;
}
.shoppingCar {
  position: relative;
}
.elmenu > el-menu-item {
  padding-left: 5px;
}
@media screen and (max-width: 1465px) {
  /* .listavatar{
      left: calc(100%);
  }
  .shoppingCar{
      left: 65vh;
  } */
}
</style>
