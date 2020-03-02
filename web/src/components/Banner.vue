<template>
  <div>
    <swiper :options="swiperOption">
      <!-- swiper-slide -->
      <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
        <img class="w-100" :src="slide" alt="">
      </swiper-slide>
      <!-- pagination -->
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
  export default {
    props: ['swiperSlides'],
    data() {
      return {
        swiperOption: {
          centeredSlides: true,
          effect: 'fade', //1. 渐变切换

          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
          pagination: {
            el: '.pagination-home',
            clickable: true
          },
        },
      }
    },
    methods: {}
  }
</script>
<style scoped>

</style>