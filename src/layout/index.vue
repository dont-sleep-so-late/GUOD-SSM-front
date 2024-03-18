<template>
    <el-container>
        <el-aside width="200px">
            <Aside />
        </el-aside>
        <el-container>
            <el-header>
                <Nav />
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>



</template>

<script>
import Aside from '../components/Aside.vue';
import Nav from '../components/Nav.vue';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'layout',
    components: { Aside, Nav }
}
</script>

<style lang='scss' scoped></style>