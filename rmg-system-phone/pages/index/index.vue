<style lang="scss">
	.container {
		width: 100%;
		padding-top: 10px;

		.list-view {
			width: 95%;

			.list {
				width: 100%;
				height: 50px;
				background: #f7f7f7;
				margin: 10px 2.5%;
				box-shadow: 0px 0px 3px 1px #f3f3f3;
				border-radius: 5px;
			}
		}

		.app-header {
			width: 100%;
			height: 50px;
		}
	}
</style>
<template>
	<view class="container">
		<!-- <view class="app-header">
			<button @click="scanQR(token)"
				style="margin-top: 40px;display: flex;align-items: center;justify-content: center;padding: 5px 0;">
				<image src="../../static/扫码_scan-code.svg" style="width: 30px;height: 30px;"></image>
			</button>
		</view> -->
		<view class="list-view">
			<view @tap="goChatMain(item.user_chat_id)" class="list" v-for="(item,index) in user"
				style="display:flex;align-items: center;padding: 5px 0 5px 10px;">
				<image :src="item.user_chat_header" style="width: 35px;height: 35px;border-radius: 10px;"></image>
				<view style="display: flex;flex-direction: column;margin-left: 20px;">
					<text style="font-size: 16px;color: #444444;">{{item.user_chat_name}}</text>
					<text style="color: #8d8d8d;font-size: 13px;">more.............</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				user: ""
			}
		},
		methods: {
			goChatMain(user_id) {
				uni.navigateTo({
					url: '/pages/chatMain/chatMain?user_id=' + user_id
				})
			},

		},
		mounted() {
			uni.request({
				url: "http://localhost:8080/getUser",
				success: (res) => {
					this.user = res.data
				}
			})
		}
	}
</script>