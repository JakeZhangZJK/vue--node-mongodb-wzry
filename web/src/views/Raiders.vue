<template>
  <div>
    <Banner :swiperSlides="swiperSlides"></Banner>
    <!-- <HeroGuide :heroCats="heroCats" ></HeroGuide> -->
    <div>
      <!-- m-card component guideCats-->
      <guide-list-card icon="gonglue" title="英雄攻略" :categories="heroCats">
        <template #items2="{category}">
          <div class="d-flex flex-wrap hero-guides" v-if="category.heroList">
            <div tag="div" class="p-2 text-center" style="width:25%" v-for="(hero,i) in category.heroList"
              :key="`1${i}`">
              <img :src="hero.avatar" alt="" class="w-100 hero-avatar" :class="{active:currentHeroAvatarIndex=== hero.index}"
                @click="currentHeroAvatarIndex = hero.index">
              <div>{{hero.name}}</div>
            </div>
          </div>
        </template>
      </guide-list-card>
    </div>
    <div class="hero-guide-plus bg-white">
      <div class="border-bottom text-center w-100 p-2 text-primary" v-show="curentHeroGuides.lenght = 0">暂无该英雄攻略~</div>
      <div class="hero-guide-plus-container px-3 py-1" v-show="curentHeroGuides">
        <div class="hero-guide-item border-bottom  d-flex pb-3 mt-3" v-for="(item,i) in curentHeroGuides" :key="`3${i}`"
          @click="showHeroGuide = true;curentGuideIndex = i">
          <img class="w-100 img-guide-width" :src="item.cover" alt="">
          <div class="hero-guide-info w-100 m-0 ml-3 d-flex flex-column jc-between text-left">

            <p class="m-0 w-100">{{item.title}}</p>
            <div class="see-and-time m-0   d-flex  fs-xxs text-grey ">
              <div class="d-flex  m-0 ai-center ">
                <img src="../assets/images/video-1.png" alt="" class="mr-1">
                <span class="">{{item.view}}</span>
              </div>
              <p class=" flex-1 m-0 text-right">2020-02-22</p>
            </div>
          </div>  
        </div>
      </div>
    </div>
  
    <WonderfulSection :wonderfulSectionCats="wonderfulSectionCats"></WonderfulSection>
    <WonderfulMatch :wonderfulMatchCats="wonderfulMatchCats"></WonderfulMatch>
    <WonderfulVideo :wonderfulVideoCats="wonderfulVideoCats"></WonderfulVideo>
    <Guide :guideCats="guideCats"></Guide>
       <!-- 英雄攻略视频弹层 -->
    <div class="current-hero-guide-container" v-if="showHeroGuide" @touchmove.prevent>
      <div class="m-0" v-if="curentHeroGuide">
        <div class="d-flex py-3 px-2 border-bottom bg-white ai-center">
          <div @click="showHeroGuide = false" class="iconfont icon-back  pb-1 text-blue"></div>
          <strong class="flex-1 fs-lg text-ellipsis pl-2 text-blue">{{curentHeroGuide.title}}</strong>
        </div>
        <div class="video-container-all">
          <video class=" ml-2 hero-guide-video-all" :src="curentHeroGuide.video" controls></video>
        </div>
        <div class="p-1 px-2 mr-2 hero-video-info border-bottom border-top  border-right d-flex m-0">
          <img class="hero-avatar " src="../assets/images/default_head.jpg" alt="" width="58">
          <div class="hero-video-info-sun ml-2  flex-1 ">
            <p class="m-0 fs-lg ">{{curentHeroGuide.title}}</p>
            <p class="m-0  fs-xs">投稿：{{curentHeroGuide.submit}} 粉丝：{{curentHeroGuide.fan}}</p>
            <p class="m-0  fs-xs">个性签名：</p>
          </div>
        </div>
        <div class="mt-3 ml-2 pb-2" height="200"><i class="iconfont icon-xihuan-copy"></i> 猜您喜欢</div>
      </div>
    </div>

  </div>
</template>
<script>

  import Banner from '../components/Banner'
  // import HeroGuide from './suncomponents/HeroGuide'
  import WonderfulSection from './suncomponents/WonderfulSection'
  import WonderfulMatch from './suncomponents/WonderfulMatch'
  import WonderfulVideo from './suncomponents/WonderfulVideo'
  import Guide from './suncomponents/Guide'
  export default {
    name: 'Raiders',
    components: {
      Banner,
      // HeroGuide,
      WonderfulSection,
      WonderfulMatch,
      WonderfulVideo,
      Guide,
    },
    data() {
      return {
        showHeroGuide: false,
        curentGuideIndex: 0,
        currentHeroAvatarIndex: 0,
        heroCats: [],
        heroes: [],
        wonderfulSectionCats: [],
        wonderfulMatchCats: [],
        wonderfulVideoCats: [],
        guideCats: [],
        swiperSlides: [
          require("../assets/images/guide-1.jpg"),
          require("../assets/images/guide-2.jpg"),
          require("../assets/images/guide-3.jpg"),
          require("../assets/images/guide-4.jpg")
        ],

      }
    },
    computed: {
      curentHeroGuides() {
        return this.heroes[this.currentHeroAvatarIndex].heroGuides
      },
      curentHeroGuide() {
        return this.heroes[this.currentHeroAvatarIndex].heroGuides[this.curentGuideIndex]
      },
    },

    methods: {
      // 英雄列表
      async getHeroCats() {
        const res = await this.$http.get('heroes/list')
        this.heroCats = res.data
        console.log("111", this.heroCats[0].heroList)
      },
      async getHeroAll() {
        const res = await this.$http.get('heroes_all/list')
        this.heroes = res.data
        // console.log(this.heroes)
      },
      // 精彩视频列表
      async getVideoCats1() {
        const res = await this.$http.get('wonderful_sections/list')
        this.wonderfulSectionCats = res.data
      },
      // 精彩视频列表
      async getVideoCats2() {
        const res = await this.$http.get('wonderful_matches/list')
        this.wonderfulMatchCats = res.data
      },
      // 精彩视频列表
      async getVideoCats3() {
        const res = await this.$http.get('wonderful_videos/list')
        this.wonderfulVideoCats = res.data
      },
      // 图文攻略列表
      async getguideCats() {
        const res = await this.$http.get('guides/list')
        this.guideCats = res.data
      },
    },
    created() {
      this.getHeroCats()
      this.getHeroAll()
      this.getVideoCats1()
      this.getVideoCats2()
      this.getVideoCats3()
      this.getguideCats()
    }
  }
</script>
<style lang="scss" scope>
  @import '../assets/scss/_variables.scss';
    
    
  .current-hero-guide-container{
    height: auto;
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index:99;
    
    background-color: rgba($color: #fff, $alpha: 1.0);
  }

  .hero-guides {
    img.hero-avatar {
      border: 3px solid map-get($map: $colors, $key:'white');
      border-top-right-radius: 10px;
      border-bottom-left-radius: 10px;


      &.active {
        border-color: map-get($map: $colors, $key:'primary');
      }
    }

  }
</style>