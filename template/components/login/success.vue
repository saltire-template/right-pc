<template>
	<div>
		<input type="text" style="position: absolute;left: -5000px;">
		<input type="password" style="position: absolute;left: -5000px;">
		<div class="r-top">
			<span class="r-back" @click="back">&lt; 返回</span>
		</div>
		<div class="r-item r-mt">
			<input type="password" placeholder="请设置6-16位登录密码" maxlength="16" v-model="newPassword">
		</div>
		<div class="r-item">
			<input type="password" placeholder="请再次输入密码" maxlength="16" v-model="againPassword">
		</div>
		<div class="r-btn" @click="submit">完成</div>
	</div>
</template>

<script>
	export default {
		name: 'success',
		data() {
			return {
				newPassword:'',
				againPassword:'',
				flag:true
			}
		},

		computed: {},
		watch: {},
		methods: {
			back() {
				this.$emit('loginType', 'account')
			},
			login() {
				this.$emit('loginType', 'wechat')
			},
			start() {
				this.show = true
			},
			submit() {
				if(this.flag){
					this.flag = false;
					if(this.newPassword == ''||this.againPassword == ''){
						this.$Message.error('请输入密码');
						this.flag = true;
						return false
					}
					if(this.newPassword.length<6||this.againPassword<6){
						this.$Message.error('请输入6-16位密码');
						this.flag = true;
						return false
					}
					if(this.newPassword !== this.againPassword){
						this.$Message.error('两次密码不一致');
						this.flag = true;
						return false
					}
					let obj = {
						password:this.newPassword,
						repassword:this.againPassword,
						code:this.$store.state.dataCode
					}
					this.https.post('/login/account/resetPassword',obj).then((res)=>{
						if(res.code == '0000'){
							this.$Message.success('重置密码成功，请登录');
							this.$emit('loginType', 'account');
						}else{
							this.$Message.error(res.msg);
							this.flag = true;
							return false
						}
					})
				}
			}
		},
		mounted() {
			
		},
		created() {

		},
		destroyed() {
			this.$store.commit('SET_DATACODE','');
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
		margin-top: 20px;
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
		margin-top: 122px;
		margin-bottom: 28px;
		cursor: pointer;
	}
</style>
