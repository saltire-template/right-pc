<template>
	<div>
		<input type="text" style="position: absolute;left: -5000px;">
		<input type="password" style="position: absolute;left: -5000px;">
		<div class="r-top">
			<span class="r-back" @click="back">&lt; 返回</span>
			<div class="r-login">已有账号？<span @click="login">立即登录</span></div>
		</div>
		<div class="r-item r-mt">
			<input type="text" placeholder="请输入手机号" v-model="phone" @blur="onBlurIpt">
		</div>
		<div>
			<vcode v-on:isOk='isSuccess' :isInput="ipt"></vcode>
		</div>
		<div class="r-item">
			<input type="text" placeholder="请输入验证码" class="r-ipt-code" v-model="code" maxlength="4">
			<div class="r-spn-code">
				<span :class="{'ccc':timeing==true}" v-html="codeText" @click="getCode"></span>
			</div>
		</div>
		<div class="r-item" v-if="$store.state.openId==''">
			<input type="password" placeholder="请设置6-16位登录密码" v-model="password" maxlength="16">
		</div>
		<div class="r-con">
			注册代表同意<span @click="ag">《用户注册协议》</span>
		</div>
		<div class="r-btn" :class="{'r-mb28':$store.state.openId!=''}" @click="submit">下一步</div>
		<div class="r-foot-btn" v-if="$store.state.openId==''" @click="back">
			<span class="r-foot-logo"></span>
			微信扫码注册
		</div>
		<agreement :status='show' v-on:m="changeModal"></agreement>
	</div>
</template>

<script>
	import vcode from './verification'
	import agreement from './agreement'
	// import tool from '../../utils/common'

	export default {
		name: 'register',
		components: {
			vcode,
			agreement
		},
		props: ['id'],
		data() {
			return {
				show: false,
				codeText: '短信验证码',
				timer: null,
				timeing: false,
				openId: '',
				ids: '',
				// 手机号码
				phone: '',
				flag: true,
				flag2: true,
				// 判断是否安全验证
				success: false,
				// 验证码
				code: "",
				password:'',
				ipt:{
					type:"",
					value:"",
				}
			}
		},

		computed: {
	
		},
		watch: {

		},
		methods: {
			onBlurIpt(){
				this.ipt ={
					type:'phone',
					value:this.phone
				};
				
			},
			isSuccess(val) {
				this.success = val;
			},
			back() {
				this.$emit('loginType', 'wechat')
			},
			login() {
				this.$emit('loginType', 'account')
			},
			start() {
				this.show = true
			},
			// 获取验证码
			getCode() {
				var _this = this;
				if(_this.flag2){
					_this.flag2 = false;
					// 验证手机号
					if (_this.phone == '') {
						_this.$Message.warning('手机号不能为空');
						_this.flag2 = true;
						return false;
					} else {
						if (!this.$utils.checkPhone(_this.phone)) {
							_this.$Message.warning('请填写正确的手机号码');
							_this.flag2 = true;
							return false;
						}
					}
					if (!this.success) {
						_this.$Message.warning('请进行安全验证');
						_this.flag2 = true;
						return false;
					}
					if (_this.$store.state.openId != '') {
						// 新用户微信注册绑定手机
						if (_this.timer == null) {
							_this.https.get('/login/account/wechatRegisterVercode/' + _this.$store.state.openId + '/' + _this.phone).then((res) => {
								if (res.code == '0000') {
									_this.$Message.success('验证码发送成功！');
									var count = 60;
									_this.timer = setInterval(function() {
										if (count <= 0) {
											clearInterval(_this.timer)
											_this.timeing = false;
											_this.codeText = '短信验证码'
											_this.flag2 = true;
											_this.timer = null
										} else {
											count--;
											_this.timeing = true;
											_this.codeText = '重新获取(' + count + 's)';
											_this.flag2 = false;
										}
									}, 1000)
									
								} else {
									_this.$Message.warning(res.msg);
									_this.flag2 = true;
									return false;
								}
							})
						}
					} else {
						//普通注册获取验证码
						if (_this.timer == null) {
							_this.https.get('/login/account/phoneRegisterVercode/' + _this.phone).then((res) => {
								if (res.code == '0000') {
									_this.$Message.success('验证码发送成功！')
									var count = 60;
									_this.timer = setInterval(function() {
										if (count <= 0) {
											clearInterval(_this.timer)
											_this.timeing = false;
											_this.codeText = '短信验证码'
											_this.timer = null
											_this.flag2 = true;
										} else {
											count--;
											_this.timeing = true;
											_this.codeText = '重新获取(' + count + 's)';
											_this.flag2 = false;
										}
									}, 1000)
								} else {
									_this.$Message.warning(res.msg);
									_this.flag2 = true;
									return false;
								}
							})
						}
						
					}
				}
				
			},
			// 提交
			submit() {
				if (this.flag) {
					this.flag = false;
					if (this.phone == '') {
						this.$Message.warning('手机号不能为空');
						this.flag = true;
						return false;
					} else {
						if (!this.$utils.checkPhone(this.phone)) {
							this.$Message.warning('请填写正确的手机号码');
							this.flag = true;
							return false;
						}
					}
					if (!this.success) {
						this.$Message.warning('请进行安全验证');
						this.flag = true;
						return false;
					}
					if(this.code == ''){
						this.$Message.warning('短信验证码不能为空');
						this.flag = true;
						return false;
					}
					// 判断是微信还是普通注册
					if (this.$store.state.openId != '') {
						let obj = {
							phone: this.phone,
							verCode: this.code
						}
						this.https.post('/login/account/wechatRegister/' + this.$store.state.openId, obj).then((res) => {
							if (res.code == "0000") {	
								this.$utils.setCookie('ticket',res.data.ticket,1)
								this.getInfoAuthor(res.data.ticket)
							} else {
								this.$Message.error(res.msg)
								this.flag = true;
							}
						})
					} else {
						// 普通注册
						// 新用户手机号注册
						// 验证密码
						if (this.password == '') {
							this.$Message.warning('密码不能为空');
							this.flag = true;
							return false;
						}else if(this.password.length<6){
							this.$Message.warning('请输入6-16位密码');
							this.flag = true;
							return false;
						}
						let obj = {
							phone:this.phone,
							password:this.$md5(this.password),
							verCode:this.code
						}
						this.https.post('/login/account/doRegister', obj).then((res) => {
							if (res.code == "0000") {
								this.$utils.setCookie('ticket',res.data.ticket,1)
								this.getInfoAuthor(res.data.ticket)
							} else {
								this.$Message.error(res.msg)
								this.flag = true;
							}
						})
					}
				}
			},
			// 本项目登录
			async getInfoAuthor(val){
				let obj = {
					ticket:val
				}
				let res = await this.https.post('/account/login',obj);
				if(res.code == '0000'){
					this.flag = true;
					this.$store.commit('IS_LOGIN', true);
					this.$store.commit('GET_AUTHORNAME', res.data.authorName);
					this.$store.commit('IS_LOGINMODAL', false);
					this.$Message.success('注册成功');
				}else{
					console.error(res.code)
				}
			},
			// 查看协议
			ag() {
				this.show = true
			},
			changeModal(val) {
				this.show = val
			}
		},
		mounted() {
			// 滑块验证 添加验证类型
			this.ipt = {
				type:'phone',
				value:''
			}
		},
		created() {

		},
		destroyed() {
			this.success = false;
			// 清空仓库openid,计时器
			this.$store.commit('SET_OPENID', '');
			clearInterval(this.timer)
			this.timer = null;
		}
	}
</script>

<style lang="less" scoped>
	::-webkit-input-placeholder {
		/* Chrome/Opera/Safari */
		color: #ccc;
	}

	::-moz-placeholder {
		/* Firefox 19+ */
		color: #ccc;
	}

	:-ms-input-placeholder {
		/* IE 10+ */
		color: #ccc;
	}

	:-moz-placeholder {
		/* Firefox 18- */
		color: #ccc;
	}

	.r-top {
		width: 100%;
		height: auto;
		padding: 0 10px;
		margin-top: 8px;
		height: 24px;
		line-height: 24px;
		overflow: hidden;

		.r-back {
			float: left;
			font-size: 16px;
			color: #333333;
			cursor: pointer;
		}

		.r-login {
			float: right;
			font-size: 14px;
			color: #666666;

			span {
				color: #3399FF;
				cursor: pointer;
			}
		}
	}

	.r-item {
		width: 100%;
		height: 40px;
		display: inline-block;
		padding: 0 26px;
		margin-bottom: 9px;

		input {
			width: 100%;
			height: 40px;
			border: none;
			outline: none;
			padding: 6px;
			font-size: 14px;
			border-bottom: 1px solid #E3E3E3;
		}

		.r-ipt-code {
			width: 50%;
			float: left;
		}

		.r-spn-code {
			display: inline-block;
			width: 50%;
			text-align: right;
			line-height: 27px;
			font-size: 14px;
			height: 100%;
			float: right;
			border-bottom: 1px solid #E3E3E3;
			padding: 6px;

			span {
				display: inline-block;
				width: auto;
				height: auto;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #666666;
				cursor: pointer;
			}

			.ccc {
				color: #ccc;
			}
		}

		.r-verification {
			width: 100%;
			height: 100%;
			padding: 0 2px 7px 2px;
			border-bottom: 1px solid #E3E3E3;
			border-radius: 3px;

			.r-verification-bg {
				width: 100%;
				height: 100%;
				position: relative;
				display: inline-block;
				background: #F5F5F5;
				cursor: pointer;
				text-align: center;
				line-height: 28px;
				color: #CCCCCC;
				padding: 2px;

				span {
					display: inline-block;
					width: 28px;
					height: 28px;
					background: #fff;
					border-radius: 3px;
					position: absolute;
					left: 2px;
				}
			}
		}
	}

	.r-mt {
		margin-top: 10px;
	}

	.r-con {
		width: 100%;
		height: auto;
		padding: 0 26px;
		font-size: 13px;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
		margin-top: 5px;

		span {
			color: #3399FF;
			cursor: pointer;
		}
	}

	.r-btn {
		width: 168px;
		height: 42px;
		background: rgba(51, 153, 255, 1);
		box-shadow: 0px 6px 8px 0px rgba(153, 204, 255, 0.52);
		border-radius: 21px;
		line-height: 42px;
		text-align: center;
		font-size: 16px;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		margin: 0 auto;
		margin-top: 22px;
		cursor: pointer;
	}

	.r-mb28 {
		margin-bottom: 28px;
	}

	.r-foot-btn {
		width: 100%;
		height: 20px;
		text-align: center;
		line-height: 20px;
		font-size: 14px;
		font-family: Source Han Sans CN;
		margin-bottom: 9px;
		margin-top: 15px;
		cursor: pointer;
		color: #666666;

		.r-foot-logo {
			display: inline-block;
			width: 24px;
			height: 20px;
			margin-right: 6px;
			background-image: url('./img/wechart.png');
			background-size: cover;
			background-repeat: no-repeat;
			vertical-align: top;
		}
	}
</style>
