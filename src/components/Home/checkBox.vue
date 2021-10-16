<template>
  <div>
    <el-card class="box-card">
      <span>价格选择</span>
      <el-radio-group v-model="radio" @change="getradio">
        <el-radio :label="1">0-500</el-radio>
        <el-radio :label="2">500-1000</el-radio>
        <el-radio :label="3">1000-1500</el-radio>
        <el-radio :label="4">1500-3000</el-radio>
        <el-radio :label="5">>3000</el-radio>
      </el-radio-group>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "checkBox",
  data() {
    return {
      radio: 1,
    };
  },
  methods:{   
      getradio(){
        this.$store.commit('setCheck', this.radio);
      }
  }
};
</script>

<style>
.box-card{
    width: 60%;
    min-width: 15vh;
}
.el-radio{
    width: 100%;
    padding-top: 5px;
    padding-right:auto ;
}
</style>