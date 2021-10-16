<template>
  <div class="main">
    <div class="content">
      <nav-list></nav-list>
      <carousel></carousel>
      <el-breadcrumb separator=">">
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
              <p>用户名:{{ userName|| defaults.name}}</p>
              <p>性别:{{ userSex || defaults.sex}}</p>
              <p>年龄:{{ userAge || defaults.age}}</p>
              <span>
               爱好：
                <el-tag
                  v-for="tag in Tags"
                  :key="tag.name"
                  closable
                  :type="tag.type"
                >
                  {{ tag.name }}
                </el-tag>
              </span>
            <br>
            <el-divider></el-divider>
              <span>
                <el-button type="warning" size="mini">更改账号信息</el-button>
              </span>
            </el-card>
          </el-card>
        </el-col>
        <el-col :span="4"><user-detail></user-detail></el-col>
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
import ps from 'pubsub-js'
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
    setUserDetail() {},
  },
  mounted() {
    if (localStorage.getItem("Users") !== null) {
      let users = JSON.parse(localStorage.getItem("Users"));
      this.userName = users[0].userName;
    }
    ps.subscribe('userInfo',(_,data)=>{
      this.userName = data.name;
      this.sex = data.sex
      this.age = data.age;
      this.avatarUrl = data.avatarUrl;
    })
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
