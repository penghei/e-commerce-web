<template>
  <div>
    <el-row>
      <el-col :span="13" class="hiddener">a</el-col>
      <el-col :span="8">
        <el-tabs type="border-card" class="loginContent">
          <el-tab-pane label="登录">
            <sign-in></sign-in>
          </el-tab-pane>
          <el-tab-pane label="注册">
            <register></register>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="3" class="hiddener">a</el-col>
    </el-row>
  </div>
</template>

<script>
import signIn from "../components/Login/TheSignIn.vue";
import register from "../components/Login/TheRegister.vue";
export default {
  name: "Login",
  components: { signIn, register },
  data() {
    return {};
  },
};
</script>

<style>
body,html{
  margin: 0;
  padding: 0;
}
.hiddener{
    visibility: hidden;
}
.loginContent{
    position: relative;
    top:10vh;
    min-width: 300px; 
}
#tab-0{
  text-align: center;
  width: 140px;
}
#tab-1{
 text-align: center;
  width: 140px;
}
</style>