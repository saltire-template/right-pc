<template>
	<div class="l-box-wechart">
		<div class="l-we-icon" @click="typeChange"></div>
		<div class="l-we-title">
			<img src="~@/components/login/img/login/weixin.png" alt="">
			<span>微信安全登陆</span>
		</div>
		<div class="l-we-code">
			<img alt="" :src="src">
		</div>
		<div class="l-we-footer">
			<div class="l-we-show">微信扫描二维码登录</div>
			<div class="l-we-qs">扫码登录遇到问题<span @click="OpenWindow('https://cschat-ccs.aliyun.com/index.htm?tntInstId=_0t8K1Ye&scene=SCE00002310#/','960','648','在线客服','')">联系客服</span></div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	
	
	export default {
		name: 'loginForWeChart',
		data() {
			return {
				src: '',
				ticket: '',
				openId: '',
				timer: null,
				source: null
			}
		},
		computed: {
			status() {
				return this.$store.state.loginModal
			}
		},
		watch: {},
		methods: {
			typeChange() {
				this.$emit('loginType', 'account')
			},
			// 获取二维码
			getcode() {
				this.https.get('/login/account/qrcode', {}).then((res) => {
					this.src = res.data.url;
					this.ticket = res.data.ticket;
					this.getStatus();
				})
			},
			// 检查状态
			getStatus() {
				var _this = this;
				_this.cancelQuest();
				axios.get('/login/account/qrcodeStatus/' + _this.ticket, {
						cancelToken: new axios.CancelToken(function executor(c) {
							_this.source = c;
						}),
					})
					.then(function(res) {
						if (res.data.code == '0000') {
							_this.openId = res.data.data;
							_this.goLogin();
						} else if (res.data.data != '' || res.data.data != undefined || res.data.data != null) {
							_this.timer = setTimeout(function() {
								_this.getStatus()
							}, 1000);
						}
					})
					.catch(function(error) {
						// console.log(error);
					});
			},
			// 微信登录
			goLogin() {
				this.https.post('/login/account/wechatLogin/' + this.openId, {}).then((res) => {
					if (res.code == '0000') {
						this.bingWebChart()
					} else if (res.code == "0001") {
						this.openId = res.data;
						this.$emit('loginType', 'register')
						this.$store.commit('SET_OPENID', this.openId);
					}
				})
			},
			bingWebChart() {
				this.https.post('/login/account/wechat/bind/' + this.openId, {}).then((res) => {
					if (res.code == '0000') {
						this.$utils.setCookie('ticket',res.data.ticket,1)
						this.getInfoAuthor(res.data.ticket);
					} else {
						this.$Message.error(res.msg);
					}
				})
			},
			// 本项目登录
			async getInfoAuthor(val){
				let obj = {
					ticket:val
				}
				let res = await this.https.post('/account/login',obj);
				if(res.code == '0000'){
					this.$store.commit('IS_LOGIN', true);
					this.$store.commit('GET_AUTHORNAME', res.data.authorName);
					this.$store.commit('IS_LOGINMODAL', false);
					this.$Message.success('登录成功');
				}else{
					console.error(res.code)
				}
			},
			cancelQuest() {
				if (typeof this.source === 'function') {
					this.source('结束')
				}
			},
			OpenWindow(url, width, height, name, options) {
				var left = (screen.width - width) / 2;
				var top = (screen.height - height) / 2;
				if (options == null)
					options = "";
				var newWin = window.open(url, name, "left=" + left + ",top=" + top + ",width=" + width + ",height=" + height + "," +
					options);
				newWin.focus();
				return newWin;

			}

		},
		mounted() {
			this.getcode()
		},
		created() {

		},
		destroyed() {
			this.cancelQuest()
			clearTimeout(this.timer);
			this.timer = null;
		}
	}
</script>

<style lang="less" scoped>
	.l-box-wechart {
		width: 100%;
		height: 100%;
		display: inline-block;
		position: relative;

		.l-we-icon {
			width: 24px;
			height: 24px;
			position: absolute;
			right: 0;
			top: 0;
			background: url('~@/components/login/img/login/diannao.png');
			background-repeat: no-repeat;
			background-size: 24px 24px;
			cursor: pointer;
		}

		.l-we-title {
			width: 100%;
			height: 24px;
			line-height: 24px;
			text-align: center;
			margin-top: 19px;
			margin-bottom: 24px;

			img {
				width: 28px;
				height: 24px;
				display: inline-block;
				margin-right: 9px;
				vertical-align: top;
			}

			span {
				font-size: 18px;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
			}
		}

		.l-we-code {
			width: 100%;
			height: 154px;
			text-align: center;
			margin-bottom: 15px;

			img {
				width: 154px;
				height: 154px;
				display: inline-block;
				vertical-align: top;
			}
		}

		.l-we-footer {
			width: 100%;
			height: auto;
			text-align: center;
			margin-bottom: 15px;

			.l-we-show {
				width: 100%;
				height: auto;
				font-size: 16px;
				font-family: Source Han Sans CN;
				color: #333;
				line-height: 26px;
			}

			.l-we-qs {
				width: 100%;
				height: auto;
				font-size: 14px;
				font-family: Source Han Sans CN;
				color: rgba(153, 153, 153, 1);
				line-height: 26px;

				span {
					color: #3399FF;
					cursor: pointer;
				}
			}
		}
	}
</style>
