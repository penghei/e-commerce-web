<template>
  <div class="main">
    <div class="content">
      <nav-list></nav-list>
      <carousel></carousel>
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
              <img
                :src="avatarUrl"
              />
            </div>
            <el-card shadow="hover" class="userDetail">
              <p>用户名:{{ userName}}</p>
              <p>性别:{{ userSex}}</p>
              <p>年龄:{{ userAge}}</p>
              <span>
               爱好：
                <el-tag
                  v-for="tag in Tags"
                  :key="tag.name"
                  :type="tag.type"
                >
                  {{ tag.name }}
                </el-tag>
              </span>
            <br>
            <el-divider></el-divider>
              <span>
                <el-button type="warning" size="mini" @click="changeAccount">更改账号信息</el-button>
              </span>
            </el-card>
          </el-card>
        </el-col>
        <el-col :span="4"><user-detail :setUserDetail="setUserDetail"></user-detail><br/><el-button type="danger" @click="quitAccount">退出登录</el-button></el-col>
      </el-row>
    </div>
    <div class="footer">
      <myFooter></myFooter>
    </div>
  </div>
</template>

<script>
import userDetail from "../../components/User/userDetail.vue";
import Carousel from "../../components/Home/carousel.vue";
import myFooter from "../../components/Home/footer.vue";
import NavList from "../../components/Home/navList.vue";
// import ps from 'pubsub-js'
import axios from 'axios';
// import Pubsub from "pubsub-js"
export default {
  components: { userDetail, NavList, Carousel, myFooter },
  data() {
    return {
      userName: "",
      userSex: "",
      userAge:"",
      avatarUrl:'',
      Tags: [
        {name:"吃饭",type:"success"},
        {name:"睡觉",type:"waring"},
        {name:"敲代码",type:"danger"}
      ],
      defaults:{
        name:'星野',
        sex:'男',
        age:'19'
      }
    };
  },
  methods: {
    setUserDetail() {
      console.log(1)
      axios
        .get('/api/userInfo')
        .then(res=>{
          let userObj = res.data;
          this.userName = userObj.account.name;
          this.userSex = userObj.privacy.sex || '未设置'
          this.userAge = userObj.privacy.age || '未设置'

        })
        .catch(err=>{
          console.log(err)
        })
    },
    quitAccount(){
      axios
        .get('/api/quit')
        .then(res=>{
          if(res.data === 'notfound'){
            this.$message({type:"error",message:"登录异常,多个账号同时在线"})
          }else{
            this.$router.push('/login')
          }
        })
        .catch(err=>{
          console.log(err)
        })
      
    },
    changeAccount(){

    }
  },
  mounted() {
    // if (localStorage.getItem("Users") !== null) {
    //   let users = JSON.parse(localStorage.getItem("Users"));
    //   this.userName = users[0].userName;
    // }
    // ps.subscribe('userInfo',(_,data)=>{
    //   this.userName = data.name;
    //   this.sex = data.sex
    //   this.age = data.age;
    //   this.avatarUrl = data.avatarUrl;
    // })
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
</style>
