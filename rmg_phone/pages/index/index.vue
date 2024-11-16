<template>
	<button @click="scanQR">扫码登录</button>
	<p>{{msg}}</p>
</template>

<script>
	export default {
		data() {
			return {
				msg: '',
				token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VybmFtZSI6InJvb3QiLCJleHAiOjcwMjcwNTkzOTEsIlBhc3N3b3JkIjoiMTIzIn0.gTi3PKZa_Jx-RxfEusFLa6qc7RVpNm1JH-5XsKKTUpo'
			}
		},
		methods: {
			scanQR() {
				uni.scanCode({
					onlyFromCamera: true
				}).then((code) => {
					uni.request({
						url: 'http://192.168.43.87:8080/login/check_QR_code',
						data: {
							token: this.token,
							sessionId: code.result
						},
						method: 'GET'
					}).then(res => {})
				})
			}
		}
	}
</script>

<style>
</style>