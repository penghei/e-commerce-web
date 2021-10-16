<template>
  <div>
      <goods-block></goods-block>
      <commits></commits>
  </div>
</template>

<script>
import Commits from '../../components/GoodsDetail/commits.vue'
import goodsBlock from '../../components/GoodsDetail/goodsBlock.vue'
export default {
  components: { goodsBlock, Commits },
    name:'goodsCommit',
    data() {
      return {
      };
    },
    methods:{

    },
    mounted(){
    }
}
</script>

<style>

</style>