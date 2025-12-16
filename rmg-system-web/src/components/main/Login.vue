<style scoped>
p {
  letter-spacing: 1px;
}

.el-container {
  height: 80%;
}

.el-row {
  width: 100%;
  height: min-content;
}
</style>
<template>
  <el-container direction="vertical">
    <el-header height="100px">
      <el-row :gutter="20">
        <el-col :span="12">
          <toggleColorMode />
        </el-col>
      </el-row>
    </el-header>

    <el-main class="flex flex-col items-center justify-center">
      <el-row class="py-[30px]">
        <el-col class="flex justify-center text-[20px] font-bold">
          <p v-if="!usingQRLogin">资产管理系统</p>
          <el-text type="info" size="large" v-else>使用手机端扫码登录</el-text>
        </el-col>
      </el-row>
      <el-row class="flex justify-center">
        <!-- 账户密码登录 -->
        <el-col :lg="5" :xs="20" :sm="10" :md="10" v-show="!usingQRLogin"
          :class="['flex', 'justify-center', 'overflow-hidden', 'animate__animated']">
          <el-form :model="form" ref="loginRef" :rules="loginRules" label-width="80px" :inline="false">
            <el-form-item label="" class="break-keep my-[10px] ml-[-80px]" prop="username">
              <el-input v-model="form.username" clearable size="large" placeholder="请输入用户名">
              </el-input>
            </el-form-item>
            <el-form-item label="" class="break-keep my-[10px] ml-[-80px]" prop="password">
              <el-input v-model="form.password" clearable show-password size="large" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="" class="break-keep my-[10px] ml-[-80px] relative" prop="captcha">
              <el-input v-model="form.captcha" size="large" placeholder="请输入验证码" maxlength="5"></el-input>
              <img @click="getCaptcha" :src="captcha" alt="验证码"
                class="w-[80px] absolute right-0 top-0 z-2 outline-1 outline outline-gray-400 rounded-xm" />
            </el-form-item>
            <div class="w-[100%]">
              <el-button type="primary" plain @click="login" @keyup.enter.native="login" class="w-[100%]">登
                录</el-button>
            </div>
          </el-form>
          <el-row class="w-full flex justify-center mt-2 items-center">
            <el-button type="info" @click="toggleLoginWay" size="default" :plain="true" :text="true" :round="true">
              <pay-code-one theme="outline" size="15" fill="#969696" class="mr-1" />
              <el-text size="small">扫描二维码登录</el-text>
            </el-button>
          </el-row>
        </el-col>
        <!-- 二维码登录 -->
        <div class="mt-5 " v-if="usingQRLogin">
          <img :src="qrPic" class="w-[150px] h-[150px]" />
          <el-row class="w-full flex justify-center mt-2 items-center">
            <el-button type="primary" @click="this.usingQRLogin = false" size="small" :text="true" class="mt-2">
              返回
            </el-button>
          </el-row>
        </div>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
import { useDark, useToggle } from "@vueuse/core";
import toggleColorMode from "@/components/template/ColorMode.vue";
import { PayCodeOne } from "@icon-park/vue-next"
import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
const isDark = useDark();
export default {
  components: { toggleColorMode, PayCodeOne },
  data() {
    return {
      themes: true,
      loginTipsTitle: "",
      loginType: "",
      captcha: "",
      form: {
        username: "root",
        password: "123",
        captcha: "",
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: "blur",
            message: "请输入用户名",
          },
          {
            max: 10,
            message: "用户名长度不超过10位",
          },
        ],
        password: [
          {
            trigger: "blur",
            required: true,
            message: "请输入密码",
          },
        ],
        captcha: [
          {
            trigger: "blur",
            required: true,
            message: "请输入验证码",
          },
          {
            max: 5,
            message: "验证码长度不超过10位",
          },
        ],
      },
      usingQRLogin: false,
      qrPic: null
    };
  },
  methods: {
    // 切换主题
    switchThemes() {
      const toggleDark = useToggle(isDark);
      toggleDark();
    },
    // 切换登录方式
    toggleLoginWay() {
      // 切换flag
      this.usingQRLogin = true
      // webScoket 连接
      let socket = new WebSocket("ws://127.0.0.1:8080/websocket")
      socket.onmessage = (res) => {
        // 跳转前关闭webScoket会话
        this.$router.beforeEach(() => {
          socket.close();
        })
        // 跳转页面
        this.$router.push("/controlCenter");
        // 处理返回数据
        let data = res.data.split(",")
        if (res == []) {
          socket.close();
        }
        localStorage.setItem("User", data[0]);
        this.$cookies.set("token", data[1], "1d");
      }

      const requestOptions = {
        method: "GET",
        responseType: "blob",
      };

      // 获取QR图片
      fetch("http://127.0.0.1:8080/login/get_QR_code", requestOptions)
        .then((response) => response.blob())
        .then((data) => {
          const reader = new FileReader();
          reader.readAsDataURL(new Blob([data], { type: "image/png" }));
          reader.onload = () => {
            this.qrPic = reader.result;
          };
        })
        .catch(err=>{
          ElMessageBox({
            message: '请求错误！',
            type: 'error'
          })
        })
    },
    // 登录
    login() {
      this.$refs.loginRef.validate((valid) => {
        if (valid) {
          this.g_reqData(
            "/login/login",
            "POST",
            { "Content-Type": "application/x-www-form-urlencoded" },
            {
              Username: this.form.username,
              Password: this.form.password,
              Captcha: this.form.captcha,
            },
            null
          ).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: res.msg,
                type: "success",
                duration: 3000,
              });
              localStorage.setItem("username", this.form.username)
              this.$router.push("/controlCenter");
              this.$cookies.set("token", res.data, "1d");
            } else {
              if (res.code == 403) {
                this.$message({
                  message: res.msg,
                  type: "error",
                  duration: 3000,
                });

                this.getCaptcha();
              }
            }
          });
        }
      });
    },
    // 获取验证码
    getCaptcha() {
      this.g_reqData(
        "/login/captcha",
        "GET",
        null,
        null,
        "arraybuffer"
      ).then((res) => {
        let binary = "";
        let bytes = new Uint8Array(res);
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        this.captcha = "data:image/png;base64," + btoa(binary);
      });
    },
  },
  mounted() {
    this.getCaptcha()
    window.onkeydown = (event) => {

      if (event.key == "Enter" || event.keyCode == 13) {
        this.login()

      }

    }
  },
};
</script>
