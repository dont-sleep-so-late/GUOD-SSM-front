<template>
    <div>
        <el-image :src="captchaImg" class="captchaImg" @click="getCaptcha"></el-image>
    </div>
</template>

<script>
export default {
    name: 'Captcha',
    data() {
        return {
            captchaImg: null

        }
    },
    methods: {
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
        getCaptcha() {
            this.$axios.get('/captcha').then(res => {
                this.loginForm.key = res.data.data.key;
                this.captchaImg = res.data.data.captchaImg;
                this.loginForm.code = '';
            })
        }
    },
}
</script>

<style scoped></style>