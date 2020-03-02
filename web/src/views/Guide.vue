<template>
<div>
 <TopBar></TopBar>
 <div></div>
  <div class="page-guide " v-if="model">
    <div class="d-flex py-3 px-2 border-bottom ai-center">
      <div onclick="window.history.go(-1)" class="iconfont icon-back  pb-1 text-blue"></div>
      <strong class="flex-1 fs-lg text-ellipsis pl-2 text-blue">{{model.title}}</strong>
      <strong class="text-grey fs-xs">{{model.createdAt | date}}</strong>
    </div>
    <div class="px-3 body fs-lg all-video-width" v-html="model.body"></div>
    <div class="border-top p-3">
      <div class="d-flex ">
        <i class="iconfont icon-lianjie1"></i>
        <strong class="text-blue fs-lg ml-2">相关资讯</strong>
      </div>
      <div class="pt-2 d-flex ai-center" v-for="item in model.related" :key="item._id">
        <router-link class="py-1 text-ellipsis flex-1" tag="div" :to="`/guides/${item._id}`">
          {{item.title}}
        </router-link>
        <strong class="text-grey fs-xs">{{item.createdAt | date}}</strong>
      </div>
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
    components:{
      TopBar
    },
    data() {
      return {
        model: null,
      }
    },

    watch: {
      id: 'getGuide',
      // id(){
      //   this.getArticle()
      // }
    },
    methods: {
      async getGuide() {
        const res = await this.$http.get(`/guides/${this.id}`)
        this.model = res.data
      }
    },
    created() {
      this.getGuide()
    }
  }
</script>
<style lang="scss">

  .page-guide {
    .body {
      img {
        width: 100%;
        height: auto;

      }

      iframe {
        width: 100%;
        height: auto;

      }
    }
  }
</style>