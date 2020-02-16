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
            <div class="nav-item" :class="{active: active === i}" v-for="(item,i) in tabs" :key="i" @click="$refs.list.swiper.slideTo(i)">
            <div class="nav-link">{{item}}</div>
          </div>
          </div>
        </div>
        <swiper ref="list"
      @slide-change="() => active = $refs.list.swiper.realIndex">
          <swiper-slide>
            <!-- 首页 -->
            <Home></Home>
          </swiper-slide>
          <swiper-slide>
            <!-- 攻略中心 -->
            <Raiders></Raiders>
          </swiper-slide>
          <swiper-slide>
            <!-- 赛事中心 -->
            <Match></Match>
          </swiper-slide>
        </swiper>
      </div>
    </div>

  </div>
</template>
<script>
import Home from './Home'
import Raiders from './Raiders'
import Match from './Match'
  export default {
    data() {
      return {
        tabs:['首页','攻略中心','赛事中心'],
        active:0
      }
    },
    components:{
      Home,
      Raiders,
      Match



    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  

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