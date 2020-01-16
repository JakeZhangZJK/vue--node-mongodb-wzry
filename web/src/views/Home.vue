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
                <div class="nav-item mb-3" v-for="(value,key) in icons" :key="key">
                    <i class="sprite" :class="value.icon"></i>
                    <div class="py-1">{{value.title}}</div>
                </div>
            </div>
            <div class="bg-light py-2 fs-sm">
                <i class="sprite sprite-arrow mr-1"></i>
                <span>收起</span>
            </div>
        </div>
        <!-- end of nav icons -->
        <!-- m-card component -->
        <m-card icon="menu" title="新闻资讯">
            <div class="nav jc-between">
                <div class="nav-item active">
                    <div class="nav-link">热门</div>
                </div>
                <div class="nav-item">
                    <div class="nav-link">新闻</div>
                </div>
                <div class="nav-item">
                    <div class="nav-link">公告</div>
                </div>
                <div class="nav-item">
                    <div class="nav-link">活动</div>
                </div>
                <div class="nav-item">
                    <div class="nav-link">赛事</div>
                </div>
            </div>
            <div class="pt-3">
                <swiper>
                    <swiper-slide v-for="m in 5" :key="m">
                        <div class="py-2 " v-for="n in 7" :key="n">
                            <span class="text-dark-2">[热门]</span>
                            <span>|</span>
                            <span class="text-dark">嬴政小头像不显示问题说明</span>
                            <span class="time">1/16</span>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </m-card>





    </div>
</template>
<script>
    export default {
        data() {
            return {
                icons: [{
                        'icon': 'sprite-news',
                        'title': '爆料站'
                    },
                    {
                        'icon': 'sprite-stories',
                        'title': '故事站'
                    },
                    {
                        'icon': 'sprite-shop',
                        'title': '周边商城'
                    },
                    {
                        'icon': 'sprite-experience',
                        'title': '体验服'
                    },
                    {
                        'icon': 'sprite-newcomer',
                        'title': '新人专区'
                    },
                    {
                        'icon': 'sprite-glory',
                        'title': '荣耀·传承'
                    },
                    {
                        'icon': 'sprite-resources',
                        'title': '模拟战资料库'
                    },
                    {
                        'icon': 'sprite-camp',
                        'title': '王者营地'
                    },
                    {
                        'icon': 'sprite-wechat',
                        'title': '公众号'
                    },
                    {
                        'icon': 'sprite-version',
                        'title': '版本'
                    },
                    {
                        'icon': 'sprite-djhj',
                        'title': '对局环境'
                    },
                    {
                        'icon': 'sprite-wxwzt',
                        'title': '无限王者团'
                    },
                    {
                        'icon': 'sprite-cyhdy',
                        'title': '创意互动营'
                    },

                ],
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