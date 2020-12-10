<template>
	<div>
		<div class="f-item f-mt">
			<input type="text" placeholder="请输入邮箱" v-model="email" @blur="onBlurIpt">
		</div>
		<div>
			<!-- <vcode v-on:isOk='isSuccess' :isInput="ipt"></vcode> -->
		</div>
		<div class="f-item">
			<input type="text" placeholder="请输入验证码" class="f-ipt-code" v-model="code" maxlength="4">
			<div class="f-spn-code">
				<span :class="{'ccc':timeing==true}" v-html="codeText" @click="getCode"></span>
			</div>
		</div>
		<div class="f-btn" @click="submit">下一步</div>
	</div>
</template>

<script>
	// import vcode  from './verification'
	// import tool from '../../utils/common'
	
	export default {
		name: 'emailRet',
		components:{
			// vcode
		},
		data() {
			return {
				type:'1',
				codeText:'邮箱验证码',
				timer:null,
				timeing:false,
				success:false,
				email:'',
				code:'',
				flag:true,
				flag2:true,
				ipt:{
					type:"",
					value:"",
				}
			}
		},
		computed: {},
		watch: {},
		methods: {
			onBlurIpt(){
				this.ipt ={
					type:'Email',
					value:this.email
				};
				
			},
			isSuccess(val) {
				this.success = val;
			},
			// 获取验证码
			getCode(){
				var _this = this;
				if(this.flag2){
					this.flag2 = false;
					if (_this.email == '') {
						_this.$Message.warning('邮箱不能为空');
						_this.flag2 = true;
						return false;
					} else {
						if (!this.$utils.checkMail(_this.email)) {
							_this.$Message.warning('请填写正确的邮箱地址');
							_this.flag2 = true;
							return false;
						}
					}
					if (!this.success) {
						_this.$Message.warning('请进行安全验证');
						return false;
					}
					if(_this.timer == null){
						let obj = {
							email:_this.email
						}
						_this.https.post('/login/account/resetPasswordEmailVercode',obj).then((res)=>{
							if(res.code == '0000'){
								_this.$Message.success('请登录邮箱查看验证码')
								var count = 60;
								_this.timer = setInterval(function(){
									if(count<=0){
										clearInterval(_this.timer)
										_this.timeing = false;
										_this.codeText = '邮箱验证码'
										_this.flag2 = true;
										_this.timer = null
									}else{
										count--;
										_this.timeing = true;
										_this.codeText = '重新获取('+count+'s)';
										_this.flag2 = false;
									}
								},1000)
							}else{
								_this.$Message.warning(res.msg);
								_this.flag2 = true;
								return false;
							}
						})
					}
				}
			},
			// 提交
			submit(){
				if(this.flag){
					this.flag = false;
					if (this.email == '') {
						this.$Message.warning('邮箱不能为空');
						this.flag = true;
						return false;
					} else {
						if (!this.$utils.checkMail(this.email)) {
							this.$Message.warning('请填写正确的邮箱地址');
							this.flag = true;
							return false;
						}
					}
					if (!this.success) {
						_this.$Message.warning('请进行安全验证');
						return false;
					}
					if(this.code == ''){
						this.$Message.warning('邮箱验证码不能为空');
						this.flag = true;
						return false;
					}else if(this.code.length!=4){
						this.$Message.warning('请填写正确邮箱验证码');
						this.flag = true;
						return false;
					}
					let obj = {
						email:this.email,
						verCode:this.code
					}
					this.https.post('/login/account/resetPasswordByEmailNext',obj).then((res)=>{
						if(res.code == '0000'){
							this.$store.commit('SET_DATACODE',res.data);
							this.$emit('isSuccess',true)
						}else{
							this.$Message.error(res.msg)
							this.flag = true;
						}
					})
				}
			}
		},
		mounted() {
			this.ipt = {
				type:'Email',
				value:''
			}
		},
		created() {
			this.$store.commit('SET_DATACODE','');
		},
		destroyed() {
			this.success = false;
			// 清空计时器
			clearInterval(this.timer)
			this.timer = null;
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
	
	.f-item {
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
		
		.f-ipt-code{
			width: 50%;
			float: left;
		}
		
		.f-spn-code{
			display: inline-block;
			width: 50%;
			text-align: right;
			line-height: 27px;
			font-size: 14px;
			height: 100%;
			float: right;
			border-bottom: 1px solid #E3E3E3;
			padding: 6px;
			
			span{
				display: inline-block;
				width: auto;
				height: auto;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #666666;
				cursor: pointer;
			}
		}
		
		.f-verification {
			width: 100%;
			height: 100%;
			padding: 0 2px 7px 2px;
			border-bottom: 1px solid #E3E3E3;
			border-radius: 3px;
	
			.f-verification-bg {
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
				span{
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
	
	.f-mt {
		margin-top: 10px;
	}
	
	.f-btn {
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
		margin-top: 22px;
		margin-bottom: 28px;
		cursor: pointer;
	}
</style>
