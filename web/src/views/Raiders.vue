<template>
    <div>
        <Banner :swiperSlides="swiperSlides"></Banner>
<WonderfulSection :wonderfulSectionCats="wonderfulSectionCats"></WonderfulSection>
<WonderfulMatch :wonderfulMatchCats="wonderfulMatchCats"></WonderfulMatch>
<WonderfulVideo :wonderfulVideoCats="wonderfulVideoCats"></WonderfulVideo>
    </div>
</template>
<script>
import Banner from '../components/Banner'
import WonderfulSection from './suncomponents/WonderfulSection'
import WonderfulMatch from './suncomponents/WonderfulMatch'
import WonderfulVideo from './suncomponents/WonderfulVideo'
export default {
  name:'Raiders',
  components:{
    Banner,
    WonderfulSection,
    WonderfulMatch,
    WonderfulVideo
  },
    data() {
      return{
        wonderfulSectionCats:[],
        wonderfulMatchCats:[],
        wonderfulVideoCats:[],
        swiperSlides:[
           require("../assets/images/guide-1.jpg"),                                                                                                                                                                                                                                                                                                                                                                                                                                         
          require("../assets/images/guide-2.jpg"),
          require("../assets/images/guide-3.jpg"),
          require("../assets/images/guide-4.jpg")
        ]
      }
    },
    methods:{
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
    },
     created() {
      this.getVideoCats1()
      this.getVideoCats2()
      this.getVideoCats3()
    }
}
</script>
<style scoped>

</style>