<template>
	<div class="l-box-account">
		<input type="text" style="position: absolute;left: -5000px;">
		<input type="password" style="position: absolute;left: -5000px;">
		<div class="l-num-icon" @click="typeChange"></div>
		<div class="l-num-title">
			<img src="~@/components/login/img/login/zhanghao.png" alt="">
			<span>验证码登录</span>
		</div>
		<phoneRet></phoneRet>
	</div>
</template>

<script>
	
	import phoneRet from './phoneRetrieved'
	// import EmailRet from './EmailRetrieve'
	
	export default {
		name: 'forget',
		components:{
			phoneRet,
			// EmailRet
		},
		data() {
			return {
				type:'1',
				menu:[
					{
						name:'手机找回',
						type:'1'
					},
					{
						name:'邮箱找回',
						type:'2'
					}
				]
			}
		},

		computed: {},
		watch: {},
		methods: {
			typeChange() {
				this.$emit('loginType', 'wechat')
			},
			back() {
				this.$emit('loginType', 'account')
			},
			menuChange(val){
				this.type = val
			}
		},
		mounted() {

		},
		created() {

		},
		destroyed() {
			
		}
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
