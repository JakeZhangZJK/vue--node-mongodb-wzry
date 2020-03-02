<template>
<div>
    <div class="nav nav-match jc-around ">
      <div class=" nav-item mt-3 mb-4  text-center" :class="{active: active === i}"
      v-for="(category, i) in categories" :key="i"
      @click="$refs.list.swiper.slideTo(i)">
        <div class=" nav-link text-center nav-match-sun">{{category.name}}</div>
      </div>
    </div>  
    <div class="pt-1">
      <swiper ref="list" :options="{ autoHeight:true }"
      @slide-change="() => active = $refs.list.swiper.realIndex">
        <swiper-slide v-for="(category, i) in categories" :key="i">
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categories: { type: Array}
  },
  data(){
    return {
      active: 0,
    }
  }
};
</script>

<style>
.nav-match{ 
  display: flex;
  overflow-x: auto;
  flex-wrap: nowrap;
  white-space: nowrap;
}
.nav-match-sun{
  flex: none;
}
</style>