<!---->
<template>
    <div>
        <swiper :options="swiperOption">
            <!-- swiper-slide -->
            <swiper-slide>
                <img class="w-100" src="../myassets/images/1.jpeg" alt="">
            </swiper-slide>
            <swiper-slide>
                <img class="w-100" src="../myassets/images/2.jpeg" alt="">
            </swiper-slide>
            <swiper-slide>
                <img class="w-100" src="../myassets/images/3.jpeg" alt="">
            </swiper-slide>
            <!-- pagination -->
            <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
        </swiper>

        <!-- 导航菜单 -->
        <div class="nav-icons bg-white mt-3 text-center pt-4 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav icons -->

    </div>
</template>
<script>
    export default {
        data() {
            return {
                swiperOption: {
                    pagination: {
                        el: '.pagination-home'
                    }
                },
            }
        },
        methods: {}
    }
</script>
<style lang="scss">
    @import '../myassets/scss/variables';

    .pagination-home {
        .swiper-pagination-bullet {
            border-radius: 0.1538rem;
            opacity: 1;
            background: map-get($map: $colors, $key: "white");
            //   background-color: #fff;

            &.swiper-pagination-bullet-active {
                background: map-get($map: $colors, $key: "info");
                //    background-color: #4b67af;

            }
        }
    }
    .nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>