<style lang="scss">
	.login-container {
		display: flex;
		height: 80%;
		justify-content: center;
		flex-direction: column;
		align-items: center;

		.login-title {
			margin: 50% 0 10% 0;
			font-size: 20px;
		}

		.submit-button-group {
			width: 100%;
			display: flex;
			margin-top: 5%;
			justify-content: center;
			flex-direction: column;
			align-items: center;
		}

		.group {
			width: 100%;
			display: flex;
			justify-content: center;
			margin: 15px 0;
			position: relative;
			align-items: center;
			overflow: hidden;
			border-radius: 5px;

			image {
				width: 30px;
				height: 20px;
				position: absolute;
				left: 5px;
			}

			input {
				padding: 10px 0 10px 40px;
				font-size: 13px;
				width: 100%;
				border: 1px solid #9c9c9c;
				border-radius: 5px;
			}
		}
	}

	.config-ip {
		width: 100%;
		text-align: center;
		border: 1px solid gray;
		border-radius: 5px;
		color: #434343;
		display: flex;
		align-items: center;
		justify-content: space-between;

		input {
			padding: 6px 0;
			height: 100%;
			font-size: 13px;
			text-align: center;
			font-weight: lighter
		}

		span {
			padding: 2.5px 0;
			font-size: 20px;
			margin: 0 5px;
			width: 15px;
			color: #969696;
		}
	}

	.underline {
		width: 100%;
		position: absolute;
		bottom: 0;
		height: 1.5px;
		background-color: red;
		z-index: 5;
	}
</style>
<template>
	<view class="login-container">
		<view class="login-title">
			<text>资产管理系统</text>
		</view>
		<view style="width: 80%;display: flex;flex-direction: column;justify-content: space-between;">
			<view class="group">
				<input class="login-input" type="text" id="username" name="username" v-model="username"
					placeholder="请输入用户名"></input>
				<image src="../../static/user.svg"></image>
				<span class="underline" v-if="this.loginFlag[0]"></span>
			</view>
			<view class="group">
				<input class="login-input" type="safe-password" id="password" name="password" v-model="password"
					placeholder="请输入密码" />
				<image src="../../static/lock.svg" />
				<span class="underline" v-if="this.loginFlag[1]"></span>
			</view>
			<view style="width: 100%;display: flex;align-items: center;">
				<view class="group" style="width: calc(100% - 200rpx);">
					<input class="login-input" type="text" id="captcha" name="captcha" v-model="captcha"
						placeholder="请输入验证码" />
					<image src="../../static/mail.svg" />
					<span class="underline" v-if="this.loginFlag[2]"></span>
				</view>
				<image @click="getCaptcha" mode="aspectFit" style="width: 200rpx;height: 42.5px;" :src="this.pic"
					alt="" />
			</view>
			<view class="submit-button-group">
				<view style="width: 200px;display: flex;margin-bottom: 10px;">
					<button
						style="font-size: 15px;width: 200px;height: 35px;display: flex;align-items: center;justify-content: center;"
						type="primary" @click="login">登录</button>
				</view>
				<button
					style="font-size: 12px;width: 150px;height: 30px;line-height: 30px;border: none;color: #949494;margin-bottom: 10px;"
					type="primary" plain="true" @click="()=>{this.useLAN=true}">使用内部网络</button>
			</view>
		</view>
		<view
			style="width: 75%;transition: all 0.2s;border: 1px solid #9d9d9d;padding:10px 20px;border-radius: 5px;color:#6c6c6c;margin-top: 5px;overflow: hidden;"
			:style="{opacity:useLAN==false?'0':'1'}">
			<p style="font-size: 13px;margin: 10px 0 0px 0;">服务器IP地址:</p>
			<view style="display: flex;margin-top: 10px;overflow:hidden; " class="config-ip">
				<input maxlength="3" class="server-ip" inputmode="numeric" v-model="server_ip[0]" /><span>.</span>
				<input maxlength="3" class="server-ip" inputmode="numeric" v-model="server_ip[1]" /><span>.</span>
				<input maxlength="3" class="server-ip" inputmode="numeric" v-model="server_ip[2]" /><span>.</span>
				<input maxlength="3" class="server-ip" inputmode="numeric" v-model="server_ip[3]" />
				<span>:</span>
				<input maxlength="5" style="background-color: #d9d9d9;width: 200px;height: 100%;" inputmode="numeric"
					v-model="server_ip[4]" />
			</view>
			<view style="display: flex;margin-top: 20px;width: 100%;justify-content: space-between;">
				<button type="primary" plain="true" size="mini"
					style="font-size: 12px;width: 80px;height: 30px;margin-right: 10px;text-align: center;"
					@click="setLAN">保存</button>
				<button size="mini" type="default" plain="true" style="font-size: 12px;width: 80px;height: 30px;"
					@click="()=>{this.useLAN=false;this.server_ip=[null, null, null, null, null]}">取消</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		onMounted,
		render
	} from 'vue'
	export default {
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
			}
		},
		methods: {
			// 登录
			login() {
				uni.request({
					url: uni.getStorageSync('ip') + "/login/login",
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: {
						"Username": this.username,
						"Password": this.password,
						"Captcha": this.captcha
					},
					method: "POST"
				}).then(res => {
					if (this.password != "" && this.username != "" && this.captcha != "") {
						if (res.data.code == 200) {
							uni.showToast({
								icon: "none",
								title: res.data.msg,
							})

							uni.switchTab({
								url: '/pages/index/index'
							})
							uni.setStorageSync('token', res.data.data)
						}

						if (res.data.code == 403) {
							uni.showToast({
								icon: "none",
								title: res.data.msg,
							})
						}
					} else {
						if (this.password == "") {
							this.loginFlag[1] = true
						}
						if (this.username == "") {
							this.loginFlag[0] = true
						}
						if (this.captcha == "") {
							this.loginFlag[2] = true
						}
					}
				})
			},

			// 获取验证码
			getCaptcha() {
				uni.request({
					url: uni.getStorageSync('ip') + "/login/captcha",
					method: 'GET',
					responseType: 'arraybuffer'
				}).then(res => {
					this.pic = "data:image/png;base64," + uni.arrayBufferToBase64(res.data)
				})
			},

			// 设置服务器IP
			setLAN() {
				if (this.server_ip[0] != null && this.server_ip[1] != null && this.server_ip[2] != null && this.server_ip[
						3] != null && this.server_ip[4] != null) {
					let pass = false;
					this.server_ip.forEach((item, index) => {
						if (index <= 3) {
							if (this.server_ip[index] > 255 || this.server_ip[
									index] == null) {
								pass = false
							} else {
								pass = true
							}
						} else {
							if (this.server_ip[index] > 66535 || this.server_ip[
									index] == null) {
								pass = false
							} else {
								pass = true
							}
						}
					})

					if (pass == false) {
						uni.showToast({
							icon: 'none',
							title: "IP地址有误!"
						})
					} else {
						if (this.server_ip.length != 0) {
							uni.setStorageSync("wsIP", "ws://" + this.server_ip[0] + "." + this.server_ip[1] + "." + this
								.server_ip[
									2] +
								"." +
								this.server_ip[3] + ":" + this.server_ip[4])
							uni.setStorageSync("ip", "http://" + this.server_ip[0] + "." + this.server_ip[1] + "." + this
								.server_ip[
									2] +
								"." +
								this.server_ip[3] + ":" + this.server_ip[4]);
							this.useLAN = false
						} else {
							uni.removeStorageSync("ip")
						}
					}
				}
			}
		},
		mounted() {
			setTimeout(() => {
				this.getCaptcha()
				this.loginElement = document.querySelectorAll(".underline")
				this.server_ip_element = document.querySelectorAll(".server-ip")
			}, 1000)

			if (!uni.getStorageSync('ip') || uni.getStorageSync('ip') == "http://...:") {
				uni.setStorageSync('ip', "http://192.168.43.8 7:8080")
			}

			let ip = uni.getStorageSync('ip')
			let tempArr = String(ip).replace("http://", '').replace(":", '.').split(".")
			this.server_ip[0] = tempArr[0]
			this.server_ip[1] = tempArr[1]
			this.server_ip[2] = tempArr[2]
			this.server_ip[3] = tempArr[3]
			this.server_ip[4] = tempArr[4]
		}
	}
</script>