<template>
  <div id="nav-bar" class="d-flex jc-around fc-w" :style="style">
    <div class="nav-item flex1" v-for="(item,i) in titles" :key="i" @click="navBarClick(i)">
      <slot :i="i" :title="item">
        <span :class="{ active:  item.path === currentPath }">{{item.title}}</span>
      </slot>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "NavBar",
  props: {
    titles: {
      type: Array,
      default() {
        return [
          {
            title: '首页',
            path: '/home'
          },
          {
            title: '攻略中心',
            path: '/strategy'
          },
          {
            title: '赛事中心',
            path: '/race'
          }]
      }
    },
    backgroundColor: {
      type: String,
      default: '#db9e3f'
    },
    height: {
      type: String,
      default: ''
    }
  },
  computed: {
    style() {
      return {
        'height': this.height,
        'background-color': this.backgroundColor,
        'line-height': this.height
      }
    }
  },
  data() {
    return {
      currentPath: ''
    }
  },
  methods: {
    navBarClick(i) {
      this.$emit('navBarClick', i)

      switch (i) {
        case 0: {
          // this.currentPath = '/home'
          this.$route.path !== '/home' && this.$router.push('/home')
          break
        }
        case 1: {
          // this.currentPath = '/strategy'
          this.$route.path !== '/strategy' && this.$router.push('/strategy')
          break
        }
        case 2: {
          // this.currentPath = '/race'
          this.$route.path !== '/race' && this.$router.push('/race')
          break
        }
      }

    }
  },
  watch: {
    $route() {
      this.currentPath = this.$route.path
    }
  },
  created() {
    this.currentPath = this.$route.path
  }
}
</script>
 
<style lang="scss" scoped>
#nav-bar {
  width: 100%;
  font-size: 0.52rem;
  text-align: center;
  .nav-item {
    height: 100%;
    span {
      padding-bottom: 0.08rem;
    }
  }
}
.active {
  border-bottom: 0.12rem solid;
}
.primary {
  color: #db9e3f;
  border-bottom: 0.12rem solid;
}
</style>