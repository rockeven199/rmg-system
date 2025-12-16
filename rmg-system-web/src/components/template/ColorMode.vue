<template>
  <el-switch v-model="this.isDark" width="45" size="default" class="mr-[20px]" style="--el-switch-on-color: #3b3b3b;"
    @change="toggleDark()">
    <template #active-action>
      <el-icon color="#111111">
        <Moon />
      </el-icon>
    </template>
    <template #inactive-action>
      <el-icon color="#000000">
        <Sunny />
      </el-icon>
    </template>
  </el-switch>
</template>
<script>
import { useDark, useToggle } from '@vueuse/core';
export default {
  data() {
    return {
      isDark: false,
    }
  },
  setup() {
    const isDark = useDark();
    const toggleDark = () => useToggle(isDark);
    return { isDark, toggleDark };
  }
}
</script>
<style></style>
