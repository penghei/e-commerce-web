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
          <el-radio v-model="sex" label="男">男</el-radio>
          <el-radio v-model="sex" label="女">女</el-radio>
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
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="finishEdit">完成</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "userDetail",
  props:['setUserDetail'],
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
      let reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = ()=>{
        let pic = {
          picBase:reader.result
        }
        axios
          .post('/api/avatar',pic)
          .then(res=>{
            if(res.data === 'success'){
              this.imageUrl = reader.result
            }
          })
          .catch(err=>{console.log(err)})
      }
    },
    finishEdit() {
      let userInfo = {
        name: this.userNameMade,
        age: this.age.toString(),
        sex: this.sex,
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
      axios
        .post('/api/changeUserInfo',userInfo)
        .then(res=>{
          if(res.data==='success'){
            this.dialogVisible = false;
            this.$message({
              type:"success",
              message:"变更成功"
            })
          }else{
            this.$message({
              type:"error",
              message:"变更失败"
            })
          }
        })
        .catch(err=>console.log(err))
      this.setUserDetail();
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

</style>
