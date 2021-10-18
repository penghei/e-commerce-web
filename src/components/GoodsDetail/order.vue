<template>
  <div>
    <el-steps
      :space="500"
      :active="1"
      finish-status="success"
      :align-center="ifCenter"
    >
      <el-step title="选择商品"></el-step>
      <el-step title="进行中:填写地址"></el-step>
      <el-step title="支付"></el-step>
    </el-steps>
    <el-row>
      <el-col :span="6" style="visibility:hidden">a</el-col>
      <el-col :span="12">
        <order-goods :Goods="selectedGoods"></order-goods>
        <el-form label-position="top">
          <el-form-item label="地址">
            <cascader></cascader>
          </el-form-item>
          <el-form-item label="电话号码">
            <el-input
              clearable
              v-model="form.phone"
              @change="exam1"
              @blur="exam1"
              @focus="exam2"
              @clear="exam2"
            ></el-input>
            <p ref="solt"></p>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="routeTo">下一步</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6" style="visibility:hidden"></el-col>
    </el-row>
  </div>
</template>

<script>
import Pubsub from "pubsub-js";
import cascader from "./cascader.vue";
import OrderGoods from "./orderGoods.vue";
export default {
  components: { cascader, OrderGoods },
  name: "order",
  data() {
    return {
      form: {
        region: "",
        phone: "",
      },
      ifPass: false,
      ifCenter: true,
      selectedGoods: {},
    };
  },
  methods: {
    routeTo() {
      if(this.form.phone === '' ){
        this.$message({
          type:'error',
          message:'手机号不能为空'
        })
        return;
      }else if(this.$store.state.cascaderValue.length === 0){
        this.$message({
          type:'error',
          message:'地址不能为空'
        })
        return;
      }else if(!this.ifPass){
         this.$message({
          type:'error',
          message:'填写有错误'
        })
        return;
      }
      this.$router.push("/home/goodsdetail/parchase");
    },
    exam1() {
      let num = this.form.phone;
      console.log(typeof Number(num));
      if (typeof Number(num) !== "number") {
        console.log(1);
        this.$refs.solt.innerHTML = "电话号码不符合规范";
      } else if (num.toString().length !== 11 && num.toString().length !== 8) {
        this.$refs.solt.innerHTML = "电话号码不符合规范";
      } else {
        console.log(3);
        this.$refs.solt.innerHTML =
          '<i class="el-icon-check" style="color:green;font-size:40px;margin:0;padding:0"></i>';
        this.ifPass = true
      }
    },
    exam2() {
      this.$refs.solt.innerHTML = "";
    },
  },
  mounted() {
    if (this.$store.state.selectedGoods !== {}) {
      this.selectedGoods = { ...this.$store.state.selectedGoods };
    }
    Pubsub.subscribe("goodsFromCar", (_, data) => {
      console.log(data)
      this.selectedGoods = data;
    });
  },
  destroyed() {
    
    this.$store.commit("emptyCascaderValue");
  },
};
</script>

<style></style>
