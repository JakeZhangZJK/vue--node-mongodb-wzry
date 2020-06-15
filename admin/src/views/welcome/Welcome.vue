<!---欢迎界面-->
<template>
  <div>
    <div class="welcome-container">
      
      <div class="text-magic" data-word="Welcome Here!">
    Welcome Here!
    <div class="white"></div>
</div>
    </div>
    <h2 class="text">
      源码地址：
      <a href="https://github.com/JakeZhangZJK/vue--node-mongodb-wzry/tree/master/admin">https://github.com/JakeZhangZJK/vue--node-mongodb-wzry/tree/master/admin
      </a>
      欢迎star！
    </h2>
    <!-- 笑脸子组件 -->
    <SmallFace></SmallFace>
  </div>
</template>
<script>
  import SmallFace from '../../components/commom/SmallFace'
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
    overflow: hidden;
  }

  .text {
    width: 205ch;
    margin-top: 150px;
    margin-bottom: 60px;
    font: 100% monospace;
    border-right: .08em solid;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    animation: typing 10s steps(205), blink-caret .5s step-end infinite alternate;
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

.text-magic {
    position: absolute;
    top: 20%;
    left: 63%;
    transform: translate(-50%, -50%) scale(2.4);
    width: 300px;
    font-size:  30px;
    font-family: Raleway, Verdana, Arial;
    color: #000;
}
.white {
    position: absolute;
    left: -10px;
    width: 100%;
    height: 3px;
    background: #fff;
    z-index: 4;
    animation: whiteMove 3s ease-out infinite;
}

.text-magic::before {
    content: attr(data-word);
    position: absolute;
    top: 0;
    left: 0.5px;
    height: 0px;
    color: rgba(0, 0, 0, 0.9);
    overflow: hidden;
    z-index: 2;
    animation: redShadow 1s ease-in infinite;
    filter: contrast(200%);
    text-shadow: 1px 0 0 red;
}

.text-magic::after {
    content: attr(data-word);
    position: absolute;
    top: 0;
    left: -3px;
    height: 36px;
    color: rgba(0, 0, 0, 0.8);
    overflow: hidden;
    z-index: 3;
    background: rgba(255, 255, 255, 0.9);
    animation: redHeight 1.5s ease-out infinite;
    filter: contrast(200%);
    text-shadow: -1px 0 0 cyan;
    mix-blend-mode: darken;
}

@keyframes redShadow {
    20% {
        height: 32px;
    }
    60% {
        height: 6px;
    }
    100% {
        height: 42px;
    }
}

@keyframes redHeight {
    20% {
        height: 42px;
    }
    35% {
        height: 12px;
    }
    50% {
        height: 40px;
    }
    60% {
        height: 20px;
    }
    70% {
        height: 34px;
    }
    80% {
        height: 22px;
    }
    100% {
        height: 0px;
    }
}

@keyframes whiteMove {
    8% {
        top: 38px;
    }
    14% {
        top: 8px;
    }
    20% {
        top: 42px;
    }
    32% {
        top: 2px;
    }
    99% {
        top: 30px;
    }
}
</style>