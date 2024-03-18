<template>
    <div class="layout">
        <el-container>
            <el-aside>
                <Aside />
            </el-aside>
            <el-container>
                <el-header>
                    <Nav />
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
import Nav from '../components/Nav.vue';
import Tabs from '../components/Tabs.vue';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'layout',
    components: { Aside, Nav, Tabs }
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
</style>