<template>
    <div>
           <!-- 滑块验证码弹窗 -->
      <el-popover ref="popover" width='350' height='300' v-model="visible">
        <div class="slider-pictures">
          <!-- 画布容器 -->
          <div class="canvas-container">
            <canvas id="sliderBlock"></canvas>
            <canvas id="blockImg"></canvas>
          </div>
          <!-- 滑块区 -->
          <div class="slider">
            <div class="track" :class="{ pintuTrue: puzzle }"> {{tip}}</div>
            <div class="button el-icon-s-tools" @mousedown.prevent="drag"></div>
          </div>
          <!-- 底部关闭和刷新 -->
          <div class="operation">
            <span class="el-icon-close" title="关闭验证码" @click="visible = false"></span>
            <span class="el-icon-refresh-left" title="刷新验证码" @click="canvasInit"></span>
          </div>
        </div>
      </el-popover>
    </div>
</template>
<script>
export default {
    data() {
      return{
           visible: false, //是否显示弹窗
         tip: "拖动上方滑块完成拼图",
      logindata: {
        username: "",
        password: "",
        verificationCode: ""
      },
      rules: {
        username: [{ required: true, message: "请填写密码" }],
        password: [{ required: true, message: "请填写密码" }]
      },
      //滑块x轴数据
      slider: {
        mx: 0,
        bx: 0
      },
      //拼图是否正确
      puzzle: false,
      }
    },
    methods:{
          // 登录按钮
    loginButton() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.visible = true;
          this.puzzle = false;
          this.tip = "拖动上方滑块完成拼图";
        }
      });
    },
     //拼图验证码初始化
    canvasInit() {
      //生成指定区间的随机数
      const random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
      };
      //x: 254, y: 109
      let mx = random(127, 234),
        bx = random(10, 97),
        y = random(10, 99);
      this.slider = { mx, bx };
      this.draw(mx, bx, y);
    },

    draw(mx = 200, bx = 20, y = 50) {
      let mainDom = document.querySelector("#blockImg");
      let bg = mainDom.getContext("2d");
      let width = mainDom.width;
      let height = mainDom.height;
      let blockDom = document.querySelector("#sliderBlock");
      let block = blockDom.getContext("2d");
      //重新赋值，让canvas进行重新绘制
      blockDom.height = height;
      mainDom.height = height;
      // 随机生成图库中背景图片的index
      let imgIndex = Math.floor(Math.random()* 8+1);
      let imgsrc = require(`../assets/images/match-${imgIndex}.jpg`);
      let img = document.createElement("img");
      img.style.objectFit = "scale-down";
      img.src = imgsrc;
      img.onload = function() {
        bg.drawImage(img, 0, 0, width, height);
        block.drawImage(img, 0, 0, width, height);
      };
      let mainxy = { x: mx, y: y, r: 9 };
      let blockxy = { x: bx, y: y, r: 9 };
      this.drawBlock(bg, mainxy, "fill");
      this.drawBlock(block, blockxy, "clip");
    },
    //绘制拼图
    drawBlock(ctx, xy = { x: 254, y: 109, r: 9 }, type) {
      let x = xy.x,
        y = xy.y,
        r = xy.r,
        w = 40;
      let PI = Math.PI;
      //绘制
      ctx.beginPath();
      //left
      ctx.moveTo(x, y);
      //top
      ctx.arc(x + (w + 5) / 2, y, r, -PI, 0, true);
      ctx.lineTo(x + w + 5, y);
      //right
      ctx.arc(x + w + 5, y + w / 2, r, 1.5 * PI, 0.5 * PI, false);
      ctx.lineTo(x + w + 5, y + w);
      //bottom
      ctx.arc(x + (w + 5) / 2, y + w, r, 0, PI, false);
      ctx.lineTo(x, y + w);
      ctx.arc(x, y + w / 2, r, 0.5 * PI, 1.5 * PI, true);
      ctx.lineTo(x, y);
      //加点边框和背景颜色，美化一下
      ctx.lineWidth = 1;
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
      ctx.stroke();
      ctx[type]();
      ctx.globalCompositeOperation = "xor";
    },

     //鼠标按下
    drag(e) {
      //console.log("鼠标按下", e);
      let dom = e.target; //dom元素
      let slider = document.querySelector("#sliderBlock"); //滑块dom
      const downCoordinate = { x: e.x, y: e.y };
      //正确的滑块数据
      let checkx = Number(this.slider.mx) - Number(this.slider.bx);
      //x轴数据
      let x = 0;
      const move = moveEV => {
        x = moveEV.x - downCoordinate.x;
        //y = moveEV.y - downCoordinate.y;
        if (x >= 251 || x <= 0) return false;
        dom.style.left = x + "px";
        //dom.style.top = y + "px";
        slider.style.left = x + "px";
      };
      const up = e => {
        console.log(e.x - downCoordinate.x, checkx);
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
        dom.style.left = "";
        // 实际滑动会偏小，进行偏移
        let max = checkx - 5;
        let min = checkx - 10;
        // 采用点击距离和最终离开距离计算滑动距离
        let movex = e.x - downCoordinate.x;
        console.log(max, movex, min);
        //允许正负误差1
        if ((max >= movex && movex >= min) || movex === checkx) {
          // console.log("滑动解锁成功");
          this.puzzle = true;
          this.tip = "滑动解锁成功";
          setTimeout(() => {
            this.visible = false;
          }, 300);
          this.login(); // 登录函数
        } else {
          // console.log("拼图位置不正确");
          this.tip = "验证失败，请重试";
          this.puzzle = false;
          this.canvasInit();
        }
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    },
    }
}
</script>
<style lang="scss">
 // 滑块验证码弹窗的样式
 .el-popover{
   padding: 3px;
 }
.slider-pictures {
  width: 100%;
  height: 273px;
  .canvas-container {
    width: 100%;
    height: 170px;
    #blockImg,
    #sliderBlock {
      margin:0;
      padding: 0;
      width: inherit;
      height: inherit;
    }
    #sliderBlock {
      position: absolute;
      z-index: 999;
    }
  }
  .slider {
    width: 100%;
    height: 65px;
    border-bottom: #c7c9d0 1px solid;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .track {
      margin-left: 7px;
      width: 286px;
      height: 38px;
      background: rgba(11, 180, 185, 0.5);
      border-radius: 25px;
      font-size: 14px;
      line-height: 38px;
      padding-right: 15px;
      padding-left: 70px;
    }
    .pintuTrue {
      background: rgba(11, 226, 11, 0.7);
      color: #ffffff;
    }
    .button {
      position: absolute;
      width: 50px;
      height: 50px;
      line-height: 48px;
      background: #ffffff;
      box-shadow: #b9bdc8 0 0 3px;
      border-radius: 50%;
      left: 7px;
      text-align: center;
      font-size: 28px;
      color:rgba(11, 180, 185, 0.7);
      &:hover {
        color: rgba(9, 134, 65, 0.7);
      }
    }
  }
  .operation {
    width: 100%;
    height: 40px;
    > span {
      color: #9fa3ac;
      display: inline-block;
      width: 40px;
      font-size: 25px;
      line-height: 40px;
      text-align: center;
      &:hover {
        background: #e2e8f5;
      }
    }
  }

  }
</style>