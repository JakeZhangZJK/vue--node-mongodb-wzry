<template>
  <div>
    <scroll class="scroll" :probe-type="3" click pullUpLoad ref="homeScroll" @pullingUp="pullingUp">
      <!-- 轮播图 -->
      <swiper class="swiper" v-if="adList" :options="swiperOption" ref="swiper">
        <swiper-slide v-for="(item,i) in adList.items" :key="i">
          <a class="d-block w100 h100" :href="item.url">
            <img class="w100 h100" :src="item.img" alt />
          </a>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <!-- 入口 -->
      <div class="entry bgc-w m15-0 fc-2">
        <div :class="{'entry-hidden': !isEntry}" class="hidden-height d-flex f-wrap">
          <a class="entry-list" :href="item.url" v-for="(item,i) in spriteData" :key="i">
            <i :style="item.position"></i>
            <div class="fc-2">{{item.text}}</div>
          </a>
        </div>
        <div class="entry-btn t-center" @click="entryBtnClick">
          <i :class="{is_entry:!isEntry}"></i>
          <span class="fc-3">{{isEntry?'收起':'展开'}}</span>
        </div>
      </div>
      <!-- 新闻资讯 -->
      <card :data="newsList" titleBorder title="新闻资讯">
        <i class="card-icon-l" slot="icon-l"></i>
        <i class="card-icon-r" slot="icon-r"></i>
        <template slot-scope="scope">
          <a class="fs14 d-flex mb15" v-for="item in scope.item.news_list" :href="item.url" :key="item._id"
            @click="newsClick(item._id)">
            <span class="cate_name">[{{item.cate_name}}]</span>
            <span style="margin: 0 0.04rem">|</span>
            <span class="t-ellipsis flex1 pr8 fc-2">{{item.title}}</span>
            <!-- <span>{{item.updatedAt | date}}</span> -->
            <span class="fc-8">{{item.date}}</span>
          </a>
        </template>
      </card>
      <!-- 英雄列表 -->
      <card :data="heroList" titleBorder title="英雄列表" class="hero-list mt15">
        <i class="card-icon-l" slot="icon-l"></i>
        <i class="card-icon-r" slot="icon-r"></i>
        <div slot="img">
          <img class="w100 mt15" style="border-radius: 0.08rem" src="~assets/img/common/new_hero.jpg" alt />
        </div>
        <template slot-scope="scope">
          <ul class="clearfix pb15 pt5">
            <li class="hero" v-for="item in scope.item.hero_list" :key="item._id" @click="heroClick(item._id)">
              <div class="avatar-container">
                <img class="hero-avatar" :src="item.avatar" />
              </div>
              <h3 class="fs12 fc-2 mt5">{{item.name}}</h3>
            </li>
          </ul>
        </template>
      </card>
      <!-- 精彩视频 -->
      <card :data="videoList" titleBorder title="精彩视频" class="video-list mt15">
        <i class="card-icon-l" slot="icon-l"></i>
        <i class="card-icon-r" slot="icon-r"></i>
        <template slot-scope="scope">
          <ul class="video-container">
            <li class="video" v-for="item in scope.item.videos" :key="item._id">
              <a :href="item.url" class="fc-9">
                <img :src="item.img" />
                <p class="fc-2">{{item.title}}</p>
                <div class="v-info">
                  <span class="v-num">
                    <i></i>
                    {{item.play_volume}}
                  </span>
                  <span>{{item.createdAt | date }}</span>
                </div>
              </a>
            </li>
          </ul>
        </template>
        <div class="load-more fc-7 t-center" slot="bottom" @click="()=>{$router.push('/strategy')}">加载更多内容</div>
      </card>
      <!-- 图文攻略 -->
      <card :data="graphicList" titleBorder between title="图文攻略" class="graphic-list mt15" @cardNavClick="cardNavClick">
        <i class="card-icon-l" slot="icon-l"></i>
        <i class="card-icon-r" slot="icon-r"></i>
        <template slot-scope="scope">
          <ul class="graphic-container">
            <li class="graphic" v-for="item in scope.item.graphic_list" :key="item._id">
              <a class="clearfix" :href="item.url">
                <img :src="item.img" />
                <div class="graphic-content">
                  <h5 class="t-ellipsis fs15 fc-2">{{item.title}}</h5>
                  <p class="fc-6">{{item.title}}</p>
                  <span class="fc-9">{{item.createdAt | date}}</span>
                </div>
              </a>
            </li>
            <li class="fc-9 t-center" style="height:1.4rem;line-height:1.4rem" @click="seeMore">
              {{pageNum===3 || isSeeMore?"点击查看更多":"上拉加载更多"}}</li>
          </ul>
        </template>
      </card>
    </scroll>
  </div>
</template>

<script>
  import dayjs from 'dayjs'

  import {
    getAds,
    getNews,
    getHeros,
    getVideos,
    getGraphics
  } from 'network/home'

  import Card from 'components/content/Card'
  import Scroll from '../../components/common/scroll/Scroll'

  export default {
    name: "Main",
    filters: {
      playVolume(val) {
        return val.length >= 5 ? parseFloat(val / 10000).toFixed(1) + '万' : val
      },
      date(val) {
        return dayjs(val).format('MM-DD')
      }
    },
    components: {
      Card,
      Scroll
    },
    data() {
      return {
        swiperOption: {
          loop: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination'
          }
        },
        //轮播图图片数据
        adList: null,
        //精灵图数据
        spriteData: [{
            text: '爆料站',
            position: {
              'background-position': '-8.78rem -2.6rem'
            },
            url: "https://pvp.qq.com/m/m201706/coming/index.htm"
          },
          {
            text: '故事站',
            position: {
              'background-position': '-12.58rem -2.6rem'
            },
            url: "https://pvp.qq.com/act/a20160510story/index.htm?ADTAG=PC.QrCode.TG"
          },
          {
            text: '周边商城',
            position: {
              'background-position': '-4.98rem -0.12rem'
            },
            url: "https://pvp.qq.com/mall/m"
          },
          {
            text: '体验服',
            position: {
              'background-position': '-1.26rem -2.6rem'
            },
            url: "https://pvp.qq.com/cp/a20161116tyf/page01.htm"
          },
          {
            text: '新人专区',
            position: {
              'background-position': '-12.52rem -0.12rem'
            },
            url: "https://pvp.qq.com/m/m201606/goCenter.shtml"
          },
          {
            text: '荣耀传承',
            position: {
              'background-position': '-4.98rem -2.56rem'
            },
            url: "https://pvp.qq.com/m/memory/index.shtml"
          },
          {
            text: '模拟战资料库',
            position: {
              'background-position': '-1.28rem -0.12rem'
            },
            url: "https://pvp.qq.com/m/wzmnzm/index.html"
          },
          {
            text: '王者营地',
            position: {
              'background-position': '-8.76rem -0.12rem'
            },
            url: "https://image.ttwz.qq.com/wzry/wzryzs_download_4001.htm?ADTAG=mpvp.qq.com"
          },
          {
            text: '公众号',
            position: {
              'background-position': '0.16rem -16.64rem'
            },
            url: "https://game.weixin.qq.com/cgi-bin/comm/openlink?noticeid=90102708&appid=wx95a3a4d7c627e07d&url=https%3A%2F%2Fgame.weixin.qq.com%2Fcgi-bin%2Fh5%2Fstatic%2Fsubscribe%2Findex.html%3Fappid%3Dwx95a3a4d7c627e07d#wechat_redirect"
          },
          {
            text: '版本介绍',
            url: "https://pvp.qq.com/cp/a20190320bbgxsmm/index.html"
          },
          {
            text: '对局环境',
            url: "https://pvp.qq.com/cp/a20190917station/index.html"
          },
          {
            text: '无限王者团',
            url: "https://pvp.qq.com/cp/a20190827boundlessp/index.html"
          },
          {
            text: '创意互动营',
            url: "https://pvp.qq.com/m/hdy/p1/index.html"
          }
        ],
        //收起展开
        isEntry: false,
        //新闻列表数据
        newsList: [],
        heroList: [],
        videoList: [],
        graphicList: [],
        // 上拉加载参数
        pageNum: 1,
        currentGraphic: 0,
        isSeeMore: false
      }
    },
    computed: {
      scroll() {
        return this.$refs.homeScroll
      }
    },
    methods: {
      async getAds() {
        const res = await getAds()
        if (!res) return
        this.adList = res.data[0]
        // console.log(res.data);
      },
      async getNews() {
        const res = await getNews()
        if (!res) return
        this.newsList = res.data
      },
      async getHeros() {
        const res = await getHeros()
        if (!res) return
        this.heroList = res.data
        // console.log(this.heroList);
      },
      async getVideos() {
        const res = await getVideos()
        if (!res) return
        this.videoList = res.data
        // console.log(this.videoList)
      },
      async getGraphics() {
        const res = await getGraphics()
        if (!res) return
        this.graphicList = res.data
        // console.log(this.graphicList)
      },
      // 上拉加载
      async pullingUp() {
        this.scroll.refresh()
        // console.log(this.pageNum);
        if (this.pageNum === 3) return
        const res = await getGraphics({
          id: this.graphicList[this.currentGraphic]._id,
          pageNum: this.pageNum
        })
        // 如果拿到结果则让页数＋1，并重启下拉加载事件
        // 如果服务器出现错误，则重启下拉加载事件
        // 如果没有更多数据或页数等于3时，则终止下拉加载
        if (!res) return this.scroll.finishPullUp()
        if (res.data.length === 0) return this.isSeeMore = true

        this.graphicList[this.currentGraphic].graphic_list.push(...res.data)
        this.scroll.refresh()
        this.scroll.finishPullUp()

        this.pageNum++

      },
      // 查看更多
      seeMore() {
        if (this.pageNum === 3) return this.$router.push('/strategy')
      },
      cardNavClick(i) {
        this.currentGraphic = i
        if (this.graphicList[this.currentGraphic].graphic_list.length > 16) {
          this.pageNum = 3
          this.isSeeMore = false
        } else if (this.graphicList[this.currentGraphic].graphic_list.length <= 16 && this.graphicList[this
            .currentGraphic].graphic_list.length > 8) {
          this.pageNum = 2
          this.isSeeMore = false
          this.scroll.finishPullUp()
        } else {
          this.pageNum = 1
          this.isSeeMore = false
          this.scroll.finishPullUp()
        }
      },
      entryBtnClick() {
        this.isEntry = !this.isEntry
      },
      newsClick(id) {
        this.$router.push(`/article/${id}`)
      },
      heroClick(id) {
        this.$router.push(`/hero/${id}`)
      }
    },
    created() {
      this.getAds()
      this.getNews()
      this.getHeros()
      this.getVideos()
      this.getGraphics()
    },
    mounted() {
      this.scroll.refresh()
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
  .scroll {
    height: calc(100vh - 3.48rem);
    overflow: hidden;
  }

  .swiper {
    height: 6.76rem;
    margin-top: 0.6rem;
  }

  //精灵图部分
  .entry {
    border-top: 0.04rem solid #d4d9de;
    border-bottom: 0.04rem solid #d4d9de;

    .hidden-height {
      height: 11.2rem;
      transition: all 0.1s;

      &.entry-hidden {
        height: 2.8rem;
        overflow: hidden;
      }
    }

    .entry-list {
      display: block;
      position: relative;
      width: 25%;
      text-align: center;
      font-size: 0.48rem;
      padding: 0.52rem 0;

      i {
        display: inline-block;
        background: url("~assets/img/sprite/index.png") no-repeat;
        background-size: 15rem 18.2rem;
        width: 1.24rem;
        height: 1rem;
      }

      &::after {
        position: absolute;
        top: 0.32rem;
        right: -0.02rem;
        display: block;
        height: 2rem;
        width: 0.04rem;
        background: #d4d9de;
        content: "";
      }

      &:nth-child(7) {
        div {
          color: #999;
        }
      }

      &:nth-child(4n)::after {
        width: 0;
      }

      &:nth-child(10) {
        i {
          background: url("~assets/img/sprite/version-icon.png") no-repeat 0.08rem 0;
          background-size: 1.08rem 1.04rem;
        }
      }

      &:nth-child(11) {
        i {
          width: 1.52rem;
          background: url("~assets/img/sprite/djhj.png") no-repeat 0 0;
          background-size: 1.52rem 0.92rem;
        }
      }

      &:nth-child(12) {
        div {
          color: #999;
        }

        i {
          width: 1.84rem;
          background: url("~assets/img/sprite/wxwzt.png") no-repeat 0 0.16rem;
          background-size: 1.84rem 0.48rem;
        }
      }

      &:nth-child(13) {
        background: url("~assets/img/sprite/cyhdy.png") no-repeat 1.16rem 0.32rem;
        background-size: 1.4rem 1.4rem;

        div {
          color: #999;
        }
      }
    }

    //收起展开按钮
    .entry-btn {
      height: 1.2rem;
      background-color: #f9f9f9;
      line-height: 1.2rem;

      i {
        display: inline-block;
        margin-right: 0.12rem;
        background: url("~assets/img/sprite/index.png") no-repeat -5.64rem -9.28rem;
        background-size: 15rem 18.2rem;
        width: 0.4rem;
        height: 0.4rem;

        // transition: all 1s;
        // transform: rotate(180deg);
        &.is_entry {
          transform: rotate(180deg);
        }
      }
    }
  }

  //卡片标题图标
  i[class^="card-icon"] {
    display: inline-block;
    position: absolute;
    top: 0.76rem;
    background: url("~assets/img/sprite/index.png") no-repeat 0 -8.92rem;
    background-size: 15rem 18.2rem;
    width: 0.54rem;
    height: 0.52rem;

    &.card-icon-r {
      right: 0;
      background-position: -6.8rem -10rem;
      width: 0.8rem;
    }
  }

  .cate_name {
    color: #464f73;
  }

  //轮播图分页按钮
  .swiper-pagination {
    text-align: right;
    padding-right: 0.2rem;
  }

  .hero {
    float: left;
    width: 17%;
    margin-bottom: 0.32rem;
    margin-right: 3.75%;
    text-align: center;

    &:nth-child(5n) {
      margin-right: 0;
    }

    .avatar-container {
      width: 100%;
      overflow: hidden;

      .hero-avatar {
        width: 100%;
        vertical-align: middle;
      }
    }
  }

  .video-container {
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

          .v-num {
            padding-left: 0;
          }

          // .v-time {
          // }
        }
      }
    }
  }

  .graphic-container {
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

  .hero-list {
    .card-icon-l {
      background-position: -6.8rem -10.68rem;
    }
  }

  .video-list {
    .card-icon-l {
      background-position: 0 -10.04rem;
    }

    .load-more {
      height: 1.44rem;
      border-top: 0.04rem solid #f9f9f9;
      line-height: 1.44rem;
    }
  }

  .graphic-list {
    .card-icon-l {
      background-position: 0 -11.08rem;
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
</style>