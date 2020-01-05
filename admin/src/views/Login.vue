<!---->
<template>
    <div class="login-container">
        <el-card header="请先登录" class="login-card">
            <el-form @submit.native.prevent="login">
                <el-form-item>
                    <el-input class="input" v-model="model.username" prefix-icon="el-icon-user" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input class="input"  v-model="model.password" prefix-icon="el-icon-unlock"  show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="login-btn" type="warning" plain  native-type="submit">登录</el-button>
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
           login(){
              
           }
        }
    }
</script>
<style scoped>

.login-container{
    height: 45rem;
	position: relative;
    background-image: url('../assets/img/bg.jpg');
    background-position: 50% 50%;
	background-size: cover;
	background-repeat: no-repeat;
	margin-left: auto;
    margin-right: auto;
    overflow: hidden;
}
    .login-card{
        background-color: rgba(125, 125, 139, 0.6);
        width: 25rem;
        margin: 8rem auto;
        margin-top: 10rem;
        box-shadow: 1rem;
        color: aliceblue;
    }
   
   .login-card  .login-btn{
       width:22.5rem;

   }
</style>