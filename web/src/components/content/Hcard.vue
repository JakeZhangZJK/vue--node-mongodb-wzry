<template>
  <div class="clearfix card bgc-w" :class="{padding}">
    <!-- 标题 -->
    <div v-if="title" :class="{padding: !padding}">
      <div class="title p15-0" :class="{'title-border': titleBorder, 'mb12': titleMargin}">
        <slot name="icon-l"></slot>
        <span class="pl20 fs16" :class="{bold}">{{title}}</span>
        <slot name="icon-r"></slot>
        <slot name="img"></slot>
      </div>
    </div>
    <!-- 导航栏 -->
    <slot name="nav"></slot>
    <div
      v-if="data.length!==0 && nav"
      class="card-nav-bar fc-2 mb15"
      :class="{'nav-border': navBorder,'nav-margin':!padding, 'd-flex': !auto, 'jc-around': !auto, 'auto': auto}"
    >
      <div class="nav-item fs13" v-for="(item,i) in data" :key="i" @click="navClick(i,item.name)">
        <span :class="{ active: currentIndex === i }">{{item.name?item.name:item}}</span>
      </div>
    </div>
    <slot name="content"></slot>
    <swiper
      v-if="data.length!==0"
      :options="swiperOption"
      ref="mySwiper"
      @slide-change="slideChange"
    >
      <swiper-slide style="padding:0 0.0082rem" v-for="(item, i) in data" :key="i">
        <slot :item="item"></slot>
      </swiper-slide>
    </swiper>
    <slot name="bottom"></slot>
  </div>
</template>
 
<script>
export default {
  name: "Card",
  data() {
    return {
      swiperOption: {
        autoHeight: true
      },
      currentIndex: 0,
      currentTitle: "最新"
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default() {
        return []
      }
    },
    nav: {
      type: Boolean,
      default: true
    },
    titleBorder: {
      type: Boolean,
      default: false
    },
    navBorder: {
      type: Boolean,
      default: false
    },
    auto: {
      type: Boolean,
      default: false
    },
     around: {
      type: Boolean,
      default: true
    },
    bold: {
      type: Boolean,
      default: false
    },
    padding: {
      type: Boolean,
      default: true
    },
    titleMargin: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    navClick(i, navTitle) {
      this.$refs.mySwiper.swiper.slideTo(i)
      this.currentTitle = navTitle
      this.$emit('cardNavClick', this.currentIndex, this.currentTitle)
    },
    slideChange() {
      this.currentIndex = this.$refs.mySwiper.swiper.realIndex
      this.currentTitle = this.data[this.currentIndex] && this.data[this.currentIndex].name
      this.$emit('cardNavClick', this.currentIndex, this.currentTitle)
    }
  }
}
</script>
 
<style lang="scss" scoped>
.nav-margin {
  margin: 0 0  0.2308rem 0;
}
.padding {
  padding-left: 0.6rem;
  padding-right: 0.6rem;
}
.card {
  width: 100%;
  border-bottom: 0.04rem solid #d4d9de;
  .title {
    position: relative;
    font-size: 0.64rem;
  }
  .title-border {
    border-bottom: 0.04rem solid #e9ecee;
  }
  .card-nav-bar {
    width: 100%;
    height: 0.96rem;
    line-height: 0.96rem;
    &.auto {
      overflow-x: auto;
      overflow-y: hidden;
      white-space: nowrap;
      .nav-item {
        display: inline-block;
        margin-right: 0.72rem;
      }
    }

    &.nav-border {
      padding-bottom: 1.2rem;
      border-bottom: 0.04rem solid #d4d9de;
    }
    .nav-item {
      vertical-align: middle;
    }
    .active {
      padding-bottom: 0.04rem;
      border-bottom: 0.12rem solid;
      color: #db9e3f;
    }
  }
}
</style>