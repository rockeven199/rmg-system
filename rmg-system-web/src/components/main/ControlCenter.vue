<style lang="scss" scoped>
.el-header {
  padding: 0;
}

.el-main {
  padding: 0 !important;
}

span {
  margin: 0px 5px;
}

.el-breadcrumb__item {
  margin: 0 !important;
}

.el-divider {
  margin: 0 !important;
}

.el-page-header__back {
  font-size: 16px;
}



.slide-enter-active {
  animation: backInLeft 800ms;
}

.slide-leave-active {
  animation: backOutLeft 500ms;
}

.navTag {
  cursor: pointer;
}
</style>

<template>
  <el-watermark :font="fontConfig" :content="username" class="h-full">
    <el-container class="h-full">
      <!-- 侧边菜单 -->
      <el-aside style="max-width: min-content;">
        <el-menu class="h-full" :mode="this.menuMode" @select="selectItem" :collapse="this.collapseFlag"
          :unique-opened="true" active-text-color="#a32349" :default-active="String(this.activeOption)"
          :collapse-transition="true">
          <el-menu-item style="padding:0 40px 0 20px;" @click="this.collapseFlag = this.collapseFlag ? false : true"
            index="0">
            <el-icon>
              <Menu />
            </el-icon>
            <span>折叠</span>
          </el-menu-item>
          <el-menu-item style="padding:0 40px 0 20px;" :index="item.id.toString()"
            v-for="(item, itemIndex) in this.menuList" @click="clickOption(item.path)">
            <el-icon v-if="item.icon == 'Me'">
              <Me />
            </el-icon>
            <el-icon v-else-if="item.icon == 'Dropbox'">
              <Dropbox />
            </el-icon>
            <el-icon v-else-if="item.icon == 'TakeawayBox'">
              <TakeawayBox />
            </el-icon>
            <el-icon v-else-if="item.icon == 'Delivery'">
              <Delivery />
            </el-icon>
            <el-icon v-else-if="item.icon == 'People'">
              <People />
            </el-icon>
            <el-icon v-else-if="item.icon == 'Buy'">
              <Buy />
            </el-icon>
            <span>{{ item.title }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 导航条 -->
        <el-header>
          <el-row class="w-full shadow-md py-[5px] h-[45px]">
            <!-- 切换主题 -->
            <el-col :span="8">
              <ColorMode style="margin-left: 20px" />
              <el-button type="danger" size="small" @click="logout">退出登录</el-button>
            </el-col>
            <!-- 全局搜索 -->
            <el-col :span="8" :offset="0" v-show="this.$store.state.enableSearch">
              <el-input autocomplete="off" placeholder="请输入搜索内容" v-model="keywords" style="width: 400px;height: 35px;"
                id="search" @change="search" size="small">
                <template #prefix>
                  <search theme="outline" size="20" fill="#969696" />
                </template>
                <!-- 提示快捷键 -->
                <template #suffix>
                  <div v-if="this.isFocusableSearchInput == false" class="flex items-center">
                    <p style="border:4px outset rgba(219, 219, 219, 0.4);"
                      class="px-[5px] text-[12px] h-[25px] flex items-center rounded-md">Ctrl</p>
                    <span class="text-[15px]">+</span>
                    <p style="border:4px outset rgba(219, 219, 219, 0.4);"
                      class="px-[5px] text-[12px] h-[25px] flex items-center  rounded-md">P</p>
                  </div>
                  <div v-else class="flex items-center justify-center">
                    <p style="border:4px outset rgba(219, 219, 219, 0.4);"
                      class="px-[5px] text-[12px] h-[25px] flex items-center  rounded-md">ESC</p>
                  </div>
                </template>
              </el-input>
            </el-col>
          </el-row>
          <!-- 导航标签 -->
          <el-row class="w-full nav-tag-bar shadow-sm">
            <el-scrollbar class="w-full flex items-center">
              <el-col class="w-full flex align-center my-[10px] mx-[5px]">
                <el-tag closable size="small" class="navTag" v-for="(item, index) in navTags" :key="index"
                  @close="closeTag(index)" @click="forwordToPage(index)" :effect="item.active ? 'dark' : 'light'">{{
                    item.title
                  }}</el-tag>
              </el-col>
            </el-scrollbar>
          </el-row>
        </el-header>
        <!-- 显示内容 -->
        <el-main style="overflow: hidden;height: max-content;" class="mt-[15px]">
          <!-- 路由切换 -->
          <router-view v-slot="{ Component }">
            <transition name="slide" appear>
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-watermark>
</template>
<script>
import { TakeawayBox, Menu } from "@element-plus/icons-vue";
import { Me, Dropbox, Delivery, People, Buy } from "@icon-park/vue-next";
import Mine from "@/components/user/Mine.vue";
import ColorMode from "@/components/template/ColorMode.vue";
import testPage from "@/apiTest/testPage.vue"
import 'element-plus/theme-chalk/dark/css-vars.css'

export default {
  components: { Me, Dropbox, Delivery, Mine, ColorMode, testPage, People, Buy },
  data() {
    return {
      // 当前选中菜单项
      activeOption: "1",
      // 是否折叠菜单
      collapseFlag: true,
      // 是否退出登录
      isLogOut: false,
      // 菜单模式
      menuMode: "vertical",
      // 是否显示水印
      show: false,
      // 用户名
      username: "",
      // 菜单列表
      menuList: [
        {
          id: 1,
          title: "个人信息",
          icon: "Me",
          path: "/controlCenter/mine",
        },
        {
          id: 2,
          title: "存放位置",
          icon: "Dropbox",
          path: "/controlCenter/position",
        },
        {
          id: 3,
          title: "资产信息",
          icon: "TakeawayBox",
          path: "/controlCenter/resource",
        },
        {
          id: 4,
          title: "供应商",
          icon: "Delivery",
          path: "/controlCenter/supplier",
        }, {
          id: 5,
          title: "人员信息",
          icon: "People",
          path: "/controlCenter/employee",
        }, {
          id: 6,
          title: "采购管理",
          icon: "Buy",
          path: "/controlCenter/purchase",
        },
      ],
      // 水印设置
      fontConfig: {
        fontSize: 16,
        gap: "[20,50]",
      },
      // 搜素关键字
      keywords: "",
      // 是否聚焦搜索框
      isFocusableSearchInput: false,
      // 导航标签
      navTags: [{
        title: "个人信息",
        pagePath: "/controlCenter/mine",
        active: true
      }],
      // 导航标签计数
      navIndexCount: 0,
      // 是否添加标标签页
      shouldAddNavTag: false,
      // 当前选中的导航标签
      nowChooseNavTag: 0
    };
  },

  methods: {
    // 退出登录
    logout() {
      this.$cookies.remove("token");
      this.$router.push("/")
    },
    // 设置菜单选中项
    selectItem(value) {
      if (value != 0) {
        this.resetNavTag()
        this.activeOption = value;
        localStorage.setItem("activeMenu", value);
        this.addNavTag(this.menuList[value - 1].title, this.menuList[value - 1].path, value)
      }
    },
    // 路由跳转
    clickOption(page_path) {
      this.$router.push(page_path);
    },
    // 搜索关键字
    search() {
      if (this.keywords) {
        this.g_reqData("/" + this.$store.state.searchType + "/query_keywords", "GET", { Authorization: this.$cookies.get("token") }, { 'keywords': this.keywords }, null, false).then(res => {
          this.$store.commit("setResultData", res.data)
          this.$store.commit("setKeywordIsNull", false)
        })
      } else {
        this.$store.commit("setKeywordIsNull", true)
      }
    },
    // 聚焦搜索框
    focusSearchInput() {
      document.addEventListener("keydown", (event) => {
        if ((event.key === "p") && (event.ctrlKey)) {
          event.preventDefault();
          document.querySelector("#search").focus();
          this.isFocusableSearchInput = true
        }
      })
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          document.querySelector("#search").blur()
          this.isFocusableSearchInput = false
        }
      })
    },
    // 添加导航标签
    addNavTag(tag_title, tag_path, tag_index) {
      // 重置导航标签
      // this.resetNavTag()
      // 添加导航标签
      let _a = this.navTags
      if (tag_path != undefined && tag_title != undefined) {
        _a.push({
          title: tag_title,
          pagePath: tag_path,
          active: true,
          menuIndex: tag_index
        })
      }
      this.navTags = _a
      this.nowChooseNavTag = this.navTags.length
    },
    // 关闭标签
    closeTag(_index) {
      //  判断是否为最后一个标签
      if (this.navTags.length > 1) {
        // 获取所有标签
        let _all_tags = this.navTags
        // 判断是否为当前选中的标签
        if ((this.nowChooseNavTag - 1) == _index) {
          _all_tags[_index - 1].active = true
          this.$router.push(_all_tags[_index - 1].pagePath)
          this.activeOption = _all_tags[_index - 1].menuIndex
          this.shouldAddNavTag = false
          this.nowChooseNavTag = _index - 1
          // 删除标签
          _all_tags.splice(_index, 1)
          // 重置第一个标签
          _all_tags[0].active = false
          // 应用修改
          this.navTags = _all_tags
        }
        else if (this.navTags.length == 1) {
          // 只有一个标签时，重置所有标签
          this.resetNavTag()
          this.$router.push("/controlCenter/mine")
          this.nowChooseNavTag = 0
        } else {
          // 重置所有标签
          // 设置当前选中标签
          _all_tags[this.nowChooseNavTag - 1].active = true
          // 删除标签
          _all_tags.splice(_index, 1)
          // 路由跳转
          this.$router.push(_all_tags[this.nowChooseNavTag - 1].pagePath)
          // 应用修改
          this.navTags = _all_tags
        }

        if (this.navTags.length == 1) {
          _all_tags[0].active = true
          this.navTags = _all_tags
        }
      }
    },
    // 跳转到指定页面
    forwordToPage(_index) {
      let _temp = this.navTags
      _temp.forEach((item, index) => {
        item.active = false;
      });
      _temp[_index].active = true
      this.$router.push(_temp[_index].pagePath)
      this.nowChooseNavTag = _index
    },
    // 重置导航标签
    resetNavTag() {
      let _temp = this.navTags
      for (const _a of _temp) {
        _a.active = false
      }
      this.navTags = _temp
    }
  },
  mounted() {
    this.focusSearchInput()
    this.username = localStorage.getItem("username")
    this.activeOption = localStorage.getItem("activeMenu")
  }
};
</script>
