<template>
    <div class="Nav">
        <el-row>
            <el-col :span="1" type="flex">
                <div class="toggle-button" @click="changeCollapse()">
                    <i v-if="isCollapse" class="el-icon-s-unfold"></i>
                    <i v-if="!isCollapse" class="el-icon-s-fold"></i>
                </div>
            </el-col>
            <el-col :offset="7" :span="5" align="middle">
                <el-avatar shape="circle" :src="logo" style="margin-top: 10px; float: left"></el-avatar>
                <p class="system-name">广东海洋大学体育管理系统</p>
            </el-col>
            <el-col :offset="7" :span="4" style="min-width: 150px">
                <el-dropdown style="float: right; margin: 20px 10px">
                    <span class="el-dropdown-link" style="color: #fff; cursor: pointer">
                        {{ name }} &nbsp;&nbsp;<i class="fa fa-caret-down fa-1x"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="editPasswordDialog = true">修改密码</el-dropdown-item>
                        <el-dropdown-item @click.native="logout()">退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Nav',
    data() {
        return {
            logo: require("@/assets/logo.png"),
            name: window.localStorage.getItem("username")
        };
    },
    computed: {
        isCollapse() {
            return this.$store.state.isCollapse;
        },
    },
    methods: {
        changeCollapse() {
            this.$store.commit("menuCollapse");
        },
        // 退出系统
        logout() {
            this.$confirm("确定要退出系统吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    // 清除缓存
                    sessionStorage.clear();
                    this.$router.push("/Login");
                })
                .catch(() => {
                    return false;
                });
        },
    },
}
</script>

<style scoped>
.Nav {
    background-color: #2661ef;
}

.system-name {
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    line-height: 56px;
    width: 350px;
}

.toggle-button {
    font-size: 18px;
    line-height: 56px;
    color: #fff;
    letter-spacing: 0.2em;
    cursor: pointer;
    padding: 0 10px;
}


@media (max-width: 1024px) {
    .system-name {
        display: none;
    }
}
</style>