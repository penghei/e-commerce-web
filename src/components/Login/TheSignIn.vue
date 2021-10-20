<template>
  <div class="loginMain">
    <el-card>
      <el-container>
        <el-header style="text-align:center;header:150px;line-head:150px">
          <div><p>登录</p></div>
        </el-header>
        <el-main>
          <el-form label-position="top" label-width="50px" :model="formInner">
            <el-form-item label="用户名">
              <el-input v-model="formInner.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="formInner.userCode"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getSignIn">登录</el-button>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "signIn",
  data() {
    return {
      formInner: {
        userName: "",
        userCode: "",
      },
      userList: [],
    };
  },
  methods: {
    getSignIn() {
      // let userObj = this.userList.find((obj) => {
      //   return obj.userName === this.formInner.userName;
      // });
      // if (userObj !== undefined) {
      //   if (userObj.userCode === this.formInner.userCode) {
      //     this.$message({ type: "success", message: "登录成功" });

      //     this.$router.replace("/home");
      //     this.$store.commit("setUserName", this.formInner.userName);
      //   } else {
      //     this.$message({ type: "error", message: "密码错误" });
      //     this.formInner.userCode = "";
      //   }
      // } else {
      //   this.$message({ type: "error", message: "用户不存在" });
      //   this.formInner.userName = "";
      //   this.formInner.userCode = "";
      // }
      let userInfo = {
        account: {
          name: this.formInner.userName,
          code: this.formInner.userCode,
        },
      };
      axios
        .post("/api/signin", userInfo)
        .then((res) => {
          switch (res.data) {
            case "notfound":
              this.$message({ type: "error", message: "用户不存在" });
              break;
            case "codewrong":
              this.$message({ type: "error", message: "密码错误" });
              break;
            case "success":
              this.$message({ type: "success", message: "登录成功" });
              this.$router.replace("/home");
              break;
            default:
              break;
          }
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    // if (localStorage.getItem("Users") !== null) {
    //   let users = JSON.parse(localStorage.getItem("Users"));
    //   this.userList = [...users];
    // }
    axios
      .get('/api/quit')
      
  },
  destroyed() {
    this.userList = [];
    axios
      .get('/api/userInfo')
      .then(res=>{
        let userInfo = res.data;
        console.log(userInfo)
        let shoppingCar = userInfo.shopping.shoppingCar;
        this.$store.commit('allPushShoppingCar',shoppingCar);
      })
      .catch(err=>{
        console.log(err)
        this.$message({
          type:"error",
          message:`登录异常`
        })
      })
  },
};
</script>

<style>
.loginMain {
  max-height: 65vh;
}
.loginMain > div {
  color: orange;
  font-size: 25px;
  font-weight: 700;
}
</style>
