<template>
  <div>
    <el-card>
      <el-container>
        <el-header>
          <div>登录</div>
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
      let userObj = this.userList.find((obj) => {
        return obj.userName === this.formInner.userName;
      });
      if (userObj !== undefined) {
        if (userObj.userCode === this.formInner.userCode) {
          this.$message({ type: "success", message: "登录成功" });
          this.$router.replace('/home')
          this.$store.commit('setUserName', this.formInner.userName);
        } else {
          this.$message({ type: "error", message: "密码错误" });
           this.formInner.userCode = "";
        }
      } else {
        this.$message({ type: "error", message: "用户不存在" });
        this.formInner.userName = "";
        this.formInner.userCode = "";
      }
    },
  },
  mounted() {
    if (localStorage.getItem("Users") !== null) {
      let users = JSON.parse(localStorage.getItem("Users"));
      this.userList = [...users];
    }
  },
  destroyed(){
      this.userList = []
  }
};
</script>

<style>
</style>