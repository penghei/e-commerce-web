<template>
  <div class="registerMain">
    <el-card>
      <el-container>
        <el-header style="text-align:center;header:150px;line-head:150px">
          <div><p>注册</p></div>
        </el-header>
        <el-main>
          <el-form label-position="top" label-width="50px" :model="formInner">
            <el-form-item label="用户名">
              <el-input v-model="formInner.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="formInner.userCode"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input v-model="formInner.userCodeConfirm"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getRegister">注册</el-button>
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
  name: "register",
  data() {
    return {
      formInner: {
        userName: "",
        userCode: "",
        userCodeConfirm: "",
      },
      userList: [],
    };
  },
  methods: {
    getRegister() {
      // let userFound = this.userList.find((obj) => {
      //   return obj.userName === this.formInner.userName;
      // });
      // if (userFound !== undefined) {
      //   this.$message("用户名已存在,请直接登录");
      //   this.formInner.userName = "";
      //   this.formInner.userCode = "";
      //   this.formInner.userCodeConfirm = "";
      // } else {
      //   if (this.formInner.userCode !== this.formInner.userCodeConfirm) {
      //     this.$message({ type: "error", message: "两次密码不一致" });
      //     this.formInner.userCodeConfirm = "";
      //     return;
      //   }
      //   let userObj = {
      //     userName: this.formInner.userName,
      //     userCode: this.formInner.userCode,
      //   };
      //   this.userList.push(userObj);
      //   localStorage.setItem("Users", JSON.stringify(this.userList));
      // }
      if(this.formInner.userCode !== this.formInner.userCodeConfirm){
         this.$message({ type: "error", message: "两次密码不一致" });
          this.formInner.userCodeConfirm = "";
          return;
      }
      let userInfo = {
        account: {
          name: this.formInner.userName,
          code: this.formInner.userCode,
        },
        privacy:{
          sex:'',
          age:'',
          avatar:'',
          hobby:[]
        },
        shopping:{
          shoppingCar:[],
          money:100,
          payCode:''
        },
        isOnline:false
      };
      axios
      .post("/api/register", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data === "success") {
          this.$message({ type: "success", message: "注册成功,请登录" });
          // this.$router.replace("/home");
        }else if(res.data === 'registered'){
          this.$message({ type: "error", message: "用户名已被注册" });
        }else{
          return;
        }
      })
      .catch(err=>{
        this.$message({ type: "error", message: `失败,原因为:${err}` });
      })
    },
  },
  mounted() {
    if (localStorage.getItem("Users") !== null) {
      let users = JSON.parse(localStorage.getItem("Users"));
      this.userList = [...users];
    }
  },
  destroyed() {
    this.userList = [];
  },
};
</script>

<style>
.registerMain {
  max-height: 70vh;
}
.registerMain > div {
  color: orange;
  font-size: 25px;
  font-weight: 700;
}
</style>
