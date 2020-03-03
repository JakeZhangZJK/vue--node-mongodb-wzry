<template>
    <div>
      <van-sticky>
       <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
        <img src="../assets/logo.png" alt="logo" height="30">
        <div class="px-2 flex-1">
          <span>王者荣耀</span>
          <span class="ml-3">攻略站</span>
        </div>
        <router-link to="/" tag="div" class="text-white fs-sm">更多英雄 &gt;</router-link>
      </div>
        </van-sticky>
    </div>
</template>
<script>
export default {
  
    data() {
      return{}
    },
    methods:{}
}
</script>
<style scoped>

</style>