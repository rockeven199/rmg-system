<style style="scss">
	.personal-info-group {

		text {
			margin: 1px 0;
		}

	}
</style>
<template>
	<view style="height: 100%;padding-top: 30px;">
		<view
			style="display: flex;width: calc(100% - 60px);padding: 20px 20px 50px 20px;margin-left: 10px; border-radius: 2.5px;align-items: center;box-shadow: 0px 0px 5px #a8a8a8;"
			:style="{'backgroundColor':user.sex=='女'?'#ffddfb':'#b2bdff'}">
			<image :src="headerURL" mode="" style="width: 70px;height: 70px;border-radius: 5px;"></image>
			<view style="margin-left: 20px;width: max;">
				<view style="display: flex;align-items: center;justify-content:space-evenly;">
					<view class="personal-info-group"
						style=" display: flex;flex-direction: column;align-items: flex-start;margin-right: 20px;">
						<view style="display: flex; align-items: center;">
							<text style="font-size: 20px;">{{user.username}}</text>
							<image src="../../static/female.svg" style="width: 20px;height: 20px;margin-left: 5px;"
								v-if="user.sex=='女'">
							</image>
							<image v-else src="../../static/male.svg"
								style="width: 20px;height: 20px;margin-left: 5px;">
							</image>
						</view>
						<text style="font-size: 15px;word-break: keep-all;"> {{user.department}}</text>
						<text style="font-size: 12px;word-break: keep-all;">{{user.second_department}}</text>
						<text style="font-size: 12px;word-break: keep-all;">{{user.level}}</text>
					</view>
					<view style="font-size: 15px;word-break: keep-all;"> {{user.job}} </view>
					<image src="../../static/scan-code.svg" @click="scanQR(token)"
						style="width: 25px;height: 25px;margin-left: 60px;" mode="aspectFit">
					</image>
				</view>
			</view>
		</view>
		<view
			style="width: calc(100% - 50px);margin-left: 20px; padding:3px 5px;background-color: #fdfdfd;margin-top:0px; text-align: center;transform: translateY(-30px);border-radius: 5px;box-shadow: 0px 0px 5px #a8a8a8;">
			<view
				style="font-size: 15px;padding: 10px 10px;display: flex;justify-content:start;display: flex;align-items: center;background-color: #f4f4f4;margin: 2px 0 5px 0;">
				<image src="../../static/mail.svg" style="width: 20px;height: 30px;"></image>
				<text style="margin-left: 10px;">{{user.email}}@system.rmg</text>
			</view>
			<view
				style="font-size: 15px;padding: 10px 10px;display: flex;justify-content:start;display: flex;align-items: center;background-color: #f4f4f4;margin: 0px 0 5px 0;">
				<image src="../../static/phone.svg" style="width: 20px;height: 30px;"></image>
				<text style="margin-left: 10px;">{{user.phone_number}}</text>
			</view>
			<view
				style="font-size: 15px;padding: 10px 10px;display: flex;justify-content:start;display: flex;align-items: center;background-color: #f4f4f4;margin: 0px 0 5px 0;">
				<image src="../../static/config.svg" style="width: 20px;height: 30px;" mode="">
				</image>
				<text style="margin-left: 10px;">检查更新</text>
			</view>
		</view>
		<view style="background-color: #ee4f52; width: calc(100% - 40px);margin-left: 10px;margin-top: 10px;border-radius: 5px;
			padding: 10px;text-align: center;color: #ececec;font-weight: bold;box-shadow: 0px 0px 5px #6c6c6c;" @tap="LogOut()">
			<text>退出登录</text>
		</view>
		<view style="position: absolute;bottom: 5%;width: 100%;text-align: center;color: #8f8f8f;font-size: 12px;">
			v 1.0.0
		</view>
	</view>
	<!-- <button @click="gotoPage()" style="position: fixed;bottom: 100px;right: 0px;">go to login</button> -->
</template>
<script>
	export default {
		data() {
			return {
				user: "",
				headerURL: ""
			}
		},
		methods: {
			gotoPage() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			LogOut() {
				uni.showModal({
					content: '确定要退出登录吗？',
					confirmColor: 'red',
					cancelColor: '#007aff'
				}).then((res) => {
					if (res.confirm == true) {
						uni.removeStorageSync("token")
						uni.navigateTo({
							url: "/pages/login/login"
						})
					}
				})
			},
			scanQR() {
				uni.scanCode({
					onlyFromCamera: true,
					success: (code) => {
						uni.connectSocket({
							url: "ws://" + String(uni.getStorageSync("ip")).replace("http://") +
								"/websocket",
						})
						uni.request({
							url: uni.getStorageSync('ip') + '/login/check_QR_code',
							data: {
								QRSessionID: code.result,
								token: uni.getStorageSync('token')
							},
							method: 'GET',
							success: (a) => {
								this.msg = a
							},
							fail(e) {
								this.msg = a
							}
						})
					},
				})
			}
		},
		mounted() {
			uni.request({
				url: uni.getStorageSync('ip') + "/user/init_user_data",
				method: 'POST',
				header: {
					Authorization: uni.getStorageSync("token")
				}
			}).then(res => {
				this.user = res.data.data[0]
				this.headerURL = uni.getStorageSync("ip") + "/users_profile/" + this.user.header_img
			})
		}
	}
</script>