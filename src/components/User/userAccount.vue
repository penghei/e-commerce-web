<template>
  <div class="accountChange">
    <el-button type="warning" size="mini" @click="dialog1 = true" 
      >更改账号信息</el-button
    >
    <el-dialog :visible.sync="dialog1" width="60vh">
      <el-tabs type="border-card">
        <el-tab-pane label="更改登录密码">
          <el-form>
            <el-form-item label="请输入旧密码">
              <el-input v-model="form.oldcode"></el-input>
            </el-form-item>
            <el-form-item label="更改密码">
              <el-input v-model="form.newcode"></el-input>
            </el-form-item>
            <el-form-item label="确认更改密码">
              <el-input v-model="form.concode"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="changeCode">确定</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="更改支付密码">
          <el-form>
            <el-form-item label="请输入旧密码">
              <el-input v-model="form.oldpaycode"></el-input>
            </el-form-item>
            <el-form-item label="更改支付密码">
              <el-input v-model="form.newpaycode"></el-input>
            </el-form-item>
            <el-form-item label="确认支付密码">
              <el-input v-model="form.conpaycode"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="changePayCode">确定</el-button>
            </el-form-item>
            <el-dialog :visible.sync="dialog3" width="20vh">
              <el-form label-position="top">
                <el-form-item label="设置支付密码">
                  <el-input
                    v-model="settedPayCode"
                    @input="monitorPayCode"
                    type="number"
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-dialog>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="查看余额与充值">
          <el-button type="danger" @click="getMoney">查看余额</el-button
          ><el-button type="danger" @click="dialog2 = true">充值</el-button>
         <div ref="moneyDis" style="color:green;font-size:30px;font-weight:bold;text-align:center"></div>
          <el-dialog :visible.sync="dialog2" width="20vh">
            <el-form label-position="top">
              <el-form-item label="输入充值金额">
                <el-input
                  v-model="upMoney"
                  type="number"
                  @change="topUp"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-dialog>
          <span></span>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "userAccount",
  data() {
    return {
      dialog1: false,
      dialog2: false,
      dialog3: false,
      form: {
        oldcode: "",
        newcode: "",
        concode: "",
        oldpaycode: "",
        newpaycode: "",
        conpaycode: "",
        money: "",
      },
      upMoney: 0,
      ifChangeCode: false,
      ifPayCode: false,
      ifMoney: false,
      settedPayCode: "",
    };
  },
  methods: {
    changeCode() {
      let oc = this.form.oldcode;
      let nc = this.form.newcode;
      let cc = this.form.concode;
      if (nc !== cc) {
        this.$message({
          type: "warning",
          message: "两次密码不一致",
        });
        return;
      } else {
        axios.get("/api/userCode").then((res) => {
          if (res.data === "nouser") {
            this.$message("未找到用户");
          } else if (res.data === "nofound") {
            this.$message("未找到密码");
          } else {
            let account = res.data;
            if (oc !== account.code) {
              this.$message({
                type: "error",
                message: "旧密码错误!",
              });
              return;
            } else {
              axios
                .post("/api/changeCode", { code: nc, type: "accountCode" })
                .then((res) => {
                  if (res.data === "success") {
                    this.$message({
                      type: "success",
                      message: "修改成功",
                    });
                    this.dialog1 = false;
                    this.form.oldcode = "";
                    this.form.newcode = "";
                    this.form.concode = "";
                  }
                });
            }
          }
        });
      }
    },
    changePayCode() {
      let oc = this.form.oldpaycode;
      let nc = this.form.newpaycode;
      let cc = this.form.conpaycode;
      if (nc !== cc) {
        this.$message({
          type: "warning",
          message: "两次密码不一致",
        });
        return;
      } else {
        axios.get("/api/userCode").then((res) => {
          if (res.data === "nouser") {
            this.$message("未找到用户");
          } else if (res.data === "nofound") {
            this.$message("未找到密码");
          } else {
            let account = res.data;
            if (oc !== account.payCode) {
              this.$message({
                type: "error",
                message: "旧密码错误!",
              });
              return;
            } else {
              axios
                .post("/api/changeCode", { code: nc, type: "payCode" })
                .then((res) => {
                  if (res.data === "success") {
                    this.$message({
                      type: "success",
                      message: "修改成功",
                    });
                    this.dialog1 = false;
                    this.form.oldpaycode = "";
                    this.form.newpaycode = "";
                    this.form.conpaycode = "";
                  }
                });
            }
          }
        });
      }
    },
    getMoney() {
      axios
        .get("/api/userCode")
        .then((res) => {
          this.form.money = res.data.money;
          this.$refs.moneyDis.innerHTML = `￥${this.form.money}`
        })
        .catch((err) => console.log(err));
    },
    topUp() {
      this.dialog2 = true
      axios
        .post("/api/changeCode", { code: this.upMoney, type: 3 })
        .then((res) => {
          if (res.data !== "notfound") {
            this.$message({
              type: "success",
              message: "充值成功!",
            });
            this.dialog1 = false;
            this.form.oldcode = "";
            this.form.newcode = "";
            this.form.concode = "";
          }
        })
        .catch((err) => console.log(err));
    },
    setPayCode() {
      let paycode = this.settedPayCode.toString();
      axios
        .post("/api/changeCode", { type: 2, code: paycode })
        .then((res) => {
          if (res.data === "success") {
            this.$message({ type: "success", message: "设置成功" });
          }
          this.dialog3 = false;
        })
        .catch((err) => console.log(err));
    },
    monitorPayCode() {
      if (this.settedPayCode.toString().length === 6) {
        this.setPayCode();
      }
    },
  },
  mounted() {
    axios.get("/api/userCode").then((res) => {
      if (res.data.payCode === "") {
        this.$message({
          type: "warning",
          message: "还未设置支付密码",
        });
        this.dialog3 = true;
      }
    });
  },
};
</script>

<style></style>
