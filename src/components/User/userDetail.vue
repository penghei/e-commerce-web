<template>
  <div class="edit">
    <el-button
      type="danger"
      @click="dialogVisible = true"
      class="editBtn"
      size="large"
      >编辑信息</el-button
    >
    <el-dialog title="编辑个人信息" :visible.sync="dialogVisible">
      <el-form>
        <el-form-item label="编辑昵称">
          <el-input v-model="userNameMade" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="sex" label="man">男</el-radio>
          <el-radio v-model="sex" label="woman">女</el-radio>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number
            v-model="age"
            :min="1"
            :max="100"
            size="small"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-button type="danger">确定更换</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="finishEdit">完成</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ps from "pubsub-js";
export default {
  name: "userDetail",
  data() {
    return {
      dialogVisible: false,
      userNameMade: "",
      sex: "",
      age: 18,
      imageUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      console.log(file);
    },
    finishEdit() {
      
      let userInfo = {
        name: this.userNameMade,
        age: this.age,
        sex: this.sex,
        avatarUrl: this.imageUrl,
      };
      if (userInfo.name === "") {
        this.$message({
          type: "error",
          message: "名字未输入",
        });
        return;
      } else if (userInfo.sex === "") {
        this.$message({
          type: "error",
          message: "性别未选择",
        });
        return;
      }
      this.dialogVisible = false;
      ps.publish("userInfo", userInfo);
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.editBtn {
  height: 20vh;
}
</style>
