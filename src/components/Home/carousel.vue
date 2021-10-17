<template>
  <el-carousel class="main" :height="height + 'px'">
    <el-carousel-item v-for="pic in pics" :key="pic.id">
      <img :src="pic.url"  style="min-height:440px" >
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import uuid from "uuidjs";
export default {
  name: "carousel",
  data() {
    return {
        height:420,
      pics: [
        {
          url: "https://mall.cxmmao.com/img/banner_01.6e9153e8.png",
          id: uuid.generate(),
        },
        {
          url: "https://mall.cxmmao.com/img/banner_03.40ae7e7c.png",
          id: uuid.generate(),
        },
        {
          url: "https://mall.cxmmao.com/img/banner_02.dd330319.png",
          id: uuid.generate(),
        },
      ],
    };
  },
};
</script>

<style scoped>
.main {
  width: 100%;
}
</style>
