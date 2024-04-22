<template>
    <div class="layout">
        <el-container>
            <el-aside>
                <Aside />
            </el-aside>
            <el-container>
                <el-header>
                    <Header />
                </el-header>
                <el-main>
                    <Tabs />
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Aside from '../components/Aside.vue';
import Header from '../components/Header.vue';
import Tabs from '../components/Tabs.vue';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'layout',
    components: { Aside, Header, Tabs },
    data() {
        return {
            socket: null,
            userId: localStorage.getItem("userId")
        }
    },
    created() {
        if (this.userId != null) {
            this.initWebSocket();
        }

    },
    methods: {
        initWebSocket() {
            let that = this;
            if ("WebSocket" in window) {
                console.log("您的浏览器支持 WebSocket!");
                let socketUrl = "http://8.134.10.8:8081/websocket/" + this.userId;
                socketUrl = socketUrl.replace("https", "ws").replace("http", "ws");
                that.ws = new WebSocket(socketUrl);
                that.$globalWebSocket.setWs(that.ws);
                that.ws.onopen = function () {
                    console.log('webSocket connect successful')
                };
                that.ws.onclose = function () {
                    console.log("webSocket connect closed");
                    setTimeout(() => {
                        that.initWebSocket();
                    }, 2000);
                };
            } else {
                console.log("您的浏览器不支持 WebSocket!");
            }
        },
    },
    watch: {
        $route(to, from) {
            if (to.path != '/login') {
                let obj = {
                    name: to.name,
                    title: to.meta.title
                }
                this.$store.commit("addTab", obj);
            }
        }
    }
}
</script>

<style scoped>
.el-container {
    min-height: 400px;
}

.el-aside {
    width: auto !important;
    height: 100vh;
    background: white;
}

.el-header {
    padding: 0 0;
}

.el-main {
    height: 20vh;
}
</style>