<template>
  <m-card plain :icon="icon" :title="title">
    <div class="d-flex jc-around ai-center">
      <div class="m-1 " v-for="(hero,i) in heroes6" :key="`hero${i}`"> 
        <img :src="hero.avatar" alt="" class="w-100 hero-avatar-size">
      </div>
      <button class="show-list-btn ml-1 py-1 px-2  fs-xs" v-if="show" @click="show = !show">展开</button>
      <button class="show-list-btn ml-1 py-1 px-2  fs-xs" v-if="!show" @click="show = !show">收起</button>
    </div>
    <div class="m-0 hero-guide-container-2" v-show="!show">
    <ul class="nav2 m-0 title-float-right flex-column jc-between ai-end">
      <li class="nav-item  px-4 py-3" :class="{active: active === i}"
      v-for="(category, i) in categories" :key="i"
      @click="$refs.list.swiper.slideTo(i)">
        <span class=" ">{{category.name}}</span>
      </li>
    </ul>  
    <div class="swiper-height">
      <swiper ref="list" :options="{ autoHeight:true }"
      @slide-change="() => active = $refs.list.swiper.realIndex">
        <swiper-slide v-for="(category, i) in categories" :key="i">
          <slot name="items2" :category="category"></slot>
          <slot name="items3" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
    </div>
  </m-card>
</template>

<script>
export default {
  props: {
    icon: { type: String },
    title: { type: String },
    categories: { type: Array},
  },
  data(){
    return {
      show:false,
      active: 0,
      heroes6: []
    }
  },
   methods: {
        // 英雄列表
      async getHeroCats6() {
        const res = await this.$http.get('heroes_6/list')
        this.heroes6 = res.data
      },
    },
    created() {
      this.getHeroCats6()
    }

};
</script>

<style lang="scss">
.swiper-height{
  width: 80%;
  height: 300px;
  overflow-y:scroll;
}
.show-list-btn{
  width: 41px;
  height: 41px;
  border: 1px solid #ddd;
  border-radius: 2px;
  background-color: #f5f5f5;

}
.hero-avatar-size{
  width: 41px;

}
.title-float-right{
    float: right;
  }
.items-float-left{
     float: left;
  }


</style>