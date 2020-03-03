<template>

  <m-card :icon="icon" :title="title">
    <div class="nav jc-between nav-width">
      <div class="nav-item " :class="{active: active === i}"
      v-for="(category, i) in categories" :key="i"
      @click="$refs.list.swiper.slideTo(i)">
        <div class=" ">{{category.name}}</div>
      </div>
    </div>  
    <div class="pt-3">
      <swiper ref="list" :options="{ autoHeight:true }"
      @slide-change="() => active = $refs.list.swiper.realIndex">
        <swiper-slide v-for="(category, i) in categories" :key="i">
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
export default {
  props: {
    icon: { type: String },
    title: { type: String },
    categories: { type: Array}
  },
  data(){
    return {
      active: 0
    }
  }
};
</script>

<style>
.nav-width{
  overflow-x: scroll;
  flex-wrap: nowrap;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.title-scroll{

}
</style>