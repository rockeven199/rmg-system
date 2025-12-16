<template>
    <div class="w-full h-[600px] flex items-center justify-center">
        <el-card class="w-[40%] h-[40%] flex items-center justify-center flex-col relative">
            <el-button class="absolute top-[0px] left-[0px]" type="info" @click="this.goMain" :plain="true" :text="true">
                <el-icon size="20px" :icon="HomeFilled">
                    <HomeFilled />
                </el-icon>
            </el-button>
            <p class="text-[100px] text-center">404</p>
            <p>没有这个页面，是不是路径输错了？</p>
        </el-card>
    </div>
</template>
<script>
import { HomeFilled } from '@element-plus/icons-vue';
export default {
    components: { HomeFilled },
    methods: {
        goMain() {
            this.$router.push("/controlCenter/mine");
        }
    }
};
</script>
<style></style>
