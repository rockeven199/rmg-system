<style lang="scss">
.user-data-font {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1px;
  word-break: keep-all;
}

.card-hole {
  min-width: 140px;

  &::after {
    position: absolute;
    width: 50px;
    height: 20px;
    content: "";
    background-color: rgb(255, 255, 255);
    z-index: 99;
    left: 25%;
    top: -10px;
    border: 3px groove rgb(227, 227, 227);
  }
}

.card-bg {
  min-width: 18vw;
  height: 13vw;
  background: radial-gradient(
      circle at 100% 50%,
      transparent 20%,
      #d8d8d869 21%,
      #d8d8d869 34%,
      transparent 35%,
      transparent
    ),
    radial-gradient(
        circle at 0% 50%,
        transparent 20%,
        #d8d8d869 21%,
        #d8d8d869 34%,
        transparent 35%,
        transparent
      )
      0 -50px;
  // background-color: rgb(238, 238, 238);
  background-size: 15px 15px;
}

@keyframes rotateY {
  0% {
    transform: rotateY(0);
  }

  100% {
    transform: rotateY(180deg);
  }
}

// @font-face {
//   font-family: 'clockfont';
//   src: url("http://127.0.0.1:81/font/DS-Digital/DS-DIGII-3.ttf");
// }

@keyframes blink {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.rotate-y {
  animation: rotateY 1s ease-in forwards;
}
</style>
<template>
  <div class="w-full h-full">
    <el-row class="w-full h-[90%] flex justify-between items-center">
      <!-- 工牌 -->
      <el-row
        :gutter="0"
        class="w-min ml-[15vw] tracking-[1px] flex flex-col items-center"
      >
        <el-row class="flex items-center">
          <div class="w-[50px] h-[10px] absolute right-[31px] top-[10px]"></div>
          <el-col
            :span="10"
            :offset="12"
            class="flex justify-center pt-[10px] border-x-[10px] border-t-[20px] items-center rounded-t-2xl card-bg"
            :class="[user_sex != '男' ? 'border-pink-400' : 'border-blue-400']"
            style="border-style: ridge"
          >
            <div
              class="absolute w-[50%] h-[40px] top-[-40px] rounded-t-full z-[-10] border-[20px] card-hole"
              :class="[user_sex != '男' ? 'border-red-400' : 'border-blue-400']"
            ></div>
            <el-avatar
              icon="el-icon-user-solid"
              :size="130"
              shape="circle"
              :src="user_header"
              fit="cover"
              :style="{
                boxShadow:
                  user_sex != '男'
                    ? '0px 0px 10px rgb(244 114 182)'
                    : '0px 0px 10px rgb(96 165 250)',
              }"
            >
            </el-avatar>
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :offset="12"
            class="text-center card-bg border-x-[10px] border-b-[10px] rounded-b-md"
            style="border-style: ridge; height: 14vw"
            :class="[
              user_sex == '男' ? 'border-[#232323]' : 'border-[#f0f0f0]',
            ]"
          >
            <div class="flex justify-center ml-[30px]">
              <p class="text-[25px] font-bold">
                {{ user_name }}
              </p>
              <img
                alt=""
                src="@/assets/image/personal-data-icon/female.svg"
                class="w-[15px] mx-2"
              />
            </div>
            <div class="text-[12px] mt-[2px] mb-[15px]">
              {{ user_level }}
            </div>
            <div class="flex items-center flex-col text-center">
              <div class="w-full flex justify-center">
                <div class="text-[12px] px-[5px]">
                  <p>{{ user_department }}</p>
                  <p>{{ user_second_department }}</p>
                </div>
                <div class="text-[12px] flex items-center px-[5px]">
                  <p>{{ user_job }}</p>
                </div>
              </div>
              <div class="flex w-[90%] flex-col">
                <div class="flex items-center my-[10px]">
                  <img
                    src="../../assets/image/personal-data-icon/mail.svg"
                    alt=""
                    class="w-[25px] h-[25px] mr-[5px]"
                  />
                  <el-input
                    v-model="user_email"
                    class="h-[25px] mb-[5px]"
                    size="small"
                  >
                    <template #append>
                      <p class="text-[12px] tracking-wide">@system.rmg</p>
                    </template>
                  </el-input>
                </div>
                <div class="flex items-center">
                  <img
                    src="../../assets/image/personal-data-icon/phone.svg"
                    alt=""
                    class="w-[25px] h-[25px] mr-[5px]"
                  />
                  <el-input
                    v-model="user_number"
                    class="h-[25px]"
                    maxlength="11"
                    size="small"
                  ></el-input>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-row>
      <el-row :gutter="0" class="w-[50%] h-[50%] flex items-center mb-[5vh]">
        <el-col :span="20">
          <!-- 时钟 -->
        <el-card
          class="w-[70%] h-[50%] mt-[10px] text-center my-auto border-solid border-white border-[10px] shadow-lg"
          style="font-family: clockfont; background-color: #dbdbdb"
          :style="{ border: '10px groove #636466' }"
        >
          <div class="text-[50px] font-light flex justify-center text-black">
            <div class="w-[30px] relative">
              <span class="absolute top-0 left-[-1px]">{{
                time.hours[0]
              }}</span>
            </div>
            <div class="w-[32px] relative">
              <span class="absolute top-0 left-[1px]">{{ time.hours[1] }}</span>
            </div>
            <span style="animation: blink 2s infinite">:</span>
            <div class="w-[32px] relative">
              <span class="absolute top-0 left-[1px]">{{
                time.minutes[0]
              }}</span>
            </div>
            <div class="w-[32px] relative">
              <span class="absolute top-0 left-[1px]">{{
                time.minutes[1]
              }}</span>
            </div>
            <span style="animation: blink 2s infinite">:</span>
            <div class="w-[32px] relative">
              <span class="absolute top-0 left-[1px]">{{
                time.seconds[0]
              }}</span>
            </div>
            <div class="w-[32px] relative">
              <span class="absolute top-0 left-[1px]">{{
                time.seconds[1]
              }}</span>
            </div>
          </div>
          <div class="text-[18px] font-[clockfont] text-black">
            {{ time.year }}- {{ time.month }}-
            {{ time.day }}
          </div>
        </el-card>
        <div class="w-[70%] flex items-center">
          <!-- 天气预报 -->
          <el-card
            class="w-[50%] h-full mt-[10px] mr-2 "
            :style="{ 'background-image': 'url(' + img + ')' }"
            style="background-size: 100%"
          >
            <div
              class="flex justify-around items-center text-center text-white"
              style="text-shadow: 0px 0px 1px black"
            >
              <div style="text-shadow: 0px 0px 3px black;">
                <p class="font-ligther">
                  <span class="text-[50px] ml-[15px]">{{
                    location.tempture
                  }}</span
                  ><sup class="text-[40px]">&deg;</sup>
                </p>
                <p class="text-[15px]">{{ location.weather }}</p>
                <p class="py-[20px]">
                  {{ location.city }}市 {{ location.area }}区
                </p>
              </div>
            </div>
          </el-card>
          <!-- 新闻 -->
          <el-card
            class="mt-[10px] w-[50%] h-[100%]"
            shadow="always"
          >
            <div class="text-[13px] font-sans mb-2">新闻</div>
            <hr />
            <el-carousel
              trigger="click"
              height="80px"
              indicator-position="outside"
              arrow="never"
            >
              <el-carousel-item
                v-for="item in news"
                @click="readNews(item.news_id)"
              >
                <div class="text-[12px] my-[10px]">{{ item.news_title }}</div>
                <div class="text-[10px] absolute bottom-0">
                  发布时间：{{ item.news_pub_datetime }}
                </div>
              </el-carousel-item>
            </el-carousel>
          </el-card>
        </div>
        </el-col>
      </el-row>
    </el-row>
    <!-- <el-drawer v-model="showDrap" direction="ltr" size="80%">
      <main>container</main>
    </el-drawer> -->
  </div>
</template>
<script>
import { AutoWidth } from "@icon-park/vue-next";
import { ElAlert, ElMessageBox } from "element-plus";

export default {
  data() {
    return {
      user_header: "",
      user_name: "",
      user_level: "",
      user_email: "",
      user_number: "",
      user_department: "",
      user_second_department: "",
      user_job: "",
      user_sex: "",
      location: {
        city: "",
        provice: "辽宁省",
        tempture: "19",
        weather: "晴",
        area: "",
      },
      img: "",
      time: {
        year: "",
        month: "",
        day: "",
        hours: "",
        minutes: "",
        seconds: "",
      },
      news: [],
      showDrap: false,
    };
  },

  methods: {
    // 初始化用户信息
    getUserData() {
      this.g_reqData(
        "/user/init_user_data",
        "POST",
        {
          Authorization: this.$cookies.get("token"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        null,
        null,
        false
      ).then((res) => {
        this.user_header =
          this.addr.addr.static_ip +
          "users_profile/" +
          res.data[0]["header_img"];
        this.user_name = res.data[0].username;
        this.user_level = res.data[0].level;
        this.user_email = res.data[0].email;
        this.user_number = res.data[0].phone_number;
        this.user_department = res.data[0].department;
        this.user_second_department = res.data[0].second_department;
        this.user_job = res.data[0].job;
        this.user_sex = res.data[0].sex;
      });
    },
    // 获取天气信息
    getWeather() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // 获取天气
          this.g_reqData(
            "https://devapi.qweather.com/v7/weather/now?",
            "GET",
            null,
            {
              key: "4bb6747bb8ee4e489d76501cf550da45",
              location:
                position.coords.longitude + "," + position.coords.latitude,
              lang: "zh",
              unit: "m",
            },
            null,
            false
          ).then((res) => {
            this.location.weather = res.now.text;
            this.location.tempture = res.now.temp;
            if (res.now.text == "阴") {
              this.img =
                this.addr.addr.static_ip + "image/weather/cloud_day.jpg";
            } else if (res.now.text == "晴") {
              this.img = this.addr.addr.static_ip + "image/weather/clear.jpg";
            } else {
              this.img = this.addr.addr.static_ip + "image/weather/rain.jpg";
            }
          });
          // 位置逆向
          this.g_reqData(
            "https://geoapi.qweather.com/v2/city/lookup?",
            "GET",
            null,
            {
              key: "4bb6747bb8ee4e489d76501cf550da45",
              location:
                position.coords.longitude + "," + position.coords.latitude,
              lang: "zh",
              unit: "m",
            },
            null,
            false
          ).then((res) => {
            this.location.area = res.location[0].name;
            this.location.provice = res.location[0].adm1;
            this.location.city = res.location[0].adm2;
            // this.provice = res.now.location
          });
        },
        (error) => {}
      );
    },
    // 刷新时间
    getDate() {
      setInterval(() => {
        let date = new Date();
        this.time.year = date.getFullYear();
        this.time.month = date.getMonth() + 1;
        this.time.day =
          date.getDate() < 10
            ? "0" + date.getDate().toString()
            : date.getDate().toString();
        this.time.hours =
          date.getHours() < 10
            ? "0" + date.getHours().toString()
            : date.getHours().toString();
        this.time.minutes =
          date.getMinutes() < 10
            ? "0" + date.getMinutes().toString()
            : date.getMinutes().toString();
        this.time.seconds =
          date.getSeconds() < 10
            ? "0" + date.getSeconds().toString()
            : date.getSeconds().toString();
      });
    },
    // 获取新闻
    getNews() {
      this.g_reqData(
        "/base/get_news_list",
        "GET",
        { Authorization: this.$cookies.get("token") },
        null,
        null,
        false
      ).then((res) => {
        this.news = res.data;
      });
    },
    // 浏览新闻
    readNews(e) {
      this.$router.push({ path: "/controlCenter/news", query: { newsId: e } });
    },
  },

  mounted() {
    this.getUserData();
    this.getWeather();
    this.getDate();
    this.getNews();
  },
  beforeMount() {
    // this.g_checkLogin()
  },
};
</script>
