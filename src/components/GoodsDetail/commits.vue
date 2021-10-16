<template>
  <div>
    <div class="inner">
      <h2>写下你的评论吧:</h2>
      <div class="rate" align="center">
        <span ref="ratelabel">打个分吧</span>
        <el-rate v-model="rateValue" @change="rateLabelChange"></el-rate>
      </div>
      <div style="float:left;width:84%">
        <el-input
          placeholder="写下你的评论吧:"
          v-model="commitValue"
          clearable
        />
      </div>
      <div>
        <el-button type="danger" @click="getCommitValue">发送评论</el-button>
      </div>
      <br />
      <div v-for="commit in commitList" :key="commit.id">
        <el-card shadow="always" v-if="IfEmpty">
          <el-row>
            <el-col :span="6">
              <el-image :src="commit.pic" fit="fill"></el-image>
            </el-col>
            <el-col :span="18">
              <br />
              <h3>{{ username || temUserName }}</h3>
              <div>{{ commit.value }}</div>
            </el-col>
          </el-row>
        </el-card>
      </div>
      <el-empty description="这里空空的哟" v-show="!IfEmpty"></el-empty>
    </div>
  </div>
</template>

<script>
import uuid from "uuidjs";
export default {
  name: "commits",
  data() {
    return {
      username: "",
      temUserName: "",
      rateValue: 0,
      commitValue: "",
      IfEmpty: true,
      commitList: [
        
      ],
    };
  },
  methods: {
    getCommitValue() {
      if (this.commitValue === "") {
        this.$message({ type: "warning", message: "输入不能为空哦" });
        return;
      }
      let commitObj = {
        pic:
          this.$store.state.useravatarUrl ||
          "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        value: this.commitValue,
        id: uuid.generate(),
      };
      this.commitValue = "";
      this.commitList.push(commitObj);
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
        this.$message({
          type: "success",
          message: "评论成功",
        });
        this.IfEmpty = true;
      }, 500);
    },
    getIfEmpty() {},
    rateLabelChange() {
      switch (this.rateValue) {
        case 1:
          this.$refs.ratelabel.innerHTML = "这么差劲吗┭┮﹏┭┮";
          break;
        case 2:
          this.$refs.ratelabel.innerHTML = "看来还是不太满意哦";
          break;
        case 3:
          this.$refs.ratelabel.innerHTML = "还有提升空间";
          break;
        case 4:
          this.$refs.ratelabel.innerHTML = "很棒的宝贝啦";
          break;
        case 5:
          this.$refs.ratelabel.innerHTML = "哇，绝世珍宝，我的需要";
          break;
        default:
          break;
      }
    },
  },
  mounted() {
    if (localStorage.getItem("commits") !== null) {
      let gettedCommits = JSON.parse(localStorage.getItem("commits"))
      let tempObj = gettedCommits.find(obj=>{
        return obj.goodsName === this.$store.state.selectedGoods.name
      })
      if(tempObj !== undefined){
        this.commitList = tempObj.commits;
      }
      
    }
    if (this.commitList.length === 0) this.IfEmpty = false;
    else this.IfEmpty = true;
    this.username = this.$store.state.username;
    this.temUserName = JSON.parse(localStorage.getItem("Users"))[0].userName;
  },
  destroyed() {
    let commits = {
      commits: this.commitList,
      goodsName: this.$store.state.selectedGoods.name,
    };
    let oldCommits = JSON.parse(localStorage.getItem("commits")) || [];
    if(oldCommits.length !== 0){
      let addObj = oldCommits.find(obj=>{
        return obj.goodsName === this.$store.state.selectedGoods.name;
      })
      if(addObj !== undefined){
        addObj.commits = [...this.commitList];
      }else{
        oldCommits.push(commits);
      }
    }else{
      oldCommits.push(commits);
    }
    localStorage.setItem("commits", JSON.stringify(oldCommits));
  },
};
</script>

<style scoped>
.inner {
  margin-top: 10vh;
}
.inner h3 {
  color: orange;
  font-weight: 100;
  font-size: 20px;
  margin: 0;
}
</style>
