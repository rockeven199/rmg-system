if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$4 = {
    data() {
      return {
        user: [
          {
            url: "../../static/header_image/1.jpg",
            handler: "26e362c9-090b-4857-9b4f-751a2d5b0690"
          },
          {
            url: "../../static/header_image/2.jpg",
            handler: "c96101a2-5c53-4b55-bd84-29836424bae2"
          },
          {
            url: "../../static/header_image/3.jpg",
            handler: "e55e51ec-3e07-4d41-bc7e-faafd5d97c07"
          },
          {
            url: "../../static/header_image/4.jpg",
            handler: "d0895c88-73b6-49e9-b2fe-cdb54206e593"
          },
          {
            url: "../../static/header_image/5.jpg",
            handler: "9786c305-b06a-4a3b-b048-b08614e20aed"
          },
          {
            url: "../../static/header_image/6.jpg",
            handler: "1aef8c29-bc42-4e4b-97ef-3f478a7415e4"
          },
          {
            url: "../../static/header_image/1.jpg",
            handler: "5c24dacb-bcca-4f6d-8e1e-5cbfa1de9b1a"
          },
          {
            url: "../../static/header_image/2.jpg",
            handler: "d01839b0-3aef-4e3a-8d07-75ef07aaa187"
          },
          {
            url: "../../static/header_image/3.jpg",
            handler: "ef8c29dd-90c7-4159-a07a-5dd2ae29e312"
          },
          {
            url: "../../static/header_image/4.jpg",
            handler: "212ced76-ef64-4713-90e6-0f42375c1099"
          },
          {
            url: "../../static/header_image/5.jpg",
            handler: "e1b4af05-f607-4b74-9675-5865570339ed"
          },
          {
            url: "../../static/header_image/6.jpg",
            handler: "1eaf3000-8a2b-4e90-b3b3-3d5e8bf3e58b"
          }
        ]
      };
    },
    methods: {
      goChatMain(handler) {
        uni.navigateTo({
          url: "/pages/chatMain/chatMain?handler=" + handler
        });
      }
      // scanQR() {
      // 	uni.scanCode({
      // 		onlyFromCamera: true,
      // 		success: (code) => {
      // 			uni.connectSocket({
      // 				url: "ws://" + String(uni.getStorageSync("ip")).replace("http://") +
      // 					"/websocket",
      // 			})
      // 			uni.request({
      // 				url: uni.getStorageSync('ip') + '/login/check_QR_code',
      // 				data: {
      // 					QRSessionID: code.result,
      // 					token: uni.getStorageSync('token')
      // 				},
      // 				method: 'GET',
      // 				success: (a) => {
      // 					this.msg = a
      // 				},
      // 				fail(e) {
      // 					this.msg = a
      // 				}
      // 			})
      // 		},
      // 	})
      // }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", { class: "container" }, [
          vue.createCommentVNode(' <view class="app-header">\r\n			<button @click="scanQR(token)"\r\n				style="margin-top: 40px;display: flex;align-items: center;justify-content: center;padding: 5px 0;">\r\n				<image src="../../static/扫码_scan-code.svg" style="width: 30px;height: 30px;"></image>\r\n			</button>\r\n		</view> '),
          vue.createElementVNode("view", { class: "list-view" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.user, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  onClick: ($event) => $options.goChatMain(item.handler),
                  class: "list",
                  style: { "display": "flex", "align-items": "center", "padding": "5px 0 5px 10px" }
                }, [
                  vue.createElementVNode("image", {
                    src: item.url,
                    style: { "width": "35px", "height": "35px", "border-radius": "10px" }
                  }, null, 8, ["src"]),
                  vue.createElementVNode("view", { style: { "display": "flex", "flex-direction": "column", "margin-left": "20px" } }, [
                    vue.createElementVNode(
                      "text",
                      { style: { "font-size": "16px", "color": "#444444" } },
                      vue.toDisplayString(index),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("text", { style: { "color": "#8d8d8d", "font-size": "13px" } }, "more.............")
                  ])
                ], 8, ["onClick"]);
              }),
              256
              /* UNKEYED_FRAGMENT */
            )),
            vue.createCommentVNode(' <image src="../../static/扫码_scan-code.svg" @click="scanQR(token)" style="width: 30px;height: 30px;"></image> ')
          ])
        ]),
        vue.createCommentVNode(' <button @click="scanQR(token)" style="margin-top: 100px;">扫码登录</button> ')
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__file", "G:/github-progect/rmg-system/rmg-system-phone/pages/index/index.vue"]]);
  const _imports_0$2 = "/static/female.svg";
  const _imports_1$2 = "/static/male.svg";
  const _imports_2$1 = "/static/scan-code.svg";
  const _imports_2 = "/static/mail.svg";
  const _imports_4 = "/static/phone.svg";
  const _imports_5 = "/static/config.svg";
  const _sfc_main$3 = {
    data() {
      return {
        user: "",
        headerURL: ""
      };
    },
    methods: {
      gotoPage() {
        uni.navigateTo({
          url: "/pages/login/login"
        });
      },
      LogOut() {
        uni.showModal({
          content: "确定要退出登录吗？",
          confirmColor: "red",
          cancelColor: "#007aff"
        }).then((res) => {
          if (res.confirm == true) {
            uni.removeStorageSync("token");
            uni.navigateTo({
              url: "/pages/login/login"
            });
          }
        });
      },
      scanQR() {
        uni.scanCode({
          onlyFromCamera: true,
          success: (code) => {
            uni.connectSocket({
              url: "ws://" + String(uni.getStorageSync("ip")).replace("http://") + "/websocket"
            });
            uni.request({
              url: uni.getStorageSync("ip") + "/login/check_QR_code",
              data: {
                QRSessionID: code.result,
                token: uni.getStorageSync("token")
              },
              method: "GET",
              success: (a2) => {
                this.msg = a2;
              },
              fail(e) {
                this.msg = a;
              }
            });
          }
        });
      }
    },
    mounted() {
      uni.request({
        url: uni.getStorageSync("ip") + "/user/init_user_data",
        method: "POST",
        header: {
          Authorization: uni.getStorageSync("token")
        }
      }).then((res) => {
        this.user = res.data.data[0];
        this.headerURL = uni.getStorageSync("ip") + "/users_profile/" + this.user.header_img;
      });
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", { style: { "height": "100%", "padding-top": "30px" } }, [
          vue.createElementVNode(
            "view",
            {
              style: vue.normalizeStyle([{ "display": "flex", "width": "calc(100% - 60px)", "padding": "20px 20px 50px 20px", "margin-left": "10px", "border-radius": "2.5px", "align-items": "center", "box-shadow": "0px 0px 5px #a8a8a8" }, { "backgroundColor": $data.user.sex == "女" ? "#ffddfb" : "#b2bdff" }])
            },
            [
              vue.createElementVNode("image", {
                src: $data.headerURL,
                mode: "",
                style: { "width": "70px", "height": "70px", "border-radius": "5px" }
              }, null, 8, ["src"]),
              vue.createElementVNode("view", { style: { "margin-left": "20px", "width": "max" } }, [
                vue.createElementVNode("view", { style: { "display": "flex", "align-items": "center", "justify-content": "space-evenly" } }, [
                  vue.createElementVNode("view", {
                    class: "personal-info-group",
                    style: { "display": "flex", "flex-direction": "column", "align-items": "flex-start", "margin-right": "20px" }
                  }, [
                    vue.createElementVNode("view", { style: { "display": "flex", "align-items": "center" } }, [
                      vue.createElementVNode(
                        "text",
                        { style: { "font-size": "20px" } },
                        vue.toDisplayString($data.user.username),
                        1
                        /* TEXT */
                      ),
                      $data.user.sex == "女" ? (vue.openBlock(), vue.createElementBlock("image", {
                        key: 0,
                        src: _imports_0$2,
                        style: { "width": "20px", "height": "20px", "margin-left": "5px" }
                      })) : (vue.openBlock(), vue.createElementBlock("image", {
                        key: 1,
                        src: _imports_1$2,
                        style: { "width": "20px", "height": "20px", "margin-left": "5px" }
                      }))
                    ]),
                    vue.createElementVNode(
                      "text",
                      { style: { "font-size": "15px", "word-break": "keep-all" } },
                      vue.toDisplayString($data.user.department),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      { style: { "font-size": "12px", "word-break": "keep-all" } },
                      vue.toDisplayString($data.user.second_department),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      { style: { "font-size": "12px", "word-break": "keep-all" } },
                      vue.toDisplayString($data.user.level),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode(
                    "view",
                    { style: { "font-size": "15px", "word-break": "keep-all" } },
                    vue.toDisplayString($data.user.job),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("image", {
                    src: _imports_2$1,
                    onClick: _cache[0] || (_cache[0] = ($event) => $options.scanQR(_ctx.token)),
                    style: { "width": "25px", "height": "25px", "margin-left": "60px" },
                    mode: "aspectFit"
                  })
                ])
              ])
            ],
            4
            /* STYLE */
          ),
          vue.createElementVNode("view", { style: { "width": "calc(100% - 50px)", "margin-left": "20px", "padding": "3px 5px", "background-color": "#fdfdfd", "margin-top": "0px", "text-align": "center", "transform": "translateY(-30px)", "border-radius": "5px", "box-shadow": "0px 0px 5px #a8a8a8" } }, [
            vue.createElementVNode("view", { style: { "font-size": "15px", "padding": "10px 10px", "display": "flex", "justify-content": "start", "align-items": "center", "background-color": "#f4f4f4", "margin": "2px 0 5px 0" } }, [
              vue.createElementVNode("image", {
                src: _imports_2,
                style: { "width": "20px", "height": "30px" }
              }),
              vue.createElementVNode(
                "text",
                { style: { "margin-left": "10px" } },
                vue.toDisplayString($data.user.email) + "@system.rmg",
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { style: { "font-size": "15px", "padding": "10px 10px", "display": "flex", "justify-content": "start", "align-items": "center", "background-color": "#f4f4f4", "margin": "0px 0 5px 0" } }, [
              vue.createElementVNode("image", {
                src: _imports_4,
                style: { "width": "20px", "height": "30px" }
              }),
              vue.createElementVNode(
                "text",
                { style: { "margin-left": "10px" } },
                vue.toDisplayString($data.user.phone_number),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { style: { "font-size": "15px", "padding": "10px 10px", "display": "flex", "justify-content": "start", "align-items": "center", "background-color": "#f4f4f4", "margin": "0px 0 5px 0" } }, [
              vue.createElementVNode("image", {
                src: _imports_5,
                style: { "width": "20px", "height": "30px" },
                mode: ""
              }),
              vue.createElementVNode("text", { style: { "margin-left": "10px" } }, "检查更新")
            ])
          ]),
          vue.createElementVNode("view", {
            style: { "background-color": "#ee4f52", "width": "calc(100% - 40px)", "margin-left": "10px", "margin-top": "10px", "border-radius": "5px", "padding": "10px", "text-align": "center", "color": "#ececec", "font-weight": "bold", "box-shadow": "0px 0px 5px #6c6c6c" },
            onClick: _cache[1] || (_cache[1] = ($event) => $options.LogOut())
          }, [
            vue.createElementVNode("text", null, "退出登录")
          ]),
          vue.createElementVNode("view", { style: { "position": "absolute", "bottom": "5%", "width": "100%", "text-align": "center", "color": "#8f8f8f", "font-size": "12px" } }, " v 1.0.0 ")
        ]),
        vue.createCommentVNode(' <button @click="gotoPage()" style="position: fixed;bottom: 100px;right: 0px;">go to login</button> ')
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const PagesMineMine = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "G:/github-progect/rmg-system/rmg-system-phone/pages/mine/mine.vue"]]);
  const _imports_0$1 = "/static/user.svg";
  const _imports_1$1 = "/static/lock.svg";
  const _sfc_main$2 = {
    data() {
      return {
        pic: "",
        password: "",
        username: "",
        captcha: "",
        useLAN: false,
        server_ip: [null, null, null, null, null],
        server_ip_element: [],
        loginFlag: [false, false, false]
      };
    },
    methods: {
      // 登录
      login() {
        uni.request({
          url: uni.getStorageSync("ip") + "/login/login",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            "Username": this.username,
            "Password": this.password,
            "Captcha": this.captcha
          },
          method: "POST"
        }).then((res) => {
          if (this.password != "" && this.username != "" && this.captcha != "") {
            if (res.data.code == 200) {
              uni.showToast({
                icon: "none",
                title: res.data.msg
              });
              uni.switchTab({
                url: "/pages/index/index"
              });
              uni.setStorageSync("token", res.data.data);
            }
            if (res.data.code == 403) {
              uni.showToast({
                icon: "none",
                title: res.data.msg
              });
            }
          } else {
            if (this.password == "") {
              this.loginFlag[1] = true;
            }
            if (this.username == "") {
              this.loginFlag[0] = true;
            }
            if (this.captcha == "") {
              this.loginFlag[2] = true;
            }
          }
        });
      },
      // 获取验证码
      getCaptcha() {
        uni.request({
          url: uni.getStorageSync("ip") + "/login/captcha",
          method: "GET",
          responseType: "arraybuffer"
        }).then((res) => {
          this.pic = "data:image/png;base64," + uni.arrayBufferToBase64(res.data);
        });
      },
      // 设置服务器IP
      setLAN() {
        if (this.server_ip[0] != null && this.server_ip[1] != null && this.server_ip[2] != null && this.server_ip[3] != null && this.server_ip[4] != null) {
          let pass = false;
          this.server_ip.forEach((item, index) => {
            if (index <= 3) {
              if (this.server_ip[index] > 255 || this.server_ip[index] == null) {
                pass = false;
              } else {
                pass = true;
              }
            } else {
              if (this.server_ip[index] > 66535 || this.server_ip[index] == null) {
                pass = false;
              } else {
                pass = true;
              }
            }
          });
          if (pass == false) {
            uni.showToast({
              icon: "none",
              title: "IP地址有误!"
            });
          } else {
            if (this.server_ip.length != 0) {
              uni.setStorageSync("wsIP", "ws://" + this.server_ip[0] + "." + this.server_ip[1] + "." + this.server_ip[2] + "." + this.server_ip[3] + ":" + this.server_ip[4]);
              uni.setStorageSync("ip", "http://" + this.server_ip[0] + "." + this.server_ip[1] + "." + this.server_ip[2] + "." + this.server_ip[3] + ":" + this.server_ip[4]);
              this.useLAN = false;
            } else {
              uni.removeStorageSync("ip");
            }
          }
        }
      }
    },
    mounted() {
      setTimeout(() => {
        this.getCaptcha();
        this.loginElement = document.querySelectorAll(".underline");
        this.server_ip_element = document.querySelectorAll(".server-ip");
      }, 1e3);
      if (!uni.getStorageSync("ip") || uni.getStorageSync("ip") == "http://...:") {
        uni.setStorageSync("ip", "http://192.168.43.8 7:8080");
      }
      let ip = uni.getStorageSync("ip");
      let tempArr = String(ip).replace("http://", "").replace(":", ".").split(".");
      this.server_ip[0] = tempArr[0];
      this.server_ip[1] = tempArr[1];
      this.server_ip[2] = tempArr[2];
      this.server_ip[3] = tempArr[3];
      this.server_ip[4] = tempArr[4];
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "login-container" }, [
      vue.createElementVNode("view", { class: "login-title" }, [
        vue.createElementVNode("text", null, "资产管理系统")
      ]),
      vue.createElementVNode("view", { style: { "width": "80%", "display": "flex", "flex-direction": "column", "justify-content": "space-between" } }, [
        vue.createElementVNode("view", { class: "group" }, [
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "login-input",
              type: "text",
              id: "username",
              name: "username",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.username = $event),
              placeholder: "请输入用户名"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $data.username]
          ]),
          vue.createElementVNode("image", { src: _imports_0$1 }),
          this.loginFlag[0] ? (vue.openBlock(), vue.createElementBlock("span", {
            key: 0,
            class: "underline"
          })) : vue.createCommentVNode("v-if", true)
        ]),
        vue.createElementVNode("view", { class: "group" }, [
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "login-input",
              type: "safe-password",
              id: "password",
              name: "password",
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.password = $event),
              placeholder: "请输入密码"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $data.password]
          ]),
          vue.createElementVNode("image", { src: _imports_1$1 }),
          this.loginFlag[1] ? (vue.openBlock(), vue.createElementBlock("span", {
            key: 0,
            class: "underline"
          })) : vue.createCommentVNode("v-if", true)
        ]),
        vue.createElementVNode("view", { style: { "width": "100%", "display": "flex", "align-items": "center" } }, [
          vue.createElementVNode("view", {
            class: "group",
            style: { "width": "calc(100% - 200rpx)" }
          }, [
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                class: "login-input",
                type: "text",
                id: "captcha",
                name: "captcha",
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.captcha = $event),
                placeholder: "请输入验证码"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.captcha]
            ]),
            vue.createElementVNode("image", { src: _imports_2 }),
            this.loginFlag[2] ? (vue.openBlock(), vue.createElementBlock("span", {
              key: 0,
              class: "underline"
            })) : vue.createCommentVNode("v-if", true)
          ]),
          vue.createElementVNode("image", {
            onClick: _cache[3] || (_cache[3] = (...args) => $options.getCaptcha && $options.getCaptcha(...args)),
            mode: "aspectFit",
            style: { "width": "200rpx", "height": "42.5px" },
            src: this.pic,
            alt: ""
          }, null, 8, ["src"])
        ]),
        vue.createElementVNode("view", { class: "submit-button-group" }, [
          vue.createElementVNode("view", { style: { "width": "200px", "display": "flex", "margin-bottom": "10px" } }, [
            vue.createElementVNode("button", {
              style: { "font-size": "15px", "width": "200px", "height": "35px", "display": "flex", "align-items": "center", "justify-content": "center" },
              type: "primary",
              onClick: _cache[4] || (_cache[4] = (...args) => $options.login && $options.login(...args))
            }, "登录")
          ]),
          vue.createElementVNode("button", {
            style: { "font-size": "12px", "width": "150px", "height": "30px", "line-height": "30px", "border": "none", "color": "#949494", "margin-bottom": "10px" },
            type: "primary",
            plain: "true",
            onClick: _cache[5] || (_cache[5] = () => {
              this.useLAN = true;
            })
          }, "使用内部网络")
        ])
      ]),
      vue.createElementVNode(
        "view",
        {
          style: vue.normalizeStyle([{ "width": "75%", "transition": "all 0.2s", "border": "1px solid #9d9d9d", "padding": "10px 20px", "border-radius": "5px", "color": "#6c6c6c", "margin-top": "5px", "overflow": "hidden" }, { opacity: $data.useLAN == false ? "0" : "1" }])
        },
        [
          vue.createElementVNode("p", { style: { "font-size": "13px", "margin": "10px 0 0px 0" } }, "服务器IP地址:"),
          vue.createElementVNode("view", {
            style: { "display": "flex", "margin-top": "10px", "overflow": "hidden" },
            class: "config-ip"
          }, [
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                maxlength: "3",
                class: "server-ip",
                inputmode: "numeric",
                "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.server_ip[0] = $event)
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.server_ip[0]]
            ]),
            vue.createElementVNode("span", null, "."),
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                maxlength: "3",
                class: "server-ip",
                inputmode: "numeric",
                "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.server_ip[1] = $event)
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.server_ip[1]]
            ]),
            vue.createElementVNode("span", null, "."),
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                maxlength: "3",
                class: "server-ip",
                inputmode: "numeric",
                "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $data.server_ip[2] = $event)
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.server_ip[2]]
            ]),
            vue.createElementVNode("span", null, "."),
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                maxlength: "3",
                class: "server-ip",
                inputmode: "numeric",
                "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $data.server_ip[3] = $event)
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.server_ip[3]]
            ]),
            vue.createElementVNode("span", null, ":"),
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                maxlength: "5",
                style: { "background-color": "#d9d9d9", "width": "200px", "height": "100%" },
                inputmode: "numeric",
                "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $data.server_ip[4] = $event)
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.server_ip[4]]
            ])
          ]),
          vue.createElementVNode("view", { style: { "display": "flex", "margin-top": "20px", "width": "100%", "justify-content": "space-between" } }, [
            vue.createElementVNode("button", {
              type: "primary",
              plain: "true",
              size: "mini",
              style: { "font-size": "12px", "width": "80px", "height": "30px", "margin-right": "10px", "text-align": "center" },
              onClick: _cache[11] || (_cache[11] = (...args) => $options.setLAN && $options.setLAN(...args))
            }, "保存"),
            vue.createElementVNode("button", {
              size: "mini",
              type: "default",
              plain: "true",
              style: { "font-size": "12px", "width": "80px", "height": "30px" },
              onClick: _cache[12] || (_cache[12] = () => {
                this.useLAN = false;
                this.server_ip = [null, null, null, null, null];
              })
            }, "取消")
          ])
        ],
        4
        /* STYLE */
      )
    ]);
  }
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "G:/github-progect/rmg-system/rmg-system-phone/pages/login/login.vue"]]);
  const _imports_0 = "/static/left.svg";
  const _imports_1 = "/static/add-one.svg";
  const _sfc_main$1 = {
    data() {
      return {};
    },
    methods: {
      backToMain() {
        uni.navigateBack();
      }
    },
    onLoad(options) {
      uni.connectSocket({
        url: uni.getStorageSync("wsIP") + "/communicate"
      });
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "container",
      style: { "width": "100%", "height": "100%" }
    }, [
      vue.createElementVNode("view", { class: "title-bar" }, [
        vue.createElementVNode("text", null, "张三"),
        vue.createElementVNode("image", {
          onClick: _cache[0] || (_cache[0] = ($event) => $options.backToMain()),
          src: _imports_0,
          style: { "width": "25px", "height": "50px", "position": "absolute", "left": "10px" }
        })
      ]),
      vue.createElementVNode("scroll-view", {
        "scroll-y": "true",
        style: { "background-color": "#eeeeee" },
        class: "chat-main"
      }, [
        (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(20, (a2) => {
            return vue.createElementVNode(
              "view",
              {
                class: "chat-text",
                style: vue.normalizeStyle({ "margin-left": a2 % 2 == 0 ? "30px" : "120px", "backgroundColor": a2 % 2 == 0 ? "#f8f8f8" : "#78c5f8" })
              },
              [
                vue.createElementVNode(
                  "text",
                  { style: { "padding": "5px 15px" } },
                  vue.toDisplayString(a2),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  {
                    class: "chat-text-block",
                    style: vue.normalizeStyle({ "left": a2 % 2 == 0 ? "-8px" : "", "right": a2 % 2 != 0 ? "-8px" : "", "backgroundColor": a2 % 2 == 0 ? "#f8f8f8" : "#78c5f8" })
                  },
                  null,
                  4
                  /* STYLE */
                )
              ],
              4
              /* STYLE */
            );
          }),
          64
          /* STABLE_FRAGMENT */
        ))
      ]),
      vue.createElementVNode("view", {
        class: "",
        "adjust-position": "true",
        style: { "height": "60px", "display": "flex", "align-items": "center", "justify-content": "space-evenly" }
      }, [
        vue.createElementVNode("textarea", {
          type: "text",
          value: "123123",
          style: { "line-height": "40px", "height": "40px", "background-color": "#f4f4f4", "width": "80%", "box-shadow": "0px 0px 1px 1px #e1e1e1 inset", "padding": "0 10px", "border-radius": "5px" }
        }),
        vue.createElementVNode("image", {
          src: _imports_1,
          mode: "",
          style: { "width": "30px", "height": "30px" }
        })
      ])
    ]);
  }
  const PagesChatMainChatMain = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-fb5e2403"], ["__file", "G:/github-progect/rmg-system/rmg-system-phone/pages/chatMain/chatMain.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/mine/mine", PagesMineMine);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/chatMain/chatMain", PagesChatMainChatMain);
  const _sfc_main = {};
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "G:/github-progect/rmg-system/rmg-system-phone/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
