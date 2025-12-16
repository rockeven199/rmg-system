<style>
#app,
html,
body {
  height: 100%;
  widows: 100%;
}

:root {
  --status-disabled: #a6a9ad4d;
  --status-enabled: #85ce614d;
  --status-full: #ebb5634d;
  --status-normal: #66b1ff4d;
  --status-warning: #f789894d;
}

.status-normal {
  --el-table-tr-bg-color: var(--status-normal);
}

.status-disabled {
  --el-table-tr-bg-color: var(--status-disabled);
}

.status-enabled {
  --el-table-tr-bg-color: var(--status-enabled);
}

.status-warning {
  --el-table-tr-bg-color: var(--status-warning);
}
</style>

<template>
  <!-- <testPage /> -->
  <router-view v-slot="{ Component }">
    <transition mode="out-in" enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import { RouterView } from "vue-router";
import "./assets/css/tailwind.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import testPage from "./apiTest/testPage.vue";
export default {
  components: { testPage },
  data() {
    return {
      qrPic: null
    };
  }
};
</script>