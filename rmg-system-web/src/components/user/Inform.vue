<template>
	<div class="w-full h-full overflow-y-scroll shadow-lg">
		<h1 class="my-[20px] text-[20px] text-center">{{ news.news_title }}</h1>
		<pre style="white-space: pre-wrap;letter-spacing: 2px;word-break: break-all;word-wrap: break-word;"
			class="mx-[50px]  text-sm leading-8 shadow-lg p-[30px]">{{ news.news_text }}</pre>
		<div class="text-[12px] flex flex-col ml-[70px] my-[40px] text-gray-500">
			<p class="my-[5px]"> 作者：{{ news.news_author }}</p>
			<p> 上传时间：{{ news.news_pub_datetime }}</p>
		</div>
	</div>
</template>
<script>
export default {
	components: {},
	data() {
		return {
			news: "",
			newsStr: []
		};
	},
	mounted() {
		this.g_reqData("/base/news/" + this.$route.query.newsId, "GET", { token: this.$cookies.get("token") }, null, null, false).then(res => {
			this.news = res.data[0]
			// let temp = res.data[0].news_text.split("。")
			// temp.forEach(element => {
			// 	element + "。" + "\n"
			// });
			// this.newsStr = temp
		})
	},
	methods: {}
};
</script>
<style></style>
