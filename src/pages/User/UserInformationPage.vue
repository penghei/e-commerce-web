<template>
  <div class="main">
    <div class="content">
      <el-breadcrumb separator=">" style="font-size:large">
        <el-breadcrumb-item :to="{ path: '/home' }" replace
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item style="font-weight:bloder"
          >个人信息</el-breadcrumb-item
        >
      </el-breadcrumb>
      <el-row>
        <el-col :span="4" style="visibility:hidden">
          a
        </el-col>
        <el-col :span="16">
          <el-card>
            <div class="useravatar">
              <img :src="avatarUrl" style="width:300px"/>
            </div>
            <el-card shadow="hover" class="userDetail">
              <p>用户名:{{ userName }}</p>
              <p>性别:{{ userSex }}</p>
              <p>年龄:{{ userAge }}</p>
              <span>
                爱好：
                <el-tag v-for="tag in Tags" :key="tag.name" :type="tag.type">
                  {{ tag.name }}
                </el-tag>
              </span>
              <br />
              <el-divider></el-divider>
              <div class="btns">
                <user-account></user-account>
                <user-detail :setUserDetail="setUserDetail"></user-detail>
                <div>
                  <el-button
                    type="danger"
                    @click="quitAccount"
                    style="width:40%;margin-top:10px"
                    >退出登录</el-button
                  >
                </div>
              </div>
            </el-card>
          </el-card>
        </el-col>
        <el-col :span="4"></el-col>
      </el-row>
    </div>
    <div class="footer">
      <myFooter></myFooter>
    </div>
  </div>
</template>

<script>
import userDetail from "../../components/User/ChangeUserDetail.vue";

import myFooter from "../../components/Basic/Basefooter.vue";

// import ps from 'pubsub-js'
import axios from "axios";
import UserAccount from "../../components/User/ChangeUserAccount.vue";
// import Pubsub from "pubsub-js"
export default {
  components: { userDetail, myFooter, UserAccount },
  data() {
    return {
      userName: "",
      userSex: "",
      userAge: "",
      avatarUrl: "",
      Tags: [
        { name: "吃饭", type: "success" },
        { name: "睡觉", type: "waring" },
        { name: "敲代码", type: "danger" },
      ],
      defaults: {
        name: "星野",
        sex: "男",
        age: "19",
      },
    };
  },
  methods: {
    setUserDetail() {
      console.log(1);
      axios
        .get("/api/userInfo")
        .then((res) => {
          let userObj = res.data;
          this.userName = userObj.account.name;
          this.userSex = userObj.privacy.sex || "未设置";
          this.userAge = userObj.privacy.age || "未设置";
          this.avatarUrl = userObj.privacy.avatar
        })
        .catch((err) => {
          console.log(err);
        });
    },
    quitAccount() {
      axios
        .get("/api/quit")
        .then((res) => {
          if (res.data === "notfound") {
            this.$message({
              type: "error",
              message: "登录异常,多个账号同时在线",
            });
          } else {
            this.$router.push("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeAccount() {},
  },
  mounted() {
    
    this.setUserDetail();
  },
};
</script>

<style scoped>
.useravatar {
  text-align: center;
}
.userDetail {
  color: orange;
  font-weight: 100;
  font-size: 20px;
}
.btns {
  display: flex;
  flex-direction: column;
  text-align: center;
  
}
</style>
