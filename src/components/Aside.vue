<template>
    <el-row class="tac">
        <el-col :span="12">
            <el-menu :default-active="this.$store.state.menus.editableTabsValue" class="el-menu-vertical-demo"
                active-text-color="#fff" :collapse="isCollapse">
                <div class="userInfo">
                    <div class="userHeader">
                        <div :class="{ userAvatar: !isCollapse }">
                            <el-avatar :size="50" shape="circle" :src="avatar" style="margin-top: 10px;"></el-avatar>
                        </div>
                        <div class="username" style="white-space: nowrap" :class="{ userName: isCollapse }">
                            <p>{{ userName }}</p>
                        </div>
                    </div>
                </div>
                <router-link to="/index">
                    <el-menu-item index="index" @click="selectMenu({ name: 'index', title: '首页' })">
                        <i class="el-icon-s-home"></i>
                        <template slot="title">
                            <span slot="title">首页</span>
                        </template>
                    </el-menu-item>
                </router-link>
                <router-link to="/user/equipment">
                    <el-menu-item index="equipment" @click="selectMenu({ name: 'equipment', title: '器材列表' })">
                        <i class="el-icon-basketball"></i>
                        <template slot="title">
                            <span slot="title">器材列表</span>
                        </template>
                    </el-menu-item>
                </router-link>
                <router-link to="/user/competition">
                    <el-menu-item index="competition" @click="selectMenu({ name: 'competition', title: '竞赛列表' })">
                        <i class="el-icon-football"></i>
                        <template slot="title">
                            <span slot="title">竞赛列表</span>
                        </template>
                    </el-menu-item>
                </router-link>
                <router-link to="/notice/noticeList">
                    <el-menu-item index="noticeList" @click="selectMenu({ name: 'noticeList', title: '公告列表' })">
                        <i class="el-icon-message-solid"></i>
                        <template slot="title">
                            <span slot="title">公告列表</span>
                        </template>
                    </el-menu-item>
                </router-link>
                <el-submenu :index="menu.name" v-for="(menu, index) in menuList" :key="index">
                    <template slot="title">
                        <i :class="menu.icon"></i>
                        <span class="title">{{ menu.title }}</span>
                    </template>
                    <router-link :to="item.path" v-for="(item, index) in menu.children" :key="index">
                        <el-menu-item :index="item.name" @click="selectMenu(item)">
                            <template slot="title">
                                <i :class="item.icon"></i>
                                <span slot="title">{{ item.title }}</span>
                            </template>
                        </el-menu-item>
                    </router-link>
                </el-submenu>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Aside",
    data() {
        return {
            avatar: require("@/assets/玛奇玛small.png"),
            userName: window.localStorage.getItem("username") || '用户',
        };
    },
    computed: {
        isCollapse() {
            return this.$store.state.isCollapse;
        },
        menuList: {
            get() {
                return this.$store.state.menus.menuList
            }
        }
    },
    methods: {
        selectMenu(item) {
            this.$store.commit("addTab", item);
        },
    },
};
</script>

<style scoped>
.userInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    width: 100%;
}

.userHeader {
    margin: 0 auto;
}

.username p {
    text-align: center;
}

.userName {
    display: none;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-menu-item.is-active {
    color: #fff !important;
    font-size: 15px;
    font-weight: bold;
    background-color: #2661ef !important;
    border-radius: 2px;
    line-height: 50px;
    box-sizing: border-box;
}

.el-menu-item:hover i {
    color: #409EFF !important;
}

.el-menu-item:hover {
    color: #409EFF !important;
}
</style>