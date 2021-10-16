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
import signIn from "../components/Login/signIn.vue";
import register from "../components/Login/register.vue";
export default {
  name: "Login",
  components: { signIn, register },
  data() {
    return {};
  },
};
</script>

<style>
.hiddener{
    visibility: hidden;
}
.loginContent{
    position: relative;
    top:20vh;
}
</style>