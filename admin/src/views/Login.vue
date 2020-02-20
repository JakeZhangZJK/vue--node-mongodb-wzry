<template>
  <div class="login-container">

    <div class="overlay"></div>
    <el-card header="管理员登录" class="box-card login-card" shadow="hover">
      <el-form @submit.native.prevent="login">
        <el-form-item>
          <el-input class="login-input" v-model="model.username" prefix-icon="el-icon-user" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" class="login-input" v-model="model.password" prefix-icon="el-icon-unlock"
            show-password>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        model: {},


      }
    },
    methods: {
      async login() {
        const res = await this.$http.post('login', this.model)
        // sessionStorage.token = res.data.token
        localStorage.token = res.data.token;
        const username = res.data.user.username;
        this.$router.push('/')
        this.$message({
          type: 'success',
          message: username + '，欢迎您！'
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .login-container {
    margin: 0;
    padding: 0;
    height: 99.5vh;
    // background: url("../assets/images/bg.gif") 50% 50% no-repeat;
    
    background-size: cover;
    z-index: 2;

    .login-header {
      width: 100%;
      text-align: center;

      color: rgb(255, 255, 255);
    }

    .overlay {
      height: 99.5vh;
      margin: 0;
      padding: 0;
      background-color: rgba(36, 40, 46, 0.6);
      overflow: hidden;
      background-image: linear-gradient(125deg, #324252, #27ae76, #2980b9, #e74c3c, #8e44ad);
      background-size: 400%;
      animation: bganimation 15s infinite;

      .title {
        // margin-top: 10rem;
        margin-top: 4rem;
      }

      h1 {
        margin: 0;
        word-spacing: 3rem;
      }

    }


  }

  .login-card {

    background-color: rgba(26, 25, 25, 0.5) !important;
    border: 1px solid rgba(165, 159, 159, 0.5) !important;
    color: rgb(204, 221, 236);
    width: 25rem;
    margin: 8rem auto;
    margin-top: -35rem;
    box-shadow: 3px;
    z-index: 999;

  }

  .login-btn {
    width: 22.5rem;
    background-color: rgba(16, 177, 142, 0.5) !important;


  }

  @keyframes bganimation {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }
</style>
<style>
  .login-card .el-input__inner {
    color: rgb(204, 221, 236);
    background-color: rgba(26, 25, 25, 0.1) !important;
    background-image: none;
    border-radius: 4px;
    border: 1px solid rgba(165, 159, 159, 0.8) !important;

  }
</style>