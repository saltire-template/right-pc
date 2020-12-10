<template>
	<div class="l-box-account">
		<input type="text" style="position: absolute;left: -5000px;">
		<input type="password" style="position: absolute;left: -5000px;">
		<div class="l-num-icon" @click="typeChange"></div>
		<div class="l-num-title">
			<img src="~@/components/login/img/login/zhanghao.png" alt="">
			<span>账号密码登录</span>
		</div>
		<div class="l-num-item">
			<input type="text" placeholder="请输入手机号或邮箱" v-model="username">
		</div>
		<div class="l-num-item">
			<input type="password" placeholder="请输入密码" v-model="password" maxlength="16">
		</div>
		<div class="l-num-action">
			<span class="l-num-forget" @click="forget">验证码登录</span>
			<span class="l-num-reg" @click="zhuce">免费注册</span>
		</div>
		<div class="l-num-btn" @click="submit">登录</div>
	</div>
</template>

<script>
	import mixSHA1 from '~/plugins/safe.js'

	export default {
		name: 'loginForAccount',
		data() {
			return {
				username:'',
				password:'',
				token:'',
				insertTime:'',
				flag:true
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
				this.$emit('loginType', 'wechat')
			},
			zhuce(){
				this.$emit('loginType', 'register')
			},
			forget(){
				this.$emit('loginType', 'forget')
			},
			// 提交
			async submit(){
				if(this.flag){
					this.flag = false;
					// 验证用户名是否为空
					if(this.username==''){
						this.$Message.warning('用户名不能为空');
						this.flag = true;
						return false;
					}
					// 验证密码是否为空
					if(this.password==''){
						this.$Message.warning('密码不能为空');
						this.flag = true;
						return false;
					}
					this.insertTime = new Date().getTime();
					let obj = {
						username:this.username,
						password:this.$md5(this.password),
						token: mixSHA1('login', this.insertTime),
						insertTime:this.insertTime
					}
					let res = await this.https.post('/login/account/doLogin',obj)
					if(res.code == '0000'){
						this.flag = true;
						var url = window.location.href;
						// console.log(url)
						this.$utils.setCookie('GuardStatus',res.data.guardStatus,1)
						this.$utils.setCookie('ticket',res.data.ticket,1)
						this.$store.commit('SET_TICKET', res.data.ticket);
						switch (this.$utils.getCookie('type')){
							case 'management':
								window.location.href = this.$baseUrl.$_space+'contentManage'
								break;
							case 'center':
								window.location.href = this.$baseUrl.$_space+'rightsProtect/content'
								break;
							case 'write':
								window.location.href = this.$baseUrl.$_router+'router?callback='+url+'&&returnUrl='+this.$baseUrl.$_router+'author/editor#/write'
								break;
							default:
								this.getInfoAuthor(res.data.ticket)
								break;
						}
					}else{
						this.$Message.error(res.msg);
						this.flag = true;
						return false
					}
				}
			},
			// 本项目登录
			async getInfoAuthor(val){
				let obj = {
					ticket:val
				}
				let res = await this.https.post('/home/account/login',obj);
				if(res.code == '0000'){
					this.$store.commit('IS_LOGIN', true);
					this.$store.commit('GET_AUTHORNAME', res.data.authorName);
					this.$store.commit('IS_LOGINMODAL', false);
					this.$Message.success('登录成功');
				}else{
					console.error(res.code)
				}
			}
		},
		mounted() {

		},
		created() {}
	}
</script>

<style lang="less" scoped>
	::-webkit-input-placeholder { /* Chrome/Opera/Safari */
		color: #ccc;
	}
	::-moz-placeholder { /* Firefox 19+ */
		color: #ccc;
	}
	:-ms-input-placeholder { /* IE 10+ */
	 color: #ccc;
	}
	:-moz-placeholder { /* Firefox 18- */
	 color: #ccc;
	}

	.l-box-account {
		width: 100%;
		height: 100%;
		display: inline-block;
		position: relative;

		.l-num-icon {
			width: 24px;
			height: 24px;
			position: absolute;
			right: 0;
			top: 0;
			background: url('~@/components/login/img/login/erweima.png');
			background-repeat: no-repeat;
			background-size: 24px 24px;
			cursor: pointer;
		}

		.l-num-title {
			width: 100%;
			height: 27px;
			line-height: 27px;
			text-align: center;
			margin-top: 17px;
			margin-bottom: 24px;

			img {
				width: 27px;
				height: 27px;
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

		.l-num-item {
			width: 100%;
			height: 40px;
			display: inline-block;
			padding: 0 26px;
			margin-bottom: 13px;
			input{
				width: 100%;
				height: 40px;
				border: none;
				outline: none;
				padding: 6px;
				font-size: 14px;
				border-bottom: 1px solid #E3E3E3;
			}
		}

		.l-num-action {
			padding: 0 26px;
			margin-top: 2px;
			overflow: hidden;

			.l-num-forget {
				width: auto;
				float: left;
				cursor: pointer;
				color: #666666;
			}

			.l-num-reg{
				width: auto;
				float: right;
				cursor: pointer;
				color: #3399FF;
			}
		}
		.l-num-btn{
			width:168px;
			height:42px;
			background:rgba(51,153,255,1);
			box-shadow:0px 6px 8px 0px rgba(153,204,255,0.52);
			border-radius:21px;
			line-height: 42px;
			text-align: center;
			font-size:16px;
			font-family:Source Han Sans CN;
			font-weight:400;
			color:rgba(255,255,255,1);
			margin: 0 auto;
			margin-top: 30px;
			cursor: pointer;
			margin-bottom: 30px;
		}
	}
</style>
