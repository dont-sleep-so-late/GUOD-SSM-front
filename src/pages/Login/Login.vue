<template>
  <div class="login" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="container">
      <div class="left">
        <div class="header_logo">
          <div class="_logo"><img src="@/assets/login_logo.png" /></div>
          <div class="_title">
            <h2>体育馆管理系统</h2>
            <p>GDOU-SMS</p>
          </div>
        </div>
        <div class="big_logo"></div>
        <div class="foot_logo">
          <div class="foot_title">
            <h2>广东海洋大学</h2>
            <p>GDOU</p>
          </div>
        </div>
      </div>
      <div class="right">
        <el-form :hide-required-asterisk="true" class="form-items" :model="FormData" :rules="rules" ref="FormData">
          <el-form-item prop="username" class="input_lable">
            <h1>用户名</h1>
            <el-input v-model="FormData.username" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="input_lable">
            <h1>密 码</h1>
            <el-input placeholder="请输入密码" v-model="FormData.password" show-password></el-input>
          </el-form-item>
          <el-form-item class="captcha" prop="code">
            <h1>验证码</h1>
            <div class="captchaBox">
              <el-input @keyup.enter.native="login" v-model="FormData.code"></el-input>
              <!-- <Captcha /> -->
              <el-image :src="captchaImg" class="captchaImg" @click="getCaptcha"></el-image>
            </div>
          </el-form-item>
          <el-form-item class="btn_lable">
            <el-button type="primary" @click="login()" v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>
            <el-button type="primary" @click="cleanInput()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
// import Captcha from './Captcha.vue'
export default {
  name: "Login",
  // components: { Captcha },
  data() {
    return {
      FormData: {
        username: '',
        password: '',
        code: '',
        key: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 5, max: 5, message: '长度为 5 个字符', trigger: 'blur' }
        ]
      },
      captchaImg: '',
      fullscreenLoading: false
    };
  },
  created() {
    this.getCaptcha();
  },
  methods: {
    async login() {
      this.$refs.FormData.validate(async (valid) => {
        if (valid) {
          await this.$axios.post('/login?' + qs.stringify(this.FormData)).then(res => {
            const jwt = res.headers['authorization'];
            this.$store.commit('SET_TOKEN', jwt);
            this.getUserInfo();
            this.fullscreenLoading = true;
            setTimeout(() => {
              this.fullscreenLoading = false;
              let message = "登录成功，欢迎 " + window.sessionStorage.getItem("username");
              this.$message({
                message: message,
                type: 'success'
              })
              this.$router.replace('/index').catch((err) => { this.$router.replace('/index').catch((err) => { }) })
            }, 1000);
          }).catch(res => {
            this.getCaptcha();
          })
        } else {
          this.$message({
            message: '登录失败',
            type: 'warning'
          })
          return false;
        }
      });

    },

    async getUserInfo() {
      await this.$axios.get("/sys/userInfo").then(res => {
        window.sessionStorage.setItem("userId", res.data.data.id);
        window.sessionStorage.setItem("username", res.data.data.username);
        window.sessionStorage.setItem("avatar", res.data.data.avatar);
      })
    },
    forget() {
      this.$message.info("忘记密码");
    },
    cleanInput() {
      console.log(this.$refs);
      this.$refs.FormData.resetFields();
    },
    getCaptcha() {
      this.$axios.get('/captcha').then(res => {
        this.FormData.key = res.data.data.key;
        this.captchaImg = res.data.data.captchaImg;
        this.FormData.code = '';
      })
    },
  },
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url(@/assets/login_bg.png);
  background-size: 100% 100%;

  /* 居中 */
  display: flex;
  /* 主轴居中 */
  justify-content: center;
  /* 侧轴居中 */
  align-items: center;
}

.container {
  width: 1178px;
  height: 650px;
  /* 自动布局 */
  display: flex;
  flex-direction: row;
  transition: all 1s;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.08),
    0px 2px 6px 0px rgba(0, 0, 0, 0.06), 0px 4px 8px 2px rgba(0, 0, 0, 0.04);
}

.container_active {
  flex-direction: row-reverse;
}

.left {
  width: 32%;
  height: 100%;
  background: url(@/assets/login_left.png) no-repeat;
  display: flex;
  justify-content: center;
  position: relative;
}

.header_logo {
  display: flex;
}

._logo {
  padding: 20px 20px;
}

._title {
  padding-top: 20px;
  color: #fff;
}

._title p {
  color: rgb(230, 230, 230);
  text-indent: 2.5em;
}

.foot_logo {
  position: absolute;
  bottom: 2%;
  left: 0;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  color: #fff;
}

.foot_logo p {
  color: rgb(230, 230, 230);
  text-indent: 3em;
}

.right {
  width: 800px;
  height: 100%;
  background-color: #fff;
}

.form-items {
  padding: 140px 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}


.loginClassFlag {
  padding: 70px 200px;
}


.captcha h1 {
  display: block;
}

.captchaBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.captcha .el-input {
  width: 60%;
}

.captcha .captchaImg {
  border-radius: 4px;
}


.form-items .el-button {
  width: 195px;
  border-radius: 5px;
}

.btn_lable {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
}

.remember_forget {
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.remember_forget .el-button {
  border: none;
  width: 80px;
  margin-left: 200px;
}

.remember_forget .el-button:hover {
  background-color: #fff;
}

@media (width <=1176px) {
  .left {
    display: none;
  }

  .right {
    margin: 0 auto;
    transition: all linear 1s;
  }
}
</style>