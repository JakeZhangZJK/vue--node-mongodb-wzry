<template>
  <div class="page-article " v-if="model">
    <div class="d-flex py-3 px-2 border-bottom ai-center">
      <div onclick="window.history.go(-1)" class="iconfont icon-back  pb-1 text-blue"></div>
      <strong class="flex-1 fs-lg text-ellipsis pl-2 text-blue">{{model.title}}</strong>
      <strong class="text-grey fs-xs">2020-02-10</strong>
    </div>
    <div class="px-3 body fs-lg" v-html="model.body"></div>
    <div class="border-top p-3">
      <div class="d-flex ">
        <i class="iconfont icon-gonglue"></i>
        <strong class="text-blue fs-lg ml-2">相关资讯</strong>
      </div>
        <div class="pt-2">
      <router-link class="py-1" tag="div" :to="`/articles/${item._id}`" v-for="item in model.related" :key="item._id">
        {{item.title}}
      </router-link>
    </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      id: {
        required: true
      },
    },
    data() {
      return {
        model: null
      }
    },
    watch:{
      id:'getArticle',
      // id(){
      //   this.getArticle()
      // }
    },
    methods: {
      async getArticle() {
        const res = await this.$http.get(`/articles/${this.id}`)
        this.model = res.data
      }
    },
    created() {
      this.getArticle()
    }
  }
</script>
<style lang="scss">
  .page-article {
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