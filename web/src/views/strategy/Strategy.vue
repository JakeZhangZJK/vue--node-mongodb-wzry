<template>
  <div>
    <scroll
      class="scroll"
      :probe-type="3"
      scroll-x
      click
      pullUpLoad
      ref="strategyScroll"
      @pullingUp="pullingUp"
    >
      <!-- 轮播图 -->
      <swiper class="swiper" v-if="adList" :options="swiperOption" ref="swiper">
        <swiper-slide v-for="(item,i) in adList.items" :key="i">
          <img class="w100 h100" :src="item.img" alt />
        </swiper-slide>
        <div :class="{move:isPaginationMove}" class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <!-- 热门视频 -->
      <card
        :title-margin="false"
        :data="hotVideos"
        title-border
        title="热门视频"
        :nav="false"
        class="hot-video mt15"
        bold
      >
        <i class="card-icon-l" slot="icon-l"></i>
        <ul class="hot-video-r clearfix" slot="icon-r">
          <li
            v-for="(item, i) in hotVideos"
            :key="i"
            :class="{'border-p': timesChoiceIndex===i,'fc-p': timesChoiceIndex===i}"
            @click="timesChoice(i)"
          >{{item.name}}</li>
        </ul>
        <div slot="content">
          <swiper
            :options="{autoHeight: true}"
            ref="hotVideosSwiper"
            @slide-change="() => {timesChoiceIndex = $refs.hotVideosSwiper.swiper.realIndex}"
          >
            <swiper-slide v-for="item in hotVideos" :key="item._id">
              <ul :style="{height: isShowMoreHotVideo?'':'6.16rem'}" class="hotVideo-list">
                <li v-for="(hotVideo, i) in item.data" :key="hotVideo._id">
                  <a :href="hotVideo.url" v-if="i === 0" class="first clearfix">
                    <div class="hot-video-pic l">
                      <i></i>
                      <img :src="hotVideo.img" />
                    </div>
                    <div class="hot-video-info r">
                      <p class="fs13 fc-3 t-ellipsis-2">{{(i+1)+'.'+hotVideo.title}}</p>
                      <div class="fs12 pt7">
                        <span class="v-num">
                          <i></i>
                          {{hotVideo.play_volume | playVolume }}
                        </span>
                        <span class="v-time">
                          <i></i>
                          {{hotVideo.time}}
                        </span>
                      </div>
                    </div>
                  </a>
                  <a :href="hotVideo.url" v-else class="second clearfix">
                    <p class="fs13 fc-3 l">{{(i+1)+'.'+hotVideo.title}}</p>
                    <div class="v-num fs12 r">
                      <i></i>
                      <span>{{hotVideo.play_volume | playVolume}}</span>
                    </div>
                  </a>
                </li>
              </ul>
              <div
                class="more-hotlist"
                @click="()=>{isShowMoreHotVideo = !isShowMoreHotVideo}"
              >{{isShowMoreHotVideo?'收起榜单':'查看完整榜单'}}</div>
            </swiper-slide>
          </swiper>
        </div>
      </card>
      <!-- 英雄攻略 -->
      <card title-border title="英雄攻略" :nav="false" class="hero-strategy mt15" bold>
        <i class="card-icon-l" slot="icon-l"></i>
        <div slot="content">
          <!-- 英雄列表 -->
          <div style="position:relative">
            <ul class="hero-intr clearfix" v-if="strategyHeros">
              <li
                class="l"
                :style="currentHero===i?{'border-color': '#db9e3f'}:{}"
                v-for="(item, i) in strategyHeros"
                :key="item._id"
                @click="heroClick(item._id, i)"
              >
                <div>
                  <img :src="item.avatar" />
                </div>
                <span>{{ i | heroType}}</span>
              </li>
              <li class="l" @click="moreHeros">{{isMoreHeros?'收起':'展开'}}</li>
            </ul>
            <!-- 下拉英雄列表 -->
            <div class="hero-dropdown" v-show="isMoreHeros" v-if="heroList">
              <scroll
                :probe-type="2"
                click
                stop-propagation
                class="herolist"
                @scroll="heroListScroll"
                ref="heroListScroll"
              >
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
          </div>

          <div class="hero-intr-location" v-if="heroStrategyInfo">
            <p class="l">
              <span>{{heroStrategyInfo.name}}</span>
              <span>{{heroStrategyInfo.cate[0].name}}</span>
              <span>登场排名 {{heroStrategyInfo.appearance_rank}}</span>
              <span>胜率排名 {{heroStrategyInfo.win_rate_rank}}</span>
            </p>
            <span class="r">查看英雄详细介绍></span>
          </div>

          <div v-if="heroStrategies">
            <!-- 英雄攻略视频 -->
            <ul class="hero-strategy-video d-flex f-wrap jc-between">
              <li v-for="item in heroStrategies.videos" :key="item._id">
                <a :href="item.url">
                  <div>
                    <i class="play-btn"></i>
                    <i class="time">{{item.time}}</i>
                    <img :src="item.img" />
                  </div>
                  <p class="t-ellipsis fs13">{{item.title}}</p>
                  <span>
                    <i></i>
                    {{item.play_volume | playVolume}}
                  </span>
                </a>
              </li>
            </ul>
            <!-- 英雄图文攻略 -->
            <ul class="hero-intr-list">
              <li class="clearfix" v-for="item in heroStrategies.graphics" :key="item._id">
                <a :href="item.url">
                  <img class="l" :src="item.img" />
                  <div class="r">
                    <p class="t-ellipsis fs15 fc-3">{{item.title}}</p>
                    <p class="t-ellipsis pt5 pb12 fc-7">{{item.title}}</p>
                    <p class="fc-7">刚刚</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="load-more t-center fc-7"
          slot="bottom"
          @click="()=>{$router.push('/more_strategies')}"
        >
          加载更多
          <span class="fc-p">"后羿"</span>攻略内容
        </div>
      </card>
      <!-- 精品栏目 -->
      <card
        auto
        :data="boutiqueSection"
        title-border
        title="精品栏目"
        class="boutique-section mt15"
        bold
        @cardNavClick="(i,navTitle)=>{boutiqueSectionTitle=navTitle}"
      >
        <i class="card-icon-l" slot="icon-l"></i>
        <template slot-scope="scope">
          <ul class="video-list">
            <li class="video" v-for="item in scope.item.video_list" :key="item._id">
              <a :href="item.url" class="fc-9">
                <img :src="item.img" />
                <p class="fc-2">{{item.title}}</p>
                <div class="v-info">
                  <span class="v-num">
                    <i></i>
                    {{item.play_volume | playVolume}}
                  </span>
                  <span class="v-time">{{item.createdAt | date}}</span>
                </div>
              </a>
            </li>
          </ul>
        </template>
        <div
          class="load-more t-center fc-7"
          slot="bottom"
          @click="()=>{$router.push('/more_strategies')}"
        >
          加载更多
          <span class="fc-p">{{boutiqueSectionTitle}}</span>内容
        </div>
      </card>
      <!-- 赛事精品 -->
      <card
        :data="raceOutique"
        auto
        title-border
        title="赛事精品"
        class="race-outique mt15"
        bold
        @cardNavClick="(i,navTitle)=>{raceOutiqueTitle=navTitle}"
      >
        <i class="card-icon-l" slot="icon-l"></i>
        <template slot-scope="scope">
          <ul class="video-list">
            <li class="video" v-for="item in scope.item.video_list" :key="item._id">
              <a :href="item.url" class="fc-9">
                <img :src="item.img" />
                <p class="fc-2">{{item.title}}</p>
                <div class="v-info">
                  <span class="v-num">
                    <i></i>
                    {{item.play_volume | playVolume}}
                  </span>
                  <span class="v-time">{{item.createdAt | date}}</span>
                </div>
              </a>
            </li>
          </ul>
        </template>
        <div
          class="load-more t-center fc-7"
          slot="bottom"
          @click="()=>{$router.push('/more_strategies')}"
        >
          加载更多
          <span class="fc-p">{{raceOutiqueTitle}}</span>内容
        </div>
      </card>
      <!-- 精彩视频 -->
      <card
        :data="videos"
        title-border
        title="精彩视频"
        class="videos mt15"
        bold
        @cardNavClick="(i,navTitle)=>{videoTitle=navTitle}"
      >
        <i class="card-icon-l" slot="icon-l"></i>
        <template slot-scope="scope">
          <ul class="video-list">
            <li class="video" v-for="item in scope.item.video_list" :key="item._id">
              <a :href="item.url" class="fc-9">
                <img :src="item.img" />
                <p class="fc-2">{{item.title}}</p>
                <div class="v-info">
                  <span class="v-num">
                    <i></i>
                    {{item.play_volume | playVolume}}
                  </span>
                  <span class="v-time">{{item.createdAt | date}}</span>
                </div>
              </a>
            </li>
          </ul>
        </template>
        <div
          class="load-more t-center fc-7"
          slot="bottom"
          @click="()=>{$router.push('/more_strategies')}"
        >
          加载更多
          <span class="fc-p">{{videoTitle}}</span>内容
        </div>
      </card>
      <!-- 图文攻略 -->
      <card
        :data="graphics"
        title-border
        title="图文攻略"
        class="graphics mt15"
        bold
        @cardNavClick="graphicCardNavClick"
      >
        <i class="card-icon-l" slot="icon-l"></i>
        <template slot-scope="scope">
          <ul class="graphic-list">
            <li class="graphic" v-for="(item, i) in scope.item.graphic_list" :key="i">
              <a class="clearfix" :href="item.url">
                <img :src="item.img" />
                <div class="graphic-content">
                  <h5 class="t-ellipsis fs15 fc-2">{{item.title}}</h5>
                  <p class="fc-6">{{item.title}}</p>
                  <span class="fc-9">{{item.createdAt | date}}</span>
                </div>
              </a>
            </li>
            <li
              class="fc-9 t-center"
              style="height:1.4rem;line-height:1.4rem"
              @click="seeMore"
            >{{pageNum===3 || isSeeMore?"点击查看更多":"上拉加载更多"}}</li>
          </ul>
        </template>
      </card>
    </scroll>
  </div>
</template>
 
<script>
import { getAds, getHotvideos, getBoutiqueSection, getStrategyHeros, getHeroStrategies, getRaceOutique, getVideos, getGraphics } from 'network/strategy'
import { getHeroList } from 'network/common'

import dayjs from 'dayjs'
import { debounce } from "../../utils/utils"

import Card from 'components/content/Card'
import Scroll from 'components/common/scroll/Scroll'

export default {
  name: "Strategy",
  components: {
    Card,
    Scroll
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination'
        }
      },
      scrollX: false,
      adList: null,
      hotVideos: [],
      timesChoiceIndex: 0,
      isShowMoreHotVideo: false,
      // 精品栏目数据
      boutiqueSection: [],
      strategyHeros: null,
      heroStrategies: null,
      heroStrategyInfo: null,
      // 是否收起展开
      isMoreHeros: false,
      heroList: null,
      currentHeroType: 0,
      currentHero: '',
      // 赛事精品数据
      raceOutique: [],
      // 精彩视频数据
      videos: [],
      // 图文攻略数据
      graphics: [],
      // 上拉加载参数
      pageNum: 1,
      currentGraphic: 0,
      isSeeMore: false,
      boutiqueSectionTitle: "最新",
      raceOutiqueTitle: "最新",
      videoTitle: "王者时刻",
      // 滚动防抖函数
      heroListScrollDebounce: null,
      isPaginationMove: false
    }
  },
  computed: {
    scroll() {
      return this.$refs.strategyScroll
    },
    currentHeroList() {
      return this.heroList ? this.heroList[this.currentHeroType].hero_list : []
    }
  },
  filters: {
    playVolume(val) {
      return val.length >= 5 ? parseFloat(val / 10000).toFixed(1) + '万' : val
    },
    heroType(i) {
      return i + 1 <= 3 ? '热门' : i + 1 >= 3 && i + 1 <= 5 ? '限免' : '最新'
    },
    date(val) {
      return dayjs(val).format('MM-DD')
    }
  },
  methods: {
    async getAds() {
      const res = await getAds()
      if (!res) return
      this.adList = res.data[1]
      // console.log(res.data);
    },
    async getHotvideos() {
      const res = await getHotvideos()
      if (!res) return
      this.hotVideos = res.data
      // console.log(res.data)
    },
    async getBoutiqueSection() {
      const res = await getBoutiqueSection()
      if (!res) return
      this.boutiqueSection = res.data
      // console.log(res.data);

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
    async getHeroList() {
      const res = await getHeroList()
      if (!res) return
      this.heroList = res.data
      // console.log(res.data)
    },
    async getRaceOutique() {
      const res = await getRaceOutique()
      if (!res) return
      this.raceOutique = res.data
      // console.log(res.data);
    },
    async getVideos() {
      const res = await getVideos()
      if (!res) return
      this.videos = res.data
      // console.log(res.data);
    },
    async getGraphics() {
      const res = await getGraphics()
      if (!res) return
      this.graphics = res.data
      // console.log(res.data);
    },
    timesChoice(i) {
      this.$refs.hotVideosSwiper.swiper.slideTo(i)
      this.timesChoiceIndex = i
      this.isShowMoreHotVideo = false
    },
    // 收起展开
    moreHeros() {
      this.isMoreHeros = !this.isMoreHeros
    },
    heroTypeClick(i) {
      this.currentHeroType = i
      this.$refs.heroListScroll.refresh()
    },
    heroClick(id, i) {
      this.getHeroStrategies(id)
      this.isMoreHeros = false
      this.currentHero = i
    },
    seeMore() {
      if (this.pageNum === 3) return this.$router.push('/more_strategies')
    },
    graphicCardNavClick(i) {
      this.currentGraphic = i
      if (this.graphics[this.currentGraphic].graphic_list.length > 8) {
        this.pageNum = 3
        this.isSeeMore = false
      } else if (this.graphics[this.currentGraphic].graphic_list.length <= 8 && this.graphics[this.currentGraphic].graphic_list.length > 4) {
        this.pageNum = 2
        this.isSeeMore = false
        this.scroll.finishPullUp()
      } else {
        this.pageNum = 1
        this.isSeeMore = false
        this.scroll.finishPullUp()
      }
    },
    // 上拉加载
    async pullingUp() {
      this.scroll.refresh()
      if (this.pageNum === 3) return
      const res = await getGraphics({
        id: this.graphics && this.graphics[this.currentGraphic]._id,
        pageNum: this.pageNum
      })
      // 如果拿到结果则让页数＋1，并重启下拉加载事件
      // 如果服务器出现错误，则重启下拉加载事件
      // 如果没有更多数据或页数等于3时，则终止下拉加载
      if (!res) return this.scroll.finishPullUp()
      if (res.data.length === 0) return this.isSeeMore = true

      this.graphics[this.currentGraphic].graphic_list.push(...res.data)
      this.scroll.refresh()
      this.scroll.finishPullUp()

      this.pageNum++
    },
    heroListScroll() {
      this.heroListScrollDebounce()
    }
  },
  created() {
    this.getAds()
    this.getHotvideos()
    this.getBoutiqueSection()
    this.getStrategyHeros()
    this.getHeroList()
    this.getRaceOutique()
    this.getVideos()
    this.getGraphics()
  },
  mounted() {
    const timer = setTimeout(() => {
      this.isPaginationMove = true
      clearTimeout(timer)
    }, 1000)
    this.scroll.refresh()
    this.scrollX = true
    this.heroListScrollDebounce = debounce(() => {
      this.$refs.heroListScroll && this.$refs.heroListScroll.scroll.refresh()
    }, 10)
  },
  activated() {
    this.$refs.swiper && this.$refs.swiper.swiper.autoplay.start()
    this.scroll.refresh()
  },
  deactivated() {
    this.$refs.swiper && this.$refs.swiper.swiper.autoplay.stop()
  }
}
</script>
 
<style lang="scss" scoped>
@import "~assets/css/_varible.scss";
.scroll {
  height: calc(100vh - 3.48rem);
  overflow: hidden;
}

.swiper {
  height: 6.76rem;
  margin-top: 0.6rem;
}

//轮播图分页按钮
.swiper-pagination {
  width: 100%;
  text-align: right;
  padding-right: 0.2rem;
  bottom: 0;
  transition: all 0.5s;
  transition-delay: 2s;
}

.move {
  bottom: 15px !important;
}

.card-icon-l {
  display: inline-block;
  position: absolute;
  top: 0.6rem;
  background: url("~assets/img/strategy/sprite.png") no-repeat 0 0.12rem;
  background-size: 3.52rem 3.12rem;
  width: 0.8rem;
  height: 0.8rem;
}

.hero-strategy {
  .card-icon-l {
    background-position: -0.96rem 0.12rem;
  }
  .hero-intr {
    margin: 0 -0.12rem;
    padding: 0.4rem 0;
    li {
      position: relative;
      width: 1.7rem;
      height: 1.7rem;
      margin-right: 0.32rem;
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
    margin: 0 -0.6rem;
    padding: 0 0.5rem;
    background-color: #f4f4f4;
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
  .hero-strategy-video {
    margin: 0.6rem -0.32rem 0;
    padding-bottom: 0.2rem;
    border-bottom: 0.04rem solid #e9ecee;
    li {
      width: 50%;
      padding: 0 0.19rem;
      a {
        display: block;
        width: 100%;
        height: 100%;
        div {
          position: relative;
          .play-btn {
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
          .time {
            position: absolute;
            right: 0;
            bottom: 0;
            padding: 0 0.2rem;
            text-align: center;
            line-height: 0.72rem;
            height: 0.72rem;
            color: #fff;
            background-color: #000;
          }
          img {
            width: 100%;
            height: 4.096rem;
            border-radius: 0.08rem;
            vertical-align: middle;
          }
        }
        p {
          padding: 0.4rem 0;
          color: #343440;
        }
        span {
          i {
            display: inline-block;
            background: url("~assets/img/strategy/sprite.png") no-repeat 0 -1.64rem;
            background-size: 3.52rem 3.12rem;
            width: 0.56rem;
            height: 0.48rem;
          }
          color: #7a7a80;
        }
      }
    }
  }
  .hero-intr-list {
    margin: 0 -0.12rem;
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
  .hero-dropdown {
    position: absolute;
    display: flex;
    z-index: 1;
    top: 2.32rem;
    width: 102%;
    left: -1%;
    height: 11.76rem;
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
}

.hot-video {
  .hot-video-r {
    float: right;
    padding-top: 0.08rem;
    font-size: 0.52rem;
    li {
      float: left;
      margin-left: 0.66rem;
      border-bottom: 0.08rem solid transparent;
    }
  }
  .hotVideo-list {
    overflow: hidden;
    li {
      padding: 0.36rem 0;
      border-bottom: 0.04rem solid #e9ecee;
      a {
        display: block;
        width: 100%;
        height: 100%;
      }
      &:first-child {
        .first {
          .hot-video-pic {
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
          .hot-video-info {
            width: 8.76rem;
            p {
              height: 1.6rem;
            }
            span {
              color: #7a7a80;
            }
          }
        }
      }
      &:last-child {
        border-color: transparent;
      }

      .second {
        p {
          width: 80%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        div {
          i {
            display: inline-block;
            background: url("~assets/img/strategy/sprite.png") no-repeat 0 -1.64rem;
            background-size: 3.52rem 3.12rem;
            width: 0.56rem;
            height: 0.48rem;
          }
          span {
            color: #7a7a80;
          }
        }
      }
    }
  }
  .more-hotlist {
    height: 1.34rem;
    border-top: 0.04rem solid #f6f6f6;
    text-align: center;
    line-height: 1.34rem;
    color: #7a7a80;
  }
}

.boutique-section {
  .card-icon-l {
    background-position: -1.96rem 0.12rem;
  }
}

.race-outique {
  .card-icon-l {
    background-position: -3rem 0.12rem;
  }
}

.graphics {
  .card-icon-l {
    background-position: 0 -0.72rem;
  }
}

// 公共部分
.video-list {
  margin: 0 -0.1rem;
  display: flex;
  flex-wrap: wrap;
  .video {
    width: 50%;
    padding: 0 0.1rem;
    margin-bottom: 0.5rem;
    a {
      display: block;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 3.8rem;
        border-radius: 0.08rem;
        vertical-align: middle;
      }
      p {
        width: 99%;
        height: 1.52rem;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 0.52rem;
        margin-top: 0.36rem;
      }
      .v-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1rem;
      }
    }
  }
}

.graphic-list {
  li:nth-last-child(2) {
    a {
      border-bottom: 0.04rem solid #f9f9f9;
    }
  }

  .graphic {
    margin-bottom: 0.4rem;
    &:last-child a {
      border: 0;
    }
    a {
      display: block;
      width: 100%;
      padding-bottom: 0.2rem;
      border-bottom: 0.04rem solid #e9ecee;
      img {
        float: left;
        width: 4.64rem;
        height: 2.8rem;
        margin-right: 0.4rem;
      }
      .graphic-content {
        float: left;
        width: 7.6rem;
        height: 3rem;
        p {
          height: 1.48rem;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
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

.load-more {
  height: 1.34rem;
  margin: 0.32rem -0.6rem 0;
  border-top: 0.04rem solid #f6f6f6;
  line-height: 1.34rem;
}
</style>