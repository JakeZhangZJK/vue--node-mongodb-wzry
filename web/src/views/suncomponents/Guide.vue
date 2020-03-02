<template>
  <div>
    <!-- m-card component guideCats-->
    <m-list-card icon="text" title=图文攻略 :categories="guideCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap pr-3" v-if="category.guideList">
          <div class="m-1">
            <router-link tag="div" :to="`/guides/${guide._id}`" class="py-2 mr-3 border-bottom text-left"
              style="width:100%" v-for="(guide,i) in category.guideList" :key="i">
              <div class="d-flex">
                <img :src="guide.image" alt="" class="mr-2 w-100 video-border-radio img-guide-width">
                <div class=" d-flex flex-column flex-1 ml-2">
                  <p class=" guie-span-height py-1 text-dark m-0 text-ellipsis3 fs-lg  ">{{guide.title}}</p>
                  <span class="text-grey fs-xs mt-3">{{guide.createdAt | date}}</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </template>
    </m-list-card>
  </div>
</template>
<script>
  // Introduce dayjs(需要安装)
  import dayjs from 'dayjs'
  export default {
    props: ['guideCats'],
    filters: {
      date(val) {
        return dayjs(val).format('MM/DD')
      }
    },
    data() {
      return {}
    },
  }
</script>
<style scoped>

</style>