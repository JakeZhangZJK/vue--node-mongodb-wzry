<template>
  <div>
    <mt-card :categories="matchCats">
      <template #items="{category}">
        <div class="match-width" v-if="category.matchList">
          <div>
            <div class="d-flex ai-center px-3">
              <h2 class="text-blue-2">王者荣耀2019KPL秋季赛</h2>
              <span class="text-border text-grey ml-4">官方举办</span>
            </div>
            <img class="w-100" src="../assets/images/match-1.jpg" alt="">
          </div>
          <div class="bg-light-2 text-grey mt-2 mb-3 py-2 fs-lg text-center">赛事资讯 </div>
          <div class="m-1">
            <router-link tag="div" :to="`/articles/${match._id}`" class="py-2 px-1 fs-lg d-flex" style="width:100%"
              v-for="(match,i) in category.matchList" :key="i">
              <span class=" text-dark flex-1 text-ellipsis pr-3">{{match.title}}</span>
              <span class="text-grey fs-xs">{{match.createdAt | date}}</span>
            </router-link>
          </div>
        </div>
      </template>
    </mt-card>
  </div>
</template>
<script>
  // Introduce dayjs(需要安装)
  import dayjs from 'dayjs'
  export default {
    filters: {
      date(val) {
        return dayjs(val).format('MM/DD')
      }
    },
    name: 'Match',
    data() {
      return {
        matchCats: [],


      }
    },
    methods: {
      // 赛事中心列表
      async getMatchCats() {
        const res = await this.$http.get('matches/list')
        this.matchCats = res.data
      },
    },
    created() {
      this.getMatchCats()
    }
  }
</script>
<style lang="scss" scoped>
  @import '../assets/scss/_variables';

  .text-border {
    padding: .1rem .5rem;
    border: 1px solid $border-color;
    border-radius: 10px;
    text-align: center;

  }
</style>