<template>
  <div class="login">
    <div class="container" :class="{ container_active: registerFlag }">
      <div class="left">
        <div class="header_logo">
          <div class="_logo"><img src="../assets/login_logo.png" /></div>
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
        <div class="form-items" :class="{ loginClassFlag: !registerFlag }" v-show="!registerFlag">
          <div class="input_lable">
            <h1>用户名</h1>
            <el-input v-model="FormData.account" placeholder="请输入账号"></el-input>
          </div>
          <div class="input_lable">
            <h1>密码</h1>
            <el-input placeholder="请输入密码" v-model="FormData.password" show-password></el-input>
          </div>
          <div class="btn_lable">
            <el-button type="primary" @click="login()">登录</el-button>
            <el-button type="primary" @click="registerFlag = !registerFlag">注册</el-button>
          </div>
          <div class="remember_forget">
            <el-checkbox v-model="checked">记住密码</el-checkbox>
            <p @click="forget()">忘记密码?</p>
          </div>
        </div>
        <div class="form-items" v-show="registerFlag">
          <div class="input_lable">
            <h1>用户名</h1>
            <el-input v-model="FormData.account" placeholder="请输入账号"></el-input>
          </div>
          <div class="input_lable">
            <h1>邮箱地址</h1>
            <el-input v-model="FormData.account" placeholder="请输入邮箱"></el-input>
          </div>
          <div class="input_lable">
            <h1>密码</h1>
            <el-input placeholder="请输入密码" v-model="FormData.password" show-password></el-input>
          </div>
          <div class="input_lable">
            <h1>确认密码</h1>
            <el-input placeholder="请输入密码" v-model="FormData.password" show-password></el-input>
          </div>
          <div class="btn_lable">
            <el-button @click="registerFlag = !registerFlag">返回</el-button>
            <el-button type="primary" @click="register()">注册</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      checked: false,
      registerFlag: false,
      FormData: {
        account: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.$router.push("/layout");
    },
    register() {
      this.$message.info("注册");
    },
    forget() {
      this.$message.info("忘记密码");
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
  background: url(../assets/login_bg.png);
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
  background: url(../assets/login_left.png) no-repeat;
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
  padding: 80px 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

.loginClassFlag {
  padding: 150px 200px;
}

.input_lable {
  margin-top: 20px;
}

.form-items .el-button {
  margin-top: 2%;
  width: 180px;
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

.remember_forget p {
  cursor: pointer;
  font-size: 14px;
  color: #409eff;
}

.remember_forget p:hover {
  color: #0481ff;
}
</style>