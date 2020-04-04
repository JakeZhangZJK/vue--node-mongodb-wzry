<template>
  <div>
    <!-- m-card component guideCats-->
    <guide-list-card icon="gonglue" title="英雄攻略" :categories="heroCats">
      <template #items2="{category}">
        <div class="d-flex flex-wrap" v-if="category.heroList">
          <div tag="div" class="p-2 text-center" style="width:25%"
            v-for="(hero,i) in category.heroList" :key="i">
            <img :src="hero.avatar" alt="" class="w-100" :class="{active:currentHeroAvatarIndex===i}" @click="currentHeroAvatarIndex = i">
            <div>{{hero.name}}</div>  
          </div>
        </div>
      </template>
    </guide-list-card>
  </div>
</template>
<script>
  // Introduce dayjs(需要安装)
  import dayjs from 'dayjs'
  export default {
    props: ['heroCats', 'heroes6'],
    filters: {
      date(val) {
        return dayjs(val).format('MM/DD')
      }
    },
    data() {
      return {
        currentHeroAvatarIndex:0
      }
    },
  }
</script>
<style scoped>

</style>