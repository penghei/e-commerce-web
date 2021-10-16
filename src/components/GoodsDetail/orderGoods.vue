<template>
  <div>
    <el-button type="danger" @click="dialogVisible = true">确认商品</el-button>
    <el-dialog
      title="确认商品"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div>
        <el-row>
          <el-col :span="12">
            <div>
              <img :src="Goods.picUrl || Goods.pic" style="height:100px" />
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <p>名称：{{Goods.name}}</p>
              <p>价格：{{Goods.price}}</p>
              <p>数量：{{Goods.number}}</p>
            </div>
          </el-col>
        </el-row>
      </div>

      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "orderGoods",
  props:['Goods'],
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    handleClose() {},
  },
};
</script>

<style></style>
