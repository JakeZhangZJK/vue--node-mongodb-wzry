<!--首页-->
<template>
  <div>
    <Banner :swiperSlides="swiperSlides"></Banner>
    <!-- 导航菜单 -->
    <div class="nav-icons bg-white mt-3 text-center pt-4 text-dark-1">
      <div class="d-flex flex-wrap show-hide" :class="{'nav-icon-active':!show}">
        <router-link tag="div" to="/" class="nav-item mb-3" v-for="(value,key) in icons" :key="key">
          <i class="sprite" :class="value.icon"></i>
          <div class="py-1 fs-sm">{{value.title}}</div>
        </router-link>
      </div>
      <div class="bg-light py-2 fs-sm" v-if="show" @click="show = !show">
        <i class="iconfont icon-arrow_double_down text-grey" style="margin-left:-.2rem;"></i>
        <span>展开</span>
      </div>
      <div class="bg-light py-2 fs-sm" v-if="!show" @click="show = !show">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav icons -->
    <!-- m-card component newsCats-->
    <m-list-card icon="menu" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <router-link tag="div" :to="`/articles/${news._id}`" class="py-2 fs-lg d-flex"
          v-for="(news,i) in category.newsList" :key="i">
          <span class="text-dark-2">[{{news.categoryName}}]</span>
          <span class="px-1">|</span>
          <span class="text-dark flex-1 text-ellipsis pr-5">{{news.title}}</span>
          <span class="time fs-sm">{{news.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>
    <!-- m-card component heroCats-->
    <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap mar " v-if="category.heroList">
          <router-link tag="div" :to="`/heroes/${hero._id}`" class="p-2 text-center" style="width:20%"
            v-for="(hero,i) in category.heroList" :key="i">
            <img :src="hero.avatar" alt="" class="w-100">
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
    <!-- m-card component videoCats-->
    <Video :videoCats="videoCats"></Video>
    <!-- m-card component guideCats-->
    <Guide :guideCats="guideCats"></Guide>
  </div>
</template>
<script>
  // Introduce dayjs(需要安装)
  import dayjs from 'dayjs'
  import Guide from './suncomponents/Guide'
  import Video from './suncomponents/Video'
  import Banner from '../components/Banner'
  export default {
    filters: {
      date(val) {
        return dayjs(val).format('MM/DD')
      }
    },
    components: {
      Guide,
      Video,
      Banner
    },
    name: 'Home',
    data() {
      return {
        show: true,
        newsCats: [],
        heroCats: [],
        videoCats: [],
        guideCats: [],
        icons: [{
            'icon': 'sprite-news',
            'title': '爆料站'
          },
          {
            'icon': 'sprite-stories',
            'title': '故事站'
          },
          {
            'icon': 'sprite-shop',
            'title': '周边商城'
          },
          {
            'icon': 'sprite-experience',
            'title': '体验服'
          },
          {
            'icon': 'sprite-newcomer',
            'title': '新人专区'
          },
          {
            'icon': 'sprite-glory',
            'title': '荣耀·传承'
          },
          {
            'icon': 'sprite-resources',
            'title': '模拟战资料库'
          },
          {
            'icon': 'sprite-camp',
            'title': '王者营地'
          },
          {
            'icon': 'sprite-wechat',
            'title': '公众号'
          },
          {
            'icon': 'sprite-version',
            'title': '版本'
          },
          {
            'icon': 'sprite-djhj',
            'title': '对局环境'
          },
          {
            'icon': 'sprite-wxwzt',
            'title': '无限王者团'
          },
          {
            'icon': 'sprite-cyhdy',
            'title': '创意互动营'
          },

        ],
        swiperOption: {
          centeredSlides: true,
          effect: 'fade', //1. 渐变切换

          autoplay: {
            delay: 3000,
            disableOnInteraction: false
          },
          pagination: {
            el: '.pagination-home',
            clickable: true
          },
        },
        swiperSlides: [
          require("../assets/images/1.jpeg"),
          require("../assets/images/2.jpeg"),
          require("../assets/images/3.jpeg"),
        ]
      }
    },
    mounted() {},
    methods: {
      // 新闻资讯列表
      async getNewsCats() {
        const res = await this.$http.get('news/list')
        this.newsCats = res.data
      },
      // 英雄列表
      async getHeroCats() {
        const res = await this.$http.get('heroes/list')
        this.heroCats = res.data
      },
      // 精彩视频列表
      async getVideoCats() {
        const res = await this.$http.get('videos/list')
        this.videoCats = res.data
      },
      // 图文攻略列表
      async getguideCats() {
        const res = await this.$http.get('guides/list')
        this.guideCats = res.data
      },
    },
    created() {
      this.getNewsCats()
      this.getHeroCats()
      this.getVideoCats()
      this.getguideCats()
    }
  }
</script>
<style lang="scss">
  @import '../assets/scss/_variables';

  .pagination-home {
    .swiper-pagination-bullet {
      border-radius: 0.1538rem;
      opacity: 1;
      background: map-get($map: $colors, $key: "white");
      &.swiper-pagination-bullet-active {
        background: map-get($map: $colors, $key: "info");
      }
    }
  }
  .nav-icons {
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    .show-hide {
      overflow: hidden;
      height: 4rem;
    }
    .nav-icon-active {
      height: 18rem;
    }
    .nav-item {
      width: 25%;
      border-right: 1px solid $border-color;
      &:nth-child(4n) {
        border-right: none;
      }
    }
  }
</style>