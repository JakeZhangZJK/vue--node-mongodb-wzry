<template>
<el-container class="longin-main" style="height: 100vh; ">
  <el-main>
  <div class="login-container">
        <el-card header="管理员登录" class="login-card">
            <el-form @submit.native.prevent="login">
                <el-form-item>
                    <el-input class="login-inputorbuttom" v-model="model.username" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input class="login-inputorbuttom" type="password" v-model="model.password" prefix-icon="el-icon-unlock" show-password>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="login-btn" type="primary" native-type="submit">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
  </el-main>
</el-container>

  
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
<style scoped>
.longin-main{
    background-image: url('../assets/images/back.jpg')
}
    .login-card {
        width: 25rem;
        margin: 0 auto;
        margin-top: 10rem;
        box-shadow: 1rem;
    }

    .login-card .login-btn {
        width: 22.5rem;
    }
   
</style>