<!---欢迎界面-->
<template>
  <div>
    <div class="welcome-container">
      <h1>WELCOME HERE！</h1>
      </div>
  <el-card>
      <h3 class="text">
        本项目地址：
        <a>https://github.com/JakeZhangZJK/vue--node-mongodb-wzry
        </a>
        欢迎star！
      </h3>
      <!-- 笑脸子组件 -->
      <SmallFace></SmallFace>
      </el-card>
        
  </div>
</template>
<script>
  import SmallFace from '../components/SmallFace'
  export default {
    components: {
      SmallFace
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>
<style scoped>
  .welcome-container {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    font-size: 36px;
  }

  .el-card {
    margin: 0 auto;
    width: 100%;
  }

  .text {
    width: 210ch;
    font-size: 16px;
    font: 100% monospace;
    border-right: .08em solid;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    animation: typing 10s  steps(210), blink-caret .5s step-end infinite alternate;
    /**两个动画，第一个控制容器宽度，第二个控制右边框闪烁 */
  }

  @keyframes typing {
    from {
      width: 0;
      display: none;
    }

    to {
      display: block;
    }
  }

  @keyframes blink-caret {
    50% {
      border-color: transparent;
    }
  }
</style>