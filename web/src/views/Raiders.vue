<template>
  <div>
    <Banner :swiperSlides="swiperSlides"></Banner>
     <HeroGuide :heroCats="heroCats" ></HeroGuide>
    <WonderfulSection :wonderfulSectionCats="wonderfulSectionCats"></WonderfulSection>
    <WonderfulMatch :wonderfulMatchCats="wonderfulMatchCats"></WonderfulMatch>
    <WonderfulVideo :wonderfulVideoCats="wonderfulVideoCats"></WonderfulVideo>
    <Guide :guideCats="guideCats"></Guide>
  </div>
</template>
<script>


  import Banner from '../components/Banner'
  import HeroGuide from './suncomponents/HeroGuide'
  import WonderfulSection from './suncomponents/WonderfulSection'
  import WonderfulMatch from './suncomponents/WonderfulMatch'
  import WonderfulVideo from './suncomponents/WonderfulVideo'
  import Guide from './suncomponents/Guide'
  export default {
    name: 'Raiders',
    components: {
      Banner,
      HeroGuide,
      WonderfulSection,
      WonderfulMatch,
      WonderfulVideo,
      Guide,
    },
    data() {
      return {
        heroCats: [],
        wonderfulSectionCats: [],
        wonderfulMatchCats: [],
        wonderfulVideoCats: [],
        guideCats: [],
        swiperSlides: [
          require("../assets/images/guide-1.jpg"),
          require("../assets/images/guide-2.jpg"),
          require("../assets/images/guide-3.jpg"),
          require("../assets/images/guide-4.jpg")
        ]
      }
    },
    methods: {
      // 英雄列表
      async getHeroCats() {
        const res = await this.$http.get('heroes/list')
        this.heroCats = res.data
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
      this.getVideoCats1()
      this.getVideoCats2()
      this.getVideoCats3()
      this.getguideCats()
    }
  }
</script>
<style scoped>

</style>