<!---->
<template>
  <div>
    <div class="out-box">
      <div class="inner-box">
        <div class="topbar bg-black py-2 px-3 d-flex ai-center">
          <img src="../assets/logo.png" alt="logo" height="30">
          <div class="px-2 flex-1">
            <div class="text-white ">王者荣耀</div>
            <div class="text-grey-1 fs-xxs">团队成就更多</div>
          </div>
          <button class="btn bg-primary text-dark">立即下载</button>
        </div>
        <div class="bg-primary pt-3 pb-2">
          <div class="nav nav-inverse pb-1 jc-around">
            <div class="nav-item active">
              <router-link class="nav-link" tag="div" to="/">首页</router-link>
            </div>
            <div class="nav-item">
              <router-link class="nav-link" tag="div" to="/">攻略中心</router-link>
            </div>
            <div class="nav-item">
              <router-link class="nav-link" tag="div" to="/">赛事中心</router-link>
            </div>
          </div>
        </div>
        <router-view />
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .topbar {
    position: sticky; // 吸顶效果
    top: 0;
    z-index: 999;
  }

  .inner-box {
    -ms-overflow-style: none;  // IE 10+
    scrollbar-width: none;

  }
   .inner-box::-webkit-scrollbar {
        display: none;
    }

  // .inner-box {
  //   overflow-x: hidden;
  //   overflow-y: scroll;
  // }
</style>