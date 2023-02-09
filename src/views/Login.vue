<template>
    <div class="login">
        <div class="button" v-if="!show">
            <!-- <el-button class="button-class" @click="changeShow()">
            login
            </el-button> -->
            <div class="item" @click="changeShow()">
                login
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <!-- 盒子动画效果 -->
        <transition name="run">
            <div v-if="show">
                <div class="div1">
                    <div class="div2">
                        <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer">
                            <h3 class="from-title">
                            系统登录
                            </h3>
                            <el-form-item prop="username">
                                <el-input type="text" v-model="loginForm.username" placeholder="亲，请输入用户名" >
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input type="password" v-model="loginForm.password" placeholder="亲，请输入密码" >
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="code">
                                <el-input type="text" auto-complete="false" v-model="loginForm.code" placeholder="点击图片更换验证码" style="width: 250px; margin-right: 5px">
                                </el-input>
                                <img :src="captchaUrl" style="width: 50px; height: 20px;">
                            </el-form-item>
                            <div class="from-button">
                                <el-button type="primary" @click="cannel">取消</el-button>
                                <el-button type="primary" @click="submitLogin">登录</el-button>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    export default {
        name: 'Login',
        data() {
            return {
                show: false,
                captchaUrl: "https://quzhoucity-static.zhihuipk.com/undefined/1666837079973%3D-%3D189edabbc95215728bc8b895db1e068.png",
                loginForm:{
                    username:"admin",
                    password:"ssssss",
                    code:''
                },
                checked: true,
                rules:{
                    username:[{required:true,message:"请输入用户名",trigger:"blur"},{ min: 5, max: 14, message: '长度在 5 到 14 个字符', trigger: 'blur' }
                    ],
                    password:[{required:true,message:"请输入密码",trigger:"blur"},,{ min: 6,  message: '密码长度要大于6', trigger: 'blur' }],
                    code:[{required:true,message:"请输入验证码",trigger:"blur"}],
                }
            };
        },
        methods: {
            changeShow() {
                this.show = !this.show;
                console.log(this.show);
                // this.$router.push({ path: '/index'});
            },
            cannel() {
                this.show = !this.show;
                console.log(this.show);
            },
            submitLogin(){
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.$router.push({ path: '/index'});
                    } else {
                        this.$message.error('登录出错请重新输入');
                        return false;
                    }
                });
            }
        },
        created() {
        }
    }
</script>
<style>
    .login {
        overflow-y: hidden;
        background:url("../assets/img/blogBack2.jpg");
        width:100%;			
        height:100%;			
        position:fixed;
        background-size:100% 100%;
    }
    .div1 {
        margin: auto;
        width: 100%;
    }
    .div2 {
        margin: auto;
        margin-top: 150px;
        width: 400px;
        height: 400px;
        border: 1px solid rgb(134, 134, 134);
        border-radius: 20px;
        background-color: white;
        padding: 15px 35px 15px 35px;
    }
    .button {
        width: 100%;
        margin: auto;
        text-align: center;
        position: fixed;
        bottom: 10%;
    }
    /* --------------------------按钮样式-------------------------- */
    .item {
        position: relative;
        margin: auto;
        width: 300px;
        height: 80px;
        text-align: center;
        line-height: 80px;
        text-transform: uppercase;
        text-decoration: none;
        font-size: 35px;
        letter-spacing: 5px;
        color: aqua;
        overflow: hidden;
        -webkit-box-reflect: below 1px linear-gradient( transparent,rgba(6, 133, 133,0.3));
    }
    .item:hover {
        background-color: aqua;
        box-shadow:0 0 5px aqua,
        0 0 75px aqua,
        0 0 155px aqua;
        color: black;
        cursor: pointer;
    }
    .item span:nth-of-type(1) {
        position: absolute;
        left: -100%; 
        width: 100%;
        height: 3px;
        background-image: linear-gradient(to left,aqua ,transparent);
        animation: shang 1s linear infinite;
    }
    @keyframes shang {
        0%{
            left:-100%;
        }
        50%,100%{
            left:100%;
        }
    }
    .item span:nth-of-type(2) {
        position: absolute;
        top: -100%;
        right: 0;
        width: 3px;
        height: 100%;
        background-image: linear-gradient(to top,aqua ,transparent);
        animation: you 1s linear infinite;
        animation-delay: 0.25s;
    }
    @keyframes you {
        0%{
            top:-100%;
        }
        50%,100%{
            top:100%;
        }
    }
    .item span:nth-of-type(3) {
        position: absolute;
        right: -100%;
        bottom: 0;
        width: 100%;
        height: 3px;
        background-image: linear-gradient(to right,aqua ,transparent);
        animation: xia 1s linear infinite;
        animation-delay: 0.5s;
    }
    @keyframes xia {
        0%{
            right:-100%;
        }
        50%,100%{
            right:100%;
        }
    }
    .item span:nth-of-type(4) {
        position: absolute;
        bottom: -100%;
        left: 0;
        width: 3px;
        height: 100%;
        background-image: linear-gradient(to bottom,aqua ,transparent);
        animation: zuo 1s linear infinite;
        animation-delay: 0.75s;
    }
    @keyframes zuo {
        0%{
            bottom:-100%;
        }
        50%,100%{
            bottom:100%;
        }
    }
    /* --------------------------按钮样式-------------------------- */
    /* --------------------------登录表单样式-------------------------- */
    .from-title{
        margin: 0px auto 48px auto;
        text-align: center;
        font-size: 40px;
    }
    .from-button{
        width: 100%;
        margin: auto;
        text-align: center;
    }
    /* --------------------------登录表单样式-------------------------- */
    /* --------------------------登录表单显示样式-------------------------- */
    .run-enter-active {
        animation: run-scale 0.5s linear 0s;
    }
    /* 离开的时候设置成相反哒 */
    .run-leave-active {
        animation: run-scale 0.5s linear 0s reverse;
    }
    @keyframes run-scale {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(0.5);
        }
        100% {
            transform: scale(1);
        }
    }
    /* --------------------------登录表单显示样式-------------------------- */
</style>