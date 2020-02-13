<template>
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
          <router-link to="/" tag="span" class="text-grey fs-sm  show-text">
            皮肤: 2 &gt;
          </router-link>
        </div>
      </div>
    </div>
    <!-- top-banner end -->
    <div>
      <div class="px-3 bg-white">
        <div class="nav d-flex jc-around pt-3 pb-2 border-bottom">
          <div class="nav-item active">
            <div class="nav-link">英雄初识</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">进阶攻略</div>
          </div>
        </div>
      </div>
      <swiper>
        <swiper-slide>
          <div>
            <div class="p-3 bg-white border-bottom">
              <div class="d-flex ">
                <router-link tag="div" to="/" class="btn btn-lg flex-1 ">
                  <i class="iconfont icon-vidoe"></i>
                  英雄介绍视频
                </router-link>
                <router-link tag="div" to="/" class="btn btn-lg ml-2 flex-1 ">
                  <i class="iconfont icon-tupian"></i>
                  一图识别英雄
                </router-link>
              </div>
              <div class="skills mt-4">
                <div class="d-flex jc-around bb">
                  <img class="icon" v-for="(item,i) in model.skills" :key="item.name" :class="{active:curentSkillIndex === i}" :src="item.icon"
                     alt="" @click="curentSkillIndex = i">
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
             <m-card plain icon="menu" title="使用技巧"><p class="m-0">{{model.usageTips}}</p></m-card>
              <m-card plain icon="VS" title="对抗技巧"><p class="m-0">{{model.battleTips}}</p></m-card>
               <m-card plain icon="idea" title="团战思路"><p class="m-0">{{model.teamTips}}</p></m-card>
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
                 <div class=" pb-2" v-for="(item,i) in model.partners" :key="i">
                   <div class="d-flex  ai-cenetr pt-3">
                     <img :src="item.hero.avatar" alt="" height="50">
                     <p class="m-0 ml-3 flex-1">{{item.description}}</p>
                   </div>
                 </div>
                 <div class="border-bottom"></div>
                   <div class="fs-xl mt-3">克制谁</div>
                 <div class="pb-2" v-for="(item,i) in model.partners" :key="i">
                   <div class="d-flex  ai-cenetr pt-3">
                     <img :src="item.hero.avatar" alt="" height="50">
                     <p class="m-0 ml-3 flex-1">{{item.description}}</p>
                   </div>
                 </div>
               </m-card>
          </div>
        </swiper-slide>

        <swiper-slide><div>
          进阶攻略页面
        </div></swiper-slide>
      </swiper>
    </div>
  </div>

</template>
<script>
  export default {
    props: {
      id: {
        required: true
      },
    },
    data () {
      return {
        model: null,
        curentSkillIndex: 0,
      }
    },
    computed:{
      curentSkill(){
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

// top banner animotion

  .page-hero {
    .top-banner {
      height: 50vw;
      background: #fff no-repeat top center;
      background-size: 100%;
      .ani-1{
        opacity: 0;
         animation: changePositon 2s ease-out;
        -webkit-animation-fill-mode: forwards;
        animation-delay: .5s;
      }
       .ani-2{
         opacity: 0;
         animation: changePositon 2s ease-out;
        -webkit-animation-fill-mode: forwards;
        animation-delay: .7s;
      }
       .ani-3{
         opacity: 0;
         animation: changePositon 2s ease-out;
        -webkit-animation-fill-mode: forwards;
        animation-delay: .9s;
      }
       .ani-4{
         opacity: 0;
         animation: changePositon 2s ease-out;
        -webkit-animation-fill-mode: forwards;
        animation-delay: 1.1s;
      }
    
     
      .show-text{
        animation: changePositon 2s ease-out;
      }
    
      @keyframes changePositon {
        0%{
          opacity: 0;
          transform: translateX(-100px);
        }
        100%{
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
    .skills{
     img.icon{
        width:65px;
        border: 3px solid map-get($map: $colors, $key:'white' );
        border-radius: 50%;
        &.active{
        border-color: map-get($map: $colors, $key:'primary' );
        

      }

      }
     
    }
    .hero-items{
      img.icon{
        width: 45px;
        border-radius: 50%;

      }
    }
    
  }
  
</style>