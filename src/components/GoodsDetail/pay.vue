<template>
  <div class="main" >
    <el-steps space="500px" :active="activeNum" finish-status="success" :align-center="true">
      <el-step title="选择商品"></el-step>
      <el-step title="进行中:填写地址"></el-step>
      <el-step title="支付"></el-step>
    </el-steps>
    <el-card style="text-align:center"
      ><el-result icon="success" title="成功!" v-if="ifPay"> </el-result>
      <el-result icon="info" title="请等待支付完成" v-else></el-result>
      <el-button type="danger" @click=" dialogFormVisible = true">输入密码</el-button>
      <el-button type="danger" @click="routeTo">返回首页</el-button>
    </el-card>
    <el-dialog title="支付" :visible.sync="dialogFormVisible">
      <el-input v-model="payCode" placeholder="请输入支付密码" type="number" @input="examineCode" ref="input"></el-input>
      <div slot="footer" class="dialog-footer">
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "pay",
  data() {
    return {
      payCode: '',
      dialogFormVisible: false,
      activeNum: 2,
      ifPay:false
    };
  },
  methods: {
    handleConfirm() {
      if(this.payCode === ''){
        this.$message({
          type:'error',
          message:'输入不能为空'
        })
      }
      this.dialogFormVisible = false;
      this.activeNum = 3;
      this.ifPay = true
    },
    routeTo(){
        this.$router.push('/home')
    },
    examineCode(){
      let len = this.payCode.length;
      if(len >= 6){
        this.$refs.input.blur();
        this.handleConfirm();
      }
    }
  },
  mounted() {
    
    this.dialogFormVisible = true;
  },
};
</script>

<style></style>
