<template>
  <div>
      <el-menu class="elmenu" mode="horizontal" >
          <el-menu-item index="1" class="logo">
              <el-image style="height:80px;width:80px" src="https://mall.cxmmao.com/img/github.a5ee684f.png" @click="routeTo(3)"></el-image>
          </el-menu-item>
          <el-menu-item index="2" class="listavatar">
              <el-image style="height:80px;width:80px" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" @click="routeTo(1)"></el-image>
          </el-menu-item>
          <el-menu-item index="3" class="shoppingCar">
              <el-image style="height:80px;width:80px" src="https://mall.cxmmao.com/img/cart.db98cbfe.svg" @click="routeTo(2)"></el-image>
          </el-menu-item>
      </el-menu>
  </div>
</template>

<script>
export default {
    name:'navList',
    data() {
        return {
            
        };
    },
    methods:{
        routeTo(type){
            switch (type) {
                case 1:
                    this.$router.push('/home/user')
                    break;
                case 2:
                    this.$router.push('/home/shoppingCar')
                    break;
                case 3:
                    this.$router.push('/home')
                    break;
                default:
                    break;
            }
        }
    }
}
</script>
<style>
.elmenu{
    width:100%;
    height: 80px;
}

.listavatar{
    position: relative;
    left: 120vh;
}
.shoppingCar{
    position: relative;
    left: 130vh;
}
.elmenu >el-menu-item {
    padding-left: 5px;
}
</style>