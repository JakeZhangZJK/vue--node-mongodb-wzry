<template>
  <div    @mousemove="moveEye()" >
    <div class="face show">
      <div class="eyes">
        <div class="eye" ref="eye1"></div>
        <div class="eye" ref="eye2"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        active:''
      }
    },
    methods: {
      moveEye(){
          let eye1 = this.$refs.eye1 // 获取dom元素
          let eye2 = this.$refs.eye2
          let x = (eye1.getBoundingClientRect().left) + (eye1.clientWidth / 2);
          let y = (eye1.getBoundingClientRect().top) + (eye1.clientHeight / 2);
          let radian = Math.atan2(event.pageX - x,event.pageY - y);
          let rot = (radian * (180 / Math.PI)* -1)+270;
          eye1.style.transform = `rotate(${rot}deg)`;

           let x2 = (eye2.getBoundingClientRect().left) + (eye2.clientWidth / 2);
          let y2 = (eye2.getBoundingClientRect().top) + (eye2.clientHeight / 2);
          let radian2 = Math.atan2(event.pageX - x2,event.pageY - y2);
          let rot2 = (radian2 * (180 / Math.PI)* -1)+270;
          eye2.style.transform = `rotate(${rot2}deg)`;

      }
    }
  }
</script>
<style scoped>
  .face {
    position: relative;
    margin: 0 auto;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background-color: #fdb933;
    display: flex;
    justify-content: center;
    align-items: center
  }

  .face::before {
    content: '';
    position: absolute;
    top: 180px;
    width: 150px;
    height: 70px;
    background-color: #b57700;
    border-bottom-left-radius: 70px;
    border-bottom-right-radius: 70px;
    transition: .5s;
  }

  .face:hover::before {
    top: 210px;
    width: 150px;
    height: 20px;
    background-color: #b57700;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .eyes {
    position: relative;
    top: -40px;
    display: flex;

  }
  .eyes .eye{
    position: relative;
    width: 80px;
    height: 80px;
    display: block;
    background-color: #fff;
    margin: 0 15px;
    border-radius: 50%;
  }
  .eyes .eye::before{
    content: '';
    position: absolute;
    top:50%;
    left: 25px;
    width: 40px;
    height: 40px;
    transform: translate(-50%,-50%);
    background-color: #333;
    border-radius: 50%;
  }
  .show{
 opacity: 0;
        animation: showFace 1.5s ease-out;
        -webkit-animation-fill-mode: forwards;
        animation-delay: 10s;
  }
  @keyframes showFace{
     0% {
          opacity: 0;
          transform: translateY(-100px);
        }

        100% {
          opacity: 1;
          transform: none;
        }
  }
</style>