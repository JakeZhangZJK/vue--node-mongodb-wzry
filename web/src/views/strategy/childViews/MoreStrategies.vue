<template>
  <div>
    <div class="nav">
      <ul class="d-flex jc-between">
        <li
          class="flex1 t-center fs13"
          v-for="(item, i) in moreStrategies"
          :key="item._id"
          @click="navClick(i)"
        >
          <span
            :style="currentNavIndex===i?{'border-color':'#d59b40',color:'#d59b40'}:{}"
          >{{item.name}}</span>
        </li>
      </ul>
    </div>
    <swiper :options="{autoHeight: true}" ref="swiper">
      <swiper-slide
        @touchstart.native="touchstart"
        @touchend.native="ontouchend"
        :class="isNoSwiping?'swiper-no-swiping':''"
        v-for="(item,i) in moreStrategies"
        :key="item._id"
      >
        <!-- 英雄攻略 -->
        <div style="position:relative;" v-if="item.heros">
          <!-- 英雄列表 -->
          <ul class="hero-intr clearfix">
            <li
              class="l"
              :style="currentHero===i?{'border-color': '#db9e3f'}:{}"
              v-for="(item, i) in item.heros"
              :key="item._id"
              @click="heroClick(item._id, i)"
            >
              <div>
                <img :src="item.avatar" />
              </div>
              <span>{{i | heroType}}</span>
            </li>
            <li class="l" @click="moreHeros">{{true?'收起':'展开'}}</li>
          </ul>
          <div class="hero-intr-location" v-if="heroStrategyInfo">
            <p class="l">
              <span>{{heroStrategyInfo.name}}</span>
              <span>{{heroStrategyInfo.cate[0].name}}</span>
              <span>登场排名 {{heroStrategyInfo.appearance_rank}}</span>
              <span>胜率排名 {{heroStrategyInfo.win_rate_rank}}</span>
            </p>
            <span class="r">查看英雄详细介绍></span>
          </div>
          <!-- 下拉英雄列表 -->
          <div class="hero-dropdown" v-show="isMoreHeros" v-if="heroList">
            <scroll :probe-type="2" click stop-propagation class="herolist" ref="heroListScroll">
              <ul class="clearfix">
                <li
                  class="l t-center"
                  v-for="item in currentHeroList"
                  :key="item._id"
                  @click="heroClick(item._id)"
                >
                  <img :src="item.avatar" />
                  <span>{{item.name}}</span>
                </li>
              </ul>
            </scroll>
            <ul class="hero_type">
              <li
                class="t-center"
                :style="currentHeroType===i?{'background-color': '#db9e3f', 'color': '#fff'}:{}"
                v-for="(item, i) in heroList"
                :key="item._id"
                @click="heroTypeClick(i)"
              >{{item.name}}</li>
            </ul>
          </div>
          <!-- 英雄攻略 -->
          <div style="background-color:#fff" v-if="heroStrategies">
            <ul class="hero-intr-list">
              <li class="clearfix" v-for="item in heroStrategies.graphics" :key="item._id">
                <a :href="item.url">
                  <img class="l" :src="item.img" />
                  <div class="r">
                    <p class="t-ellipsis fs15 fc-3">{{item.title}}</p>
                    <p class="fc-7">刚刚</p>
                  </div>
                </a>
              </li>
              <li class="clearfix" v-for="item in heroStrategies.videos" :key="item._id">
                <a :href="item.url">
                  <img class="l" :src="item.img" />
                  <div class="r">
                    <p class="t-ellipsis fs15 fc-3">{{item.title}}</p>
                    <p class="fc-7">刚刚</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- 其他 -->
        <div v-if="item.children">
          <div class="sub-nav">
            <ul class="d-flex fc-7">
              <li
                :style="activeSubCates(subIndex)?{color:'#d59b40'}:{}"
                v-for="(subCates,subIndex) in item.children"
                :key="subCates._id"
                @click="subCatesClick(subIndex)"
              >{{subCates.name}}</li>
            </ul>
          </div>
          <swiper :options="{autoHeight: true}" :ref="'subSwiper'+i" @slide-change="slideChange">
            <swiper-slide v-for="(subCates, i) in item.children" :key="i">
              <ul class="strategy-list">
                <!-- <li v-for="(item, i) in subCates.strategy_list" :key="i">{{item.title}}</li> -->
                <li v-for="item in subCates.strategy_list" :key="item._id">
                  <a :href="item.url" class="clearfix">
                    <div class="strategy-pic l">
                      <i></i>
                      <img :src="item.img" />
                    </div>
                    <div class="strategy-info r">
                      <p class="fs13 fc-3 t-ellipsis-2">{{item.title}}</p>
                      <div class="fs12 pt7">
                        <span class="v-num">
                          <i></i>
                          {{item.play_volume | playVolume }}
                        </span>
                        <span class="v-time">
                          <i></i>
                          {{item.time}}
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </swiper-slide>
          </swiper>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
 
<script>
import { getMore, getStrategyHeros, getHeroStrategies } from "network/strategy"
import { getHeroList } from 'network/common'
import Scroll from 'components/common/scroll/Scroll'

export default {
  name: "MoreStrategies",
  data() {
    return {
      moreStrategies: null,
      isNoSwiping: false,
      currentNavIndex: 0,
      isMoreHeros: false,
      heroList: null,
      currentHeroType: 0,
      strategyHeros: null,
      heroStrategyInfo: null,
      heroStrategies: null,
      // 当前的英雄
      currentHero: '',
      // 当前精品栏目
      currentBoutiqueSection: 0,
      // 当前赛事精品
      currentRaceOutique: 0,
      // 当前精彩视频
      currentVideos: 0,
      // 当前图文攻略
      graphics: 0
    }
  },
  filters: {
    heroType(i) {
      return i + 1 <= 3 ? '热门' : i + 1 >= 3 && i + 1 <= 5 ? '限免' : '最新'
    },
    playVolume(val) {
      return (val + '').length >= 5 ? parseFloat(val / 10000).toFixed(1) + '万' : val
    },
  },
  computed: {
    currentHeroList() {
      return this.heroList ? this.heroList[this.currentHeroType].hero_list : []
    }
  },
  components: {
    Scroll
  },
  methods: {
    activeSubCates(i) {
      if (this.currentNavIndex === 1) return this.currentBoutiqueSection === i
      if (this.currentNavIndex === 2) return this.currentRaceOutique === i
      if (this.currentNavIndex === 3) return this.currentVideos === i
      if (this.currentNavIndex === 4) return this.graphics === i
    },
    async getMore() {
      const res = await getMore()
      if (!res) return
      this.moreStrategies = res.data
      console.log(res.data);
    },
    async getHeroList() {
      const res = await getHeroList()
      if (!res) return
      this.heroList = res.data
      // console.log(res.data)
    },
    async getStrategyHeros() {
      const res = await getStrategyHeros()
      if (!res) return
      this.strategyHeros = res.data
      this.getHeroStrategies(this.strategyHeros[0]._id)
      // console.log(res.data);
    },
    async getHeroStrategies(id) {
      const res = await getHeroStrategies(id)
      if (!res) return
      if (res.data.videos.length === 0) return this.heroStrategyInfo = res.data
      this.heroStrategyInfo = res.data
      this.heroStrategies = res.data
      // console.log(res.data);
    },
    touchstart() {
      this.isNoSwiping = true
    },
    ontouchend() {
      this.isNoSwiping = false
    },
    navClick(i) {
      this.currentNavIndex = i
      this.$refs.swiper.swiper.slideTo(i)
    },
    moreHeros() {
      this.isMoreHeros = !this.isMoreHeros
    },
    heroClick(id, i) {
      this.getHeroStrategies(id)
      this.isMoreHeros = false
      this.currentHero = i
    },
    heroTypeClick(i) {
      this.currentHeroType = i
      // console.log(this.$refs.heroListScroll.refresh);
      this.$refs.heroListScroll[0].refresh()
    },
    subCatesClick(i) {
      if (this.currentNavIndex === 1) {
        this.currentBoutiqueSection = i
        return this.$refs.subSwiper1[0].swiper.slideTo(i)
      }
      if (this.currentNavIndex === 2) {
        this.currentRaceOutique = i
        return this.$refs.subSwiper2[0].swiper.slideTo(i)
      }
      if (this.currentNavIndex === 3) {
        this.currentVideos = i
        return this.$refs.subSwiper3[0].swiper.slideTo(i)
      }
      if (this.currentNavIndex === 4) {
        this.graphics = i
        return this.$refs.subSwiper4[0].swiper.slideTo(i)
      }
    },
    slideChange() {
      if (this.currentNavIndex === 1) return this.currentBoutiqueSection = this.$refs.subSwiper1[0].swiper.realIndex
      if (this.currentNavIndex === 2) return this.currentRaceOutique = this.$refs.subSwiper2[0].swiper.realIndex
      if (this.currentNavIndex === 3) return this.currentVideos = this.$refs.subSwiper3[0].swiper.realIndex
      if (this.currentNavIndex === 4) return this.graphics = this.$refs.subSwiper4[0].swiper.realIndex
    }
  },
  created() {
    this.$store.commit('hideNavBbar')
    this.getMore()
    this.getHeroList()
    this.getStrategyHeros()
  }
}
</script>
 
 
<style lang="scss" scoped>
.nav {
  background-color: #fff;
  padding-bottom: 0.2rem;
  ul {
    height: 1.56rem;
    line-height: 1.32rem;
    span {
      padding-bottom: 0.08rem;
      border-bottom: 0.12rem solid transparent;
    }
  }
}

.sub-nav {
  height: 1.2rem;
  margin: 0 0.6rem;
  ul {
    margin-top: 0.2rem;
    overflow-x: auto;
    li {
      display: inline-block;
      background-color: #fff;
      border-radius: 0.08rem;
      white-space: nowrap;
      padding: 0.08rem 0.4rem 0.12rem;
      margin-right: 0.28rem;
    }
  }
}

.hero-intr {
  // margin: 0 12px;
  padding: 0.4rem 0.48rem;
  background-color: #fff;
  li {
    position: relative;
    width: 1.7rem;
    height: 1.7rem;
    margin-right: 0.34rem;
    border-radius: 0.2rem;
    border: 0.08rem solid transparent;
    overflow: hidden;
    &:last-child {
      margin-right: 0;
      text-align: center;
      line-height: 1.62rem;
      background-color: #f5f5f5;
      border: 0.02rem solid #ddd;
      color: #393939;
    }
    div {
      margin: -0.08rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.12rem;
      }
    }
    span {
      position: absolute;
      width: 96%;
      height: 0.52rem;
      left: 2%;
      bottom: 0;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.48);
      text-align: center;
      line-height: 0.52rem;
      border-radius: 0 0 0.12rem 0.12rem;
    }
  }
}

.hero-intr-location {
  height: 0.9rem;
  padding: 0 0.5rem;
  line-height: 0.9rem;
  color: #3a3939;
  p {
    span {
      padding: 0 0.12rem 0 0.2rem;
      border-right: 0.04rem solid #cfcfcf;
      &:last-child {
        border-right: 0;
      }
    }
  }
}

.hero-dropdown {
  position: absolute;
  display: flex;
  z-index: 1;
  top: 2.32rem;
  // width: 100%;
  height: 11.76rem;
  margin: 0 0.2rem;
  background-color: #fff;
  border: 0.04rem solid #e5e5e5;
  .herolist {
    flex: 1;
    height: 11.76rem;
    overflow-y: auto;
    // overflow: hidden;
    ul {
      width: 100%;
      padding-bottom: 0.6rem;
      li {
        width: 2.18rem;
        margin: 0.4rem 0 0 0.4rem;
        &:nth-child(4n) {
          margin-right: 0;
        }
        img {
          width: 100%;
        }
      }
    }
  }
  .hero_type {
    width: 3.12rem;
    height: 100%;
    li {
      width: 100%;
      height: 14.28%;
      background-color: #f5f5f5;
      line-height: 1.68rem;
    }
  }
}

.hero-intr-list {
  margin: 0 0.48rem;
  li {
    padding: 0.4rem 0;
    border-bottom: 0.04rem solid #e9ecee;
    &:last-child {
      border: 0;
    }
    a {
      display: block;
      width: 100%;
      height: 100%;
      img {
        width: 4.64rem;
        height: 2.82rem;
        border-radius: 0.08rem;
      }
      div {
        float: right;
        width: 8.96rem;
        height: 2.82rem;
      }
    }
  }
}

.strategy-list {
  padding: 0 0.48rem;
  background-color: #fff;
  overflow: hidden;
  li {
    padding: 0.36rem 0;
    border-bottom: 0.04rem solid #e9ecee;

    a {
      display: block;
      width: 100%;
      height: 100%;
    }
    .strategy-pic {
      position: relative;
      width: 4.78rem;
      height: 2.58rem;
      i {
        position: absolute;
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: url("~assets/img/strategy/sprite.png") no-repeat -0.76rem -1.48rem;
        background-size: 3.52rem 3.04rem;
      }
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.08rem;
      }
    }
    .strategy-info {
      width: 8.76rem;
      p {
        height: 1.6rem;
      }
      span {
        color: #7a7a80;
      }
    }
    &:last-child {
      border-color: transparent;
    }
  }
}

.v-num {
  i {
    display: inline-block;
    background: url("~assets/img/strategy/sprite.png") no-repeat 0 -1.64rem;
    background-size: 3.52rem 3.12rem;
    width: 0.56rem;
    height: 0.48rem;
  }
}

.v-time {
  i {
    display: inline-block;
    background: url("~assets/img/strategy/sprite.png") no-repeat -2.84rem -1.68rem;
    background-size: 3.52rem 3.12rem;
    width: 0.56rem;
    height: 0.48rem;
    margin-bottom: -0.04rem;
  }
}
</style>