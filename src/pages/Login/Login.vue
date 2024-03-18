<template>
  <div class="login">
    <div class="container" :class="{ container_active: registerFlag }">
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
        <div class="form-items" :class="{ loginClassFlag: !registerFlag }" v-show="!registerFlag">
          <div class="input_lable">
            <h1>用户名</h1>
            <el-input v-model="FormData.username" placeholder="请输入账号"></el-input>
          </div>
          <div class="input_lable">
            <h1>密码</h1>
            <el-input placeholder="请输入密码" v-model="FormData.password" show-password></el-input>
          </div>
          <div label="验证码" prop="code" style="width: 380px;">
            <el-input v-model="FormData.code" style="width: 172px; float: left"></el-input>
            <!-- <Captcha /> -->
            <el-image :src="captchaImg" class="captchaImg" @click="getCaptcha"></el-image>
          </div>
          <div class="btn_lable">
            <el-button type="primary" @click="login()">登录</el-button>
            <!-- <el-button type="primary" @click="registerFlag = !registerFlag">注册</el-button> -->
          </div>
          <div class="remember_forget">
            <el-checkbox v-model="checked">记住密码</el-checkbox>
            <p @click="forget()">忘记密码?</p>
          </div>
        </div>
        <!-- <div class="form-items" v-show="registerFlag">
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
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
// import Captcha from './Captcha.vue'

export default {

  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  // components: { Captcha },
  data() {
    return {
      checked: false,
      registerFlag: false,
      FormData: {
        username: '',
        password: '',
        code: '',
        key: ''
      },
      captchaImg: null
    };
  },
  created() {
    this.getCaptcha();
  },
  mounted() {
    this.draw();
  },
  methods: {
    login() {
      this.$axios.post('/login?' + qs.stringify(this.FormData)).then(res => {
        const jwt = res.headers['authorization'];
        this.$store.commit('SET_TOKEN', jwt);
        this.$router.push("/index");
      }).catch(res => {
        this.$message.error(res.data);
        this.getCaptcha();
      })
    },
    register() {
      this.$message.info("注册");
    },
    forget() {
      this.$message.info("忘记密码");
    },
    getCaptcha() {
      this.$axios.get('/captcha').then(res => {
        this.FormData.key = res.data.data.key;
        this.captchaImg = res.data.data.captchaImg;
        this.FormData.code = '';
      })
    },
    draw() {
      let canvas = document.querySelector("#draw")
      let yuan = canvas.getContext("2d");
      let arr = [];
      window.onresize = resizeCanvas;
      function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      resizeCanvas();
      /* 绘制小圆形的方法，x与y是初始位置，r是圆半径 */
      function circle(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        /* 得一个随机颜色 */
        this.color = `rgba(${Math.floor(Math.random() * 255)},
                          ${Math.floor(Math.random() * 255)},
                          ${Math.floor(Math.random() * 255)}, 0.2)`;
        /* 圆的移动方向，random函数为随机返回一个0.0到1.0的数，x可得随机正负数，y为随机正数 */
        this.xMove = parseInt(Math.random() * 10 - 5);
        this.yMove = parseInt(Math.random() * 10);
        /* 向arr数组末尾添加这个元素 */
        arr.push(this);

        /* 渲染小圆 */
        this.render = function () {
          yuan.beginPath();
          yuan.arc(this.x, this.y, this.r, 0, 2 * 3.14, false);
          yuan.fillStyle = this.color;
          // yuan.stroke();
          yuan.fill();
        };

        /* 更新圆形的方法 */
        this.updated = function () {
          this.x = this.x + this.xMove;
          this.y = this.y + this.yMove;
          /* 半径慢慢减少 */
          this.r = this.r - 0.08;
          /* 当半径小于1清除这个圆 */
          if (this.r < 0) {
            this.remove();
          }
        };
        /* 删除小圆的函数 */
        this.remove = function () {
          for (let i = 0; i < arr.length; i++) {
            if (this == arr[i]) {
              arr.splice(i, 1);
            }
          }
        };
      }
      /* 给画布绑定鼠标经过事件 */
      canvas.addEventListener("mousemove", function (e) {
        /* 传入x，y，r。offsetX距离左侧距离，..， */
        new circle(e.offsetX, e.offsetY, 10);
      });

      /* 定时器渲染小圆，开始动画 ，30毫秒一次 */
      setInterval(function () {

        /* 清屏 */
        yuan.clearRect(0, 0, canvas.width, canvas.height);
        /* 循环数组，给每个小圆更新和渲染 */
        for (let i = 0; i < arr.length; i++) {
          arr[i].render();
          /* 更新 */
          arr[i].updated();
        }
      }, 30);
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