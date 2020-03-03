<template>
    <div>
       <!-- m-card component videoCats-->
    <m-list-card icon="vidoe" title="赛事精品" :categories="wonderfulVideoCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap " v-if="category.videoList">
          <router-link tag="div" :to="`/videos/${video._id}`" class="p-2 text-left" style="width:50%"
            v-for="(video,i) in category.videoList" :key="i">
            <img :src="video.image" alt="" class="w-100 video-border-radio">
            <p class="text-dark m-0 text-ellipsis2">{{video.title}}</p>
            <div class="d-flex text-grey fs-xs mt-1 ">
              <div class="flex-1 d-flex ai-center">
                <img src="../../assets/images/video-1.png" alt="" class="mr-1">
                <span class="fs-xs">{{video.see}}</span>
              </div>
              <div>{{video.createdAt | date}}</div>
            </div>
          </router-link>
        </div>
      </template>
    </m-list-card>
    </div>
</template>
<script>
// Introduce dayjs(需要安装)
  import dayjs from 'dayjs'
export default {
  props:['wonderfulVideoCats'],
    filters: {
      date(val) {
        return dayjs(val).format('MM/DD')
      }
    },
    data() {
      return{}
    },
    methods:{}
}
</script>
<style scoped>

</style>
