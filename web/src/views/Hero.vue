<template>
  <div>
    <!-- :class="{'stop':showVideo || show2}" -->
    <div class="page-hero" v-if="model">
      <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
        <img src="../assets/logo.png" alt="logo" height="30">
        <div class="px-2 flex-1">
          <span>王者荣耀</span>
          <span class="ml-3">攻略站</span>
        </div>
        <router-link to="/" tag="div" class="text-white fs-sm">更多英雄 &gt;</router-link>
      </div>
      <div class="top-banner " :style="{'background-image': `url(${model.banner})`}">
        <div class="info text-white p-3 h-100 d-flex flex-column jc-end">
          <div class="fs-sm  show-text">{{model.title}}</div>
          <h2 class="  show-text my-2">{{model.name}}</h2>
          <div class="fs-sm  ani-1">{{model.categories.map(v => v.name).join('/')}}</div>
          <div class="d-flex jc-between pt-2">
            <div class="scores d-flex ai-center" v-if="model.scores">
              <span class="  ani-1">难度</span>
              <span class="badge bg-primary-1 fs-xxs text-grey  ani-1">{{model.scores.difficult}}</span>
              <span class="  ani-2">技能</span>
              <span class="badge bg-blue-1 fs-xxs text-grey   ani-2">{{model.scores.skills}}</span>
              <span class="  ani-3">攻击</span>
              <span class="badge bg-danger fs-xxs text-grey   ani-3">{{model.scores.attack}}</span>
              <span class=" ani-4">生存</span>
              <span class="badge bg-dark fs-xxs text-grey   ani-4">{{model.scores.survive}}</span>
            </div>
            <div class="text-grey fs-sm  show-text" @click="showSkins = true"> 皮肤：{{model.skins.length}} &gt;</div>
          </div>
        </div>
      </div>
      <!-- top-banner end -->
      <div>
        <div class="px-3 bg-white">
          <div class="nav d-flex jc-around pt-3 pb-2 border-bottom">
            <div class="nav-item" :class="{active: active === i}" v-for="(item,i) in tabs" :key="i"
              @click="$refs.list.swiper.slideTo(i)">
              <div class="nav-link">{{item}}</div>
            </div>
          </div>
        </div>
        <swiper ref="list" :options="{ autoHeight:true }" @slide-change="() => active = $refs.list.swiper.realIndex">
          <swiper-slide>
            <div>
              <div class="p-3 bg-white border-bottom">
                <div>
                  <div class="d-flex ">
                    <van-cell islink class="btn btn-lg flex-1" @click="showVideo = true">
                      <i class="iconfont icon-vidoe"></i>
                      英雄介绍视频
                    </van-cell>
                    <div class="btn btn-lg flex-1 ml-2" @click="showPhoto = true">
                      <i class="iconfont icon-tupian"></i>
                      一图识别英雄
                    </div>
                  </div>
                </div>
                <div class="skills mt-4">
                  <div class="d-flex jc-around bb">
                    <img class="icon" v-for="(item,i) in model.skills" :key="item.name"
                      :class="{active:curentSkillIndex === i}" :src="item.icon" alt="" @click="curentSkillIndex = i">
                  </div>
                  <div v-if="curentSkill">
                    <div class="d-flex pt-4 pb-3">
                      <h3 class="m-0">{{curentSkill.name}}</h3>
                      <div class="text-grey-1 ml-3">（冷却值：{{curentSkill.delay}} 消耗：{{curentSkill.cost}}）</div>
                    </div>
                    <p>{{curentSkill.description}}</p>
                  </div>
                </div>
              </div>
              <!-- skills end -->
              <m-card plain class="hero-items" icon="wuqi" title="出装推荐">
                <div class="fs-xl">顺风出装</div>
                <div class="d-flex jc-around text-center mt-3 pb-1 border-bottom">
                  <div class="" v-for="(item,i) in model.items1" :key="i">
                    <img class="icon" :src="item.icon" alt="">
                    <div class="fs-xs">{{item.name}}</div>
                  </div>
                </div>
                <div class="fs-xl mt-3">逆风出装</div>
                <div class="d-flex jc-around text-center my-3">
                  <div class="" v-for="(item,i) in model.items2" :key="i">
                    <img class="icon" :src="item.icon" alt="">
                    <div class="fs-xs">{{item.name}}</div>
                  </div>
                </div>
              </m-card>
              <!-- 推荐出装card end -->

              <m-card plain icon="menu" title="使用技巧">
                <p class="m-0">{{model.usageTips}}</p>
              </m-card>
              <m-card plain icon="VS" title="对抗技巧">
                <p class="m-0">{{model.battleTips}}</p>
              </m-card>
              <m-card plain icon="idea" title="团战思路">
                <p class="m-0">{{model.teamTips}}</p>
              </m-card>
              <m-card plain icon="team" title="英雄关系">
                <div class="fs-xl mt-2">最佳搭档</div>
                <div class=" pb-2" v-for="(item,i) in model.partners" :key="i">
                  <div class="d-flex  ai-cenetr pt-3">
                    <img :src="item.hero.avatar" alt="" height="50">
                    <p class="m-0 ml-3 flex-1">{{item.description}}</p>
                  </div>
                </div>
                <div class="border-bottom"></div>
                <div class="fs-xl mt-3">被谁克制</div>
                <div class=" pb-2" v-for="(item,i) in model.restrained" :key="i">
                  <div class="d-flex  ai-cenetr pt-3">
                    <img :src="item.hero.avatar" alt="" height="50">
                    <p class="m-0 ml-3 flex-1">{{item.description}}</p>
                  </div>
                </div>
                <div class="border-bottom"></div>
                <div class="fs-xl mt-3">克制谁</div>
                <div class="pb-2" v-for="(item,i) in model.restraints" :key="i">
                  <div class="d-flex  ai-cenetr pt-3">
                    <img :src="item.hero.avatar" alt="" height="50">
                    <p class="m-0 ml-3 flex-1">{{item.description}}</p>
                  </div>
                </div>
              </m-card>
            </div>
          </swiper-slide>

          <swiper-slide>
            <div class="bg-white" height="500">
              进阶攻略页面
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <!-- 英雄介绍视频弹层 -->
    <van-popup close-icon="close" position="top" v-model="showVideo">
      <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
        <img src="../assets/logo.png" alt="logo" height="30">
        <div class="px-2 flex-1">
          <span>王者荣耀</span>
          <span class="ml-3">攻略站</span>
        </div>
        <router-link to="/" tag="div" class="text-white fs-sm">更多英雄 &gt;</router-link>
      </div>
      <div class="hero-video-container bg-white-3" v-for="(item,i) in model.introductions" :key="i">
        <div class="d-flex py-3 px-2 border-bottom bg-white ai-center">
          <div @click="showVideo = false" class="iconfont icon-back  pb-1 text-blue"></div>
          <strong class="flex-1 fs-lg text-ellipsis pl-2 text-blue">{{item.title}}</strong>
        </div>
        <div class="hero-video m-0" v-html="item.video"></div>
        <div class="p-1 px-2 mr-2 hero-video-info border-bottom border-top  border-right d-flex m-0">
          <img class="hero-avatar" :src="item.hero.avatar" alt="">
          <div class="hero-video-info-sun ml-2 d-flex flex-column flex-1 ">
            <p class="m-0 fs-xl">【王者荣耀】英雄介绍：{{item.hero.name}}</p>
            <p class="m-0 pl-2">投稿：{{item.submit}} 粉丝：{{item.fan}}</p>
            <p class="m-0 pl-2">个性签名：</p>
          </div>
        </div>
        <div class="mt-3 ml-2"><i class="iconfont icon-xihuan-copy"></i> 猜您喜欢</div>

      </div>
    </van-popup>

    <!-- 一图识英雄弹层 -->
    <van-popup position="top" closeable close-icon="close" v-model="showPhoto"><img class="photo" :src="model.photo"
        alt="" @click="showPhoto = false">
    </van-popup>
    <!-- 英雄皮肤弹层 -->
    <van-popup position="top" v-model="showSkins">
      <div class="d-flex py-3 px-2 border-bottom bg-white ai-center">
        <div @click="showSkins = false" class="iconfont icon-back  pb-1 text-blue"></div>
        <strong class="flex-1 fs-lg text-ellipsis pl-2 text-blue">{{model.name}} ·皮肤</strong>
      </div>
      <van-swipe :autoplay="3000" class="skins-container bg-light">
        <van-swipe-item class="d-flex flex-column ai-center" v-for="(item, i) in model.skins" :key="i">
          <img class=" hero-skin p-2" v-lazy="item.photo" />
          <p class="pb-3 fs-xl">{{item.name}}</p>
        </van-swipe-item>
      </van-swipe>

    </van-popup>
  </div>
</template>
<script>
  export default {
    props: {
      id: {
        required: true
      },
    },
    data() {
      return {
        model: {
          introductions: [],
          skills: [],
          skins: [],
          skins2: [],

        },
        showVideo: false,
        showPhoto: false,
        showSkins: false,
        curentSkillIndex: 0,
        tabs: ['英雄初识', '进阶攻略'],
        active: 0,
      }
    },
    computed: {
      curentSkill() {
        return this.model.skills[this.curentSkillIndex]
      }

    },
    methods: {
      async getHero() {
        const res = await this.$http.get(`/heroes/${this.id}`)
        this.model = res.data

      }
    },
    created() {
      this.getHero()
    }
  }
</script>
<style lang="scss">
  @import '../assets/scss/_variables.scss';

  .hero-video-container {
    margin: 0;
    height: 94vh;

    img {
      width: 60px;
      height: auto;

    }

    .hero-video {
      iframe {
        width: 100%;
        height: auto;
      }

      p {
        margin: 0;
        padding: 0;
      }

    }


  }

  .skins-container {
    width: 100%;
    height: 100%;

    img.hero-skin {
      width: 100%;
      height: 100%;
    }
  
  }



  .photo {
    width: 100%;
    height: 100%;

  }

  .stop {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: fixed;
    top: 0;
    z-index: -1;


  }

  .page-hero {


    .top-banner {
      height: 50vw;
      background: #fff no-repeat top center;
      background-size: 100%;



      .ani-1 {
        opacity: 0;
        animation: changePositon 1.5s ease-out;
        -webkit-animation-fill-mode: forwards;
        animation-delay: .3s;
      }

      .ani-2 {
        opacity: 0;
        animation: changePositon 1.5s ease-out;
        -webkit-animation-fill-mode: forwards;
        animation-delay: .5s;
      }

      .ani-3 {
        opacity: 0;
        animation: changePositon 1.5s ease-out;
        -webkit-animation-fill-mode: forwards;
        animation-delay: .7s;
      }

      .ani-4 {
        opacity: 0;
        animation: changePositon 1.5s ease-out;
        -webkit-animation-fill-mode: forwards;
        animation-delay: .9s;
      }


      .show-text {
        animation: changePositon 1.5s ease-out;
      }

      @keyframes changePositon {
        0% {
          opacity: 0;
          transform: translateX(-100px);
        }

        100% {
          opacity: 1;
          transform: none;
        }


      }

    }

    .info {
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));

      .scores {
        .badge {
          margin: 0 0.5rem;
          display: inline-block;
          width: 1rem;
          height: 1rem;
          line-height: .9rem;
          text-align: center;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      }
    }

    .skills {
      img.icon {
        width: 65px;
        border: 3px solid map-get($map: $colors, $key:'white');
        border-radius: 50%;

        &.active {
          border-color: map-get($map: $colors, $key:'primary');


        }

      }

    }

    .hero-items {
      img.icon {
        width: 45px;
        border-radius: 50%;

      }
    }



  }
</style>