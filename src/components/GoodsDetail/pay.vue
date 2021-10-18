<template>
  <div class="main">
    <el-steps
      space="500px"
      :active="activeNum"
      finish-status="success"
      :align-center="true"
    >
      <el-step title="选择商品"></el-step>
      <el-step title="进行中:填写地址"></el-step>
      <el-step title="支付"></el-step>
    </el-steps>
    <el-card style="text-align:center"
      ><el-result icon="success" title="成功!" v-if="ifPay"> </el-result>
      <el-result icon="info" title="请等待支付完成" v-show="ifPaying"></el-result
      ><el-result
        icon="error"
        title="余额不足"
        description="请前往用户中心>更改账号信息>查看余额充值"
        v-show="ifPayFail"
      ></el-result>
      <el-button type="danger" @click="dialogFormVisible = true" v-show="ifPaying"
        >输入密码</el-button
      >
      <el-button type="danger" @click="routeTo">返回首页</el-button>
    </el-card>
    <el-dialog title="支付" :visible.sync="dialogFormVisible" width="20vh">
      <el-input
        v-model="payCode"
        placeholder="请输入支付密码"
        type="number"
        @input="examineCode"
        ref="input"
      ></el-input>
      <div slot="footer" class="dialog-footer"></div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "pay",
  data() {
    return {
      payCode: "",
      dialogFormVisible: false,
      activeNum: 2,
      ifPay: false,
      ifPaying:true,
      ifPayFail: false,
      money: 0,
      userpayCode: "",
      selectedGoods: {},
    };
  },
  methods: {
    handleConfirm() {
      this.selectedGoods = this.$store.state.selectedGoods;
      let price = this.selectedGoods.price;
      console.log(price);
      if (this.payCode === "") {
        this.$message({
          type: "error",
          message: "输入不能为空",
        });
      }
      if (this.userpayCode !== this.payCode) {
        this.$message({
          type: "error",
          message: "密码错误,请重新输入",
        });
        this.payCode = "";
        return;
      } else if (price > this.money) {
        this.$message({
          type: "error",
          message: "余额不足,请充值",
        });
        this.dialogFormVisible = false;
        this.ifPay = false
        this.ifPaying = false
        this.ifPayFail = true;
      } else {
        axios.post("/api/changeCode", { type: 3, code: -price }).then((res) => {
          if (res.data === "success") {
            this.dialogFormVisible = false;
            this.activeNum = 3;
            this.ifPaying = false
            this.ifPay = true;
          }
        });
      }
    },
    routeTo() {
      this.$router.push("/home");
    },
    examineCode() {
      let len = this.payCode.length;
      if (len >= 6) {
        this.$refs.input.blur();
        this.handleConfirm();
      }
    },
  },
  mounted() {
    this.dialogFormVisible = true;
    axios.get("/api/userCode").then((res) => {
      if (res.data !== "notfound" || res.data !== "nouser") {
        this.userpayCode = res.data.payCode;
        this.money = res.data.money;
      }
    });
  },
  destroyed() {
    this.$store.commit("emptySelectedGoods");
  },
};
</script>

<style></style>
