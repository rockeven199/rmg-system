import ControlCenter from "@/components/main/ControlCenter.vue";
import Login from "@/components/main/Login.vue";
import NotFound from "@/components/error/NotFound.vue";
import Position from "@/components/manager/Position.vue";
import Resource from "@/components/manager/Resource.vue";
import Supplier from "@/components/manager/Supplier.vue";
import Employee from "@/components/manager/Employee.vue";
import Purchase from "@/components/manager/Purchase.vue";
import Mine from "@/components/user/Mine.vue";
import Inform from "@/components/user/Inform.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      component: Login,
      path: "/",
      name: "登录",
    },
    {
      component: ControlCenter,
      path: "/controlCenter",
      name: "主页",
      redirect: "/controlCenter/mine",
      children: [
        {
          name: "位置管理",
          path: "position",
          component: Position,
        },
        {
          name: "资产管理",
          path: "resource",
          component: Resource,
        },
        {
          name: "供应商管理",
          path: "supplier",
          component: Supplier,
        },
        {
          name: "个人信息",
          path: "mine",
          component: Mine,
        },
        {
          name: "员工管理",
          path: "employee",
          component: Employee,
        },
        {
          name: "采购管理",
          path: "purchase",
          component: Purchase,
        },
        {
          path: "news",
          name: "新闻",
          component: Inform,
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "404,未找到页面",
      component: NotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.name;
  next();
  // if (to.path != "/") {
  //   if (document.cookie == "") {
  //     next({ path: "/" });
  //   } else {
  //     next();
  //   }
  // } else {
  //   next();
  // }
});

export default router;
