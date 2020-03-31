<template>
  <div>
    <TopBar></TopBar>
    <div class="page-video " v-if="model">
      <div class="d-flex py-3 px-2 border-bottom ai-center">
        <div onclick="window.history.go(-1)" class="iconfont icon-back  pb-1 text-blue"></div>
        <strong class="flex-1 fs-lg text-ellipsis pl-2 text-blue">{{model.title}}</strong>
        <strong class="text-grey fs-xs">{{model.createdAt | date}}</strong>
      </div>
      <div class="video-container-all">
        <video class=" ml-2 hero-guide-video-all" :src="model.video" controls></video>
      </div>
      <div class=" title-box p-1   border-bottom border-top  border-right d-flex m-0">
        <img class="default-avatar" src="../assets/images/166.jpg" alt="">
        <div class="hero-video-info-sun ml-2 d-flex flex-column flex-1 ">
          <p class="m-0 fs-lg">{{model.title}}</p>
          <p class="m-0 pl-2">投稿：{{model.submit}} 粉丝：{{model.fan}}</p>
          <p class="m-0 pl-2">个性签名：</p>
        </div>
      </div>
      <div class="mt-3 ml-2 fs-lg"><i class="iconfont icon-xihuan-copy"></i> 猜您喜欢</div>
      <div class="d-flex pl-2 mt-2  jc-around">
        <router-link class="py-1  " tag="div" style="width:48%" v-for="item in model.related" :key="item._id"
          :to="`/videos/${item._id}`">
          <img class="w-100  video-border-radio " :src="item.image" alt="">
          <div class="px-2 text-dark">{{item.title}}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  // Introduce dayjs(需要安装)
  import dayjs from 'dayjs'
  import TopBar from '../components/TopBar'
  export default {
    filters: {
      date(val) {
        return dayjs(val).format('YYYY-MM-DD')
      }
    },
    props: {
      id: {
        required: true
      },
    },
    components: {
      TopBar
    },
    data() {
      return {
        model: null
      }
    },
    watch: {
      id: 'getVideo',
      // id(){
      //   this.getArticle()
      // }
    },
    methods: {
      async getVideo() {
        const res = await this.$http.get(`/videos/${this.id}`)
        this.model = res.data
      }
    },
    created() {
      this.getVideo()
    }
  }
</script>
<style lang="scss" scoped>
  .default-avatar {
    width: 60px;
  }

  .title-box {
    margin-top: -5px;
  }
</style>