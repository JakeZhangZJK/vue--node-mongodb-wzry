<template>
  <div id="top-bar" class="d-flex ai-center" style="padding:0 0.68rem" :style="background">
    <slot name="left">
      <div class="logo mr10"></div>
    </slot>
    <slot name="center">
      <div class="fc-w flex1">
        <div class="fs13" style="line-height:0.6rem;padding-top:0.2rem">王者荣耀</div>
        <div class="fs12 fc-6">团队成就更多</div>
      </div>
    </slot>
    <slot name="right">
      <div class="download"></div>
    </slot>
  </div>
</template>
 
<script>
export default {
  name: "TopBar",
  computed: {
    background() {
      if (this.$store.state.isChangeTopBarBg) {
        return {
          'background': `url(${require('../../assets/img/article/hd.jpg')})`,
          'background-size': ' 15rem 1.8rem'
        }
      } else {
        return {}
      }
    }
  }
}
</script>
 
<style lang="scss" scoped>
$url: "~assets/img/sprite/index.png";

#top-bar {
  position: relative;
  z-index: 9;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 15rem;
  height: 1.8rem;
  background: url($url) no-repeat 0 87.195%;
  background-size: 15rem 18.2rem;

  // .logo {
  //   background: url($url) no-repeat 0 72.588% / 15rem 18.2rem;
  //   width: 1.2rem;
  //   height: 1.2rem;
  // }

  .logo {
    background: url($url) no-repeat 0 -12.32rem;
    background-size: 15rem;
    width: 1.2rem;
    height: 1.2rem;
  }

  .download {
    background: url($url) no-repeat 18.73% 71.694% / 15rem 18.2rem;
    width: 2.4rem;
    height: 0.96rem;
  }
}
</style>