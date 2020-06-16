<template>
  <div class="article" v-if="ArticleData">
    <div class="title d-flex pr5">
      <i class="arrow-l" @click="$router.back()"></i>
      <strong class="flex1 fs13 t-ellipsis" style="color: #4394e4">{{ArticleData.title}}</strong>
      <span style="color: #9fa0a0">{{ArticleData.updatedAt | date}}</span>
    </div>
    <!-- 文章内容 -->
    <div class="content" v-html="ArticleData.content"></div>
    <!-- 相关资讯 -->
    <div class="related">
      <div class="d-flex ai-center">
        <span class="icon-related"></span>
        <strong class="fs14 flex1" style="color: #4394e4">相关资讯</strong>
      </div>
      <div class="pb20">
        <div
          class="d-flex pb5 fs14"
          v-for="(item,i) in ArticleData.related"
          :key="i"
          @click="relatedClick(item._id)"
        >
          <span class="flex1 t-ellipsis pr20">{{item.title}}</span>
          <span class="fs13" style="color: #9fa0a0">{{item.updatedAt | date}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import { getArticleById } from 'network/home'
import dayjs from 'dayjs'

import TopBar from 'components/content/TopBar'

export default {
  name: "Article",
  props: {
    id: { type: String }
  },
  filters: {
    date(val) {
      return dayjs(val).format('YYYY-MM-DD')
    }
  },
  components: {
    TopBar
  },
  watch: {
    id() {
      this.getArticleById()
    }
  },
  data() {
    return {
      ArticleData: null
    }
  },
  methods: {
    async getArticleById() {
      const res = await getArticleById(this.id)
      if (!res) return
      this.ArticleData = res.data
    },
    relatedClick(id) {
      this.$router.push(`/article/${id}`)
    }
  },
  created() {
    this.$store.commit('changeTopBarBg')
    this.getArticleById()
  }
}
</script>
 
<style lang="scss" >
.article {
  // .article-nav {
  //   background: url("~assets/img/article/hd.jpg") !important;
  //   background-size: 15rem 1.8rem !important;
  // }
  .title {
    height: 1.52rem;
    line-height: 1.52rem;
    border-bottom: 0.04rem solid #d4d4d5;
    .arrow-l {
      display: inline-block;
      width: 1rem;
      height: 100%;
      background: url("~assets/img/article/backBg.png") no-repeat center center;
      background-size: 0.36rem 0.68rem;
    }
  }
  .content {
    font-size: 0.64rem;
    line-height: 1.2rem;
    padding: 0 0.6rem;
    .ql-align-center {
      text-align: center;
    }
    img {
      width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }

  .related {
    padding: 0 0.6rem 0.6rem 0.6rem;
    .icon-related {
      display: inline-block;
      width: 1.2rem;
      height: 2rem;
      background: url("~assets/img/article/lin.png") no-repeat left center;
    }
  }
}
</style>