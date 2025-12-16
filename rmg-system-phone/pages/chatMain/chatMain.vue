<style lang="scss" scoped>
	.container {
		padding-top: 0px;
	}

	.title-bar {
		width: 100%;
		text-align: center;
		height: 50px;
		line-height: 50px;
		background-color: rgb(245, 245, 245);
		position: relative;
	}

	.chat-main {
		height: calc(100% - 130px);
		padding-bottom: 20px;
	}

	.chat-text {
		border-radius: 2.5px;
		height: 45px;
		position: relative;
		width: calc(100% - 150px);
		margin: 15px 0;
		display: flex;
		align-items: center;
	}

	.chat-text-block {
		width: 16px;
		height: 16px;
		background-color: antiquewhite;
		border-radius: 2.5px;
		position: absolute;
		transform: rotate(45deg);
		z-index: 1;
	}

	uni-page-body {
		height: 100%;
	}
</style>
<template>
	<view class="container" style="width: 100%;height: 100%;">
		<view class="title-bar">
			<text>{{page_title}}</text>
			<image @tap="backToMain()" src="../../static/left.svg"
				style="width: 25px;height: 50px;position: absolute;left: 10px;"></image>
		</view>
		<scroll-view scroll-y="true" style="background-color: #eeeeee;" class="chat-main">
			<view class="chat-text" v-for="a in 20"
				:style="{'margin-left':a%2==0?'30px':'120px','backgroundColor':a%2==0?'#f8f8f8':'#78c5f8'}">
				<text style="padding: 5px 15px;"> {{a}}</text>
				<view class="chat-text-block"
					:style="{'left':a%2==0?'-8px':'','right':a%2!=0?'-8px':'','backgroundColor':a%2==0?'#f8f8f8':'#78c5f8'}">
				</view>
			</view>
		</scroll-view>
		<view class="" adjust-position="true"
			style="height: 60px; display: flex;align-items: center;justify-content:space-evenly;">
			<textarea type="text" value="123123"
				style="line-height: 40px;height: 40px; background-color: #f4f4f4;width: 80%;box-shadow: 0px 0px 1px 1px #e1e1e1 inset;padding: 0 10px;border-radius: 5px;"></textarea>
			<image src="../../static/add-one.svg" mode="" style="width: 30px;height: 30px;" </image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page_title: ""
			};
		},
		methods: {
			backToMain() {
				uni.navigateBack()
			}
		},
		onLoad(options) {
			this.page_title = options.user_id
		},
		onShow() {
			const socket = uni.connectSocket({
				url: uni.getStorageSync("wsIP") + '/communicate',
			})
			// uni.onSocketOpen(() => {
			// 	uni.sendSocketMessage({
			// 		data: options.handler
			// 	})
			// })
		}
	}
</script>