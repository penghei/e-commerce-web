<template>
  <div class="display">
      <el-carousel class="main" height="440px">
      <el-carousel-item v-for="pic in pics" :key="pic.id" >
        <el-image :src="pic.url" fit="none"></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import uuid from 'uuidjs'
export default {
    name:'carousel',
    data() {
        return {
            pics:[
                {
                    url:'https://mall.cxmmao.com/img/banner_01.6e9153e8.png',
                    id:uuid.generate()
                },
                {
                    url:'https://mall.cxmmao.com/img/banner_03.40ae7e7c.png',
                    id:uuid.generate()
                },
                {
                    url:'https://mall.cxmmao.com/img/banner_02.dd330319.png',
                    id:uuid.generate()
                }
            ]
        };
    },
}
</script>

<style>
.main{
    width: 100%;
   
}

</style>