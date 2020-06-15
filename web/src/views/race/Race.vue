<template>
  <div>
    <scroll
      v-if="information"
      class="scroll"
      scroll-x
      :probe-type="3"
      click
      pullUpLoad
      ref="raceScroll"
      @pullingUp="pullingUp"
    >
      <div class="container">
        <div class="nav">
          <ul class="fs13">
            <li
              :style="currentNavIndex===i?{'border-color':'#d59b40',color:'#d59b40'}:{}"
              v-for="(item,i) in information"
              :key="item._id"
              @click="navClick(i)"
            >{{item.name}}</li>
          </ul>
        </div>
        <swiper :options="{autoHeight: true}" ref="raceSwiper" @slide-change="slideChange">
          <swiper-slide v-for="item in information" :key="item._id">
            <div class="race_content">
              <p>
                <span class="race_title">{{item.desc}}</span>
                <span class="race_type fs12">官方举办</span>
              </p>
              <img :src="item.img" />
              <p class="news">赛事资讯</p>
              <ul class="information_list">
                <li v-for="information in item.information_list" :key="information._id">
                  <a :href="information.url">
                    <span class="i_title t-ellipsis fs14 fc-3">{{information.title}}</span>
                    <span class="i_time r">{{information.date}}</span>
                  </a>
                </li>
              </ul>
              <h3 class="load-more t-center fs13">{{isSeeMore?"已显示全部内容":isLoding?"加载中...":"上拉加载更多"}}</h3>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </scroll>
  </div>
</template>
 
<script>
import { getInformation } from 'network/race'

import Card from 'components/content/Card'
import Scroll from '../../components/common/scroll/Scroll'

export default {
  name: "Race",
  components: {
    Card,
    Scroll
  },
  computed: {
    scroll() {
      return this.$refs.raceScroll.scroll
    },
  },
  data() {
    return {
      information: null,
      currentNavIndex: 0,
      pageNum: 1,
      isSeeMore: false,
      isLoding: false
    }
  },
  methods: {
    async getInformation() {
      const res = await getInformation()
      if (!res) return
      this.information = res.data
      // console.log(res.data);
    },
    navClick(i) {
      this.$refs.raceSwiper.swiper.slideTo(i)
      this.currentNavIndex = i
      if (this.information[this.currentNavIndex].information_list.length > 50) {
        this.pageNum = 5
        this.isSeeMore = false
      } else if (this.information[this.currentNavIndex].information_list.length <= 50 && this.information[this.currentNavIndex].information_list.length > 40) {
        this.pageNum = 4
        this.isSeeMore = false
        this.scroll.finishPullUp()
      }
      else if (this.information[this.currentNavIndex].information_list.length <= 30 && this.information[this.currentNavIndex].information_list.length > 20) {
        this.pageNum = 3
        this.isSeeMore = false
        this.scroll.finishPullUp()
      }
      else if (this.information[this.currentNavIndex].information_list.length <= 20 && this.information[this.currentNavIndex].information_list.length > 10) {
        this.pageNum = 2
        this.isSeeMore = false
        this.scroll.finishPullUp()
      } else {
        this.pageNum = 1
        this.isSeeMore = false
        this.scroll.finishPullUp()
      }
    },
    slideChange() {
      this.currentNavIndex = this.$refs.raceSwiper.swiper.realIndex
      if (this.information[this.currentNavIndex].information_list.length > 50) {
        this.pageNum = 5
        this.isSeeMore = false
      } else if (this.information[this.currentNavIndex].information_list.length <= 50 && this.information[this.currentNavIndex].information_list.length > 40) {
        this.pageNum = 4
        this.isSeeMore = false
        this.scroll.finishPullUp()
      }
      else if (this.information[this.currentNavIndex].information_list.length <= 30 && this.information[this.currentNavIndex].information_list.length > 20) {
        this.pageNum = 3
        this.isSeeMore = false
        this.scroll.finishPullUp()
      }
      else if (this.information[this.currentNavIndex].information_list.length <= 20 && this.information[this.currentNavIndex].information_list.length > 10) {
        this.pageNum = 2
        this.isSeeMore = false
        this.scroll.finishPullUp()
      } else {
        this.pageNum = 1
        this.isSeeMore = false
        this.scroll.finishPullUp()
      }
    },
    async pullingUp() {
      this.scroll.refresh()
      this.isLoding = true
      const res = await getInformation({
        id: this.information[this.currentNavIndex]._id,
        pageNum: this.pageNum
      })
      this.isLoding = false
      // return
      // 如果拿到结果则让页数＋1，并重启下拉加载事件
      // 如果服务器出现错误，则重启下拉加载事件
      // 如果没有更多数据或页数等于3时，则终止下拉加载
      if (!res) return this.scroll.finishPullUp()
      if (res.data.length === 0) return this.isSeeMore = true

      this.information[this.currentNavIndex].information_list.push(...res.data)
      this.scroll.refresh()
      this.scroll.finishPullUp()

      this.pageNum++
    }
  },
  created() {
    this.getInformation()
  }
}
</script>
 
<style lang="scss" scoped>
.scroll {
  height: calc(100vh - 3.48rem);
  overflow: hidden;
}
.container {
  background-color: #f1f1f1;
  .nav {
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    ul {
      height: 1.792rem;
      padding: 0 0.4rem;
      line-height: 1.672rem;
      white-space: nowrap;
      li {
        display: inline-block;
        margin-right: 1.2rem;
        border-bottom: 0.12rem solid transparent;
      }
    }
  }
  .race_content {
    p {
      width: 100%;
      padding: 0 0.35rem;
      margin-top: 0.6rem;
      .race_title {
        font-size: 0.7rem;
        font-weight: bold;
        color: #00adff;
      }
      .race_type {
        padding: 0.5% 2%;
        margin-left: 4%;
        border: 0.04rem solid #a2a2a2;
        border-radius: 2rem;
        color: #a2a2a2;
      }
    }
    img {
      width: 100%;
      height: 8.4rem;
      margin-top: 0.56rem;
      vertical-align: middle;
    }
    .news {
      text-align: center;
      height: 1.14rem;
      line-height: 1.14rem;
      margin: 0.3732rem 0;
      color: #a2a2a2;
      background: #e4e4e4;
    }
    .information_list {
      width: 100%;
      padding: 0 0.28rem;
      li {
        a {
          display: block;
          width: 100%;
          height: 1.232rem;
          line-height: 1.232rem;
          .i_title {
            display: inline-block;
            width: 85%;
          }
          .i_time {
            color: #9e9e9e;
          }
        }
      }
    }
    .load-more {
      height: 1.3rem;
      margin: 0 0.28rem 0.4rem;
      background-color: #e6e6e6;
      border-radius: 0.56rem;
      line-height: 1.3rem;
      color: #858587;
    }
  }
}
</style>