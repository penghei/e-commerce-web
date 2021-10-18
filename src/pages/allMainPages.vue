<template>
  <div>
    <nav-list></nav-list>
    <carousel></carousel>
    <router-view></router-view>
  </div>
</template>

<script>
import Carousel from '../components/Home/carousel.vue'
import navList from '../components/Home/navList.vue'
// import NavList from '../components/Home/navList.vue'

export default {
  components: { navList, Carousel },
  
  name:'allMainPages',
}
</script>

<style>

</style>
