<template>
    <div class="Header">
        <el-row type="flex" justify="space-between" align="middle">
            <el-col :span="6" type="flex">
                <div class="toggle-button" @click="changeCollapse()">
                    <i v-if="isCollapse" class="el-icon-s-unfold"></i>
                    <i v-if="!isCollapse" class="el-icon-s-fold"></i>
                </div>
            </el-col>
            <el-col :span="6" style="display: flex;align-items: center;">
                <el-avatar shape="circle" :src="logo"></el-avatar>
                <p class="system-name">广东海洋大学体育管理系统</p>
            </el-col>
            <el-col :span="6" style="display: flex;justify-content: end;align-items: center;margin-right: 20px;">
                <router-link to='/user/order'>
                    <span class="order">租用订单</span>
                </router-link>
                <el-popover popper-class="popoverStyle" placement="left-end" :width="300" trigger="click">
                    <div class="notice_item"
                        v-for="notice in (this.compensateList.length > 0 ? this.compensateList : this.borrowList)"
                        :key="notice.id">
                        <div v-if="notice.equipmentid">
                            <span class="info">
                                {{ '一条来自 ' + notice.username + ' 的器材申请，等待您的审批！！！ ' }}
                            </span>
                            <span>{{ '申请时间： ' + notice.created }}</span>
                            <router-link to='/sys/Borrow'>
                                <span class="go-approve">去审批>></span>
                            </router-link>
                        </div>
                        <div v-if="notice.borrowid">
                            <span class="info">
                                {{ '您需要支付一笔器材赔偿，赔偿原因：' + notice.reason + ',赔偿金额: ' + notice.price + '元，请尽快缴纳，否则无法租用器材'
                                }}
                            </span>
                            <span>{{ '时间： ' + notice.created }}</span>
                            <span class="go-approve" @click="pay(notice)">去支付>></span>
                        </div>
                    </div>
                    <el-button slot="reference" class="item">
                        <el-badge :value="this.num" :max="99">
                            <i class="el-icon-message-solid" style="width: 25px;"></i>
                        </el-badge>
                    </el-button>
                </el-popover>
                <div class="fullScreen" @click="toggleFullscreen">
                    <el-tooltip class="item" effect="dark" :content="isFull ? '退出全屏' : '全屏'" placement="bottom">
                        <i :class="isFull ? 'el-icon-aim' : 'el-icon-full-screen'"></i>
                    </el-tooltip>
                </div>
                <el-dropdown>
                    <span class="el-dropdown-link" style="color: #fff; cursor: pointer">
                        {{ userInfo.username }}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <router-link to="/userCenter">个人中心</router-link>
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="logout()">退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import screenfull from "screenfull";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Header',
    data() {
        return {
            logo: require("@/assets/logo.png"),
            borrowList: [],
            compensateList: [],
            num: 0,
            userInfo: {
                id: "",
                username: ''
            },
            isFull: false,
        };
    },
    created() {
        this.getUserInfo()
        this.getBorrowNum();
    },
    mounted() {
        this.handleMsg();
        this.open()
    },
    computed: {
        isCollapse() {
            return this.$store.state.isCollapse;
        },
    },
    methods: {
        open() {
            setTimeout(() => {
                console.log(this.compensateList);
                if (this.compensateList.length > 0)
                    this.$alert('请立即支付！', '您有器材赔偿未支付！', {
                        confirmButtonText: '了解',
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '请到消息处支付'
                        });
                    });;
            }, 1000);
        },
        getUserInfo() {
            this.userInfo.username = window.sessionStorage.getItem('username')
            this.userInfo.id = window.sessionStorage.getItem('userId')
            this.getCompensateNum();
        },
        handleMsg() {
            this.$globalWebSocket.ws.onmessage = this.getMessage
        },
        getMessage(e) {
            this.$notify.info({
                title: '通知',
                message: e.data
            });
            this.getBorrowNum();
            this.getCompensateNum();
        },
        changeCollapse() {
            this.$store.commit("menuCollapse");
        },
        toggleFullscreen() {
            if (!screenfull.isEnabled) {
                this.$notification.warning({
                    message: '警告',
                    description: `您的浏览器不支持全屏!`,
                })
                return false
            }
            screenfull.toggle()
            this.isFull = !this.isFull
        },
        pay(notice) {
            this.$confirm(`器材租用编号：${notice.borrowid}，赔偿原因：${notice.reason}，赔偿金额：${notice.price}，是否继续支付`, '缴纳赔偿', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post("/compensate/pay/" + notice.id).then(res => {
                    this.$message({
                        type: 'success',
                        message: '支付成功!',
                        onClose: () => {
                            this.num--;
                            this.getCompensateNum();
                        }
                    });
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消支付'
                });
            });
        },
        dateFormat(time) {
            let date = new Date(time);
            let year = date.getFullYear();
            let month =
                date.getMonth() + 1 < 10
                    ? "0" + (date.getMonth() + 1)
                    : date.getMonth() + 1;
            let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            return (year + "-" + month + "-" + day);
        },
        getBorrowNum() {
            this.$axios.get("/sys/borrow/getBorrowNum").then(res => {
                this.num = res.data.data.borrowNum;
                this.borrowList = res.data.data.borrowNoticeList;
                for (let i = 0; i < this.borrowList.length; i++) {
                    this.borrowList[i].created = this.dateFormat(this.borrowList[i].created);
                }
            })
        },
        getCompensateNum() {
            this.$axios.get("/compensate/getCompensateNum/" + this.userInfo.id).then(res => {
                this.num += res.data.data.compensateNum;
                this.compensateList = res.data.data.compensateList;
                for (let i = 0; i < this.compensateList.length; i++) {
                    this.compensateList[i].created = this.dateFormat(this.compensateList[i].created);
                }
            })
        },
        // 退出系统
        logout() {
            this.$confirm("确定要退出系统吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                window.sessionStorage.clear();
                window.localStorage.clear();
                this.$axios.post("/logout").then(res => {
                    // 清除缓存
                    this.$store.commit("resetState");
                    this.$message({
                        message: '注销成功',
                        type: 'success'
                    })
                    this.$router.push("/login").catch((err) => {
                        this.$router.push("/login").catch((err) => { })
                    })
                })
            }).catch(() => {
                return false;
            });
        },
    },
}
</script>

<style scoped>
.Header {
    background-color: #2661ef;
}

.order {
    height: 60px;
    text-wrap: nowrap;
    /*background-color: pink;*/
    line-height: 60px;
    cursor: pointer;
    font-size: 14px;
    margin-top: 20px;
    margin-right: 10px;
    color: #fff;
}

.order:hover {
    color: #409EFF;
}

.notice_item {
    border-bottom: 1px solid #868DAA;
}

.item {
    border: none;
    background: none;
    color: #fff;
}


.system-name {
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    line-height: 56px;
    width: 260px;
}

.toggle-button {
    font-size: 18px;
    line-height: 56px;
    color: #fff;
    letter-spacing: 0.2em;
    cursor: pointer;
    padding: 0 10px;
}

.fullScreen {
    cursor: pointer;
    margin: 10px 20px;
    font-size: 20px;
}

.info {
    display: block;
    margin-bottom: 5px;
}


.go-approve {
    display: inline-block;
    border-bottom: 1px solid transparent;
    color: #8bd2f4;
    cursor: pointer;
    margin-bottom: 5px;

}

.go-approve:hover {
    color: #409EFF;
    border-bottom: 1px solid #409EFF;
}

.el-dropdown-link {
    text-wrap: nowrap;
}

@media (max-width: 1200px) {
    .system-name {
        display: none;
    }
}

@media (max-width:700px) {
    .el-avatar {
        display: none;
    }
}
</style>

<style>
.popoverStyle {
    height: 500px;
    overflow: auto;

}
</style>