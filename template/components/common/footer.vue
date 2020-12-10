<template>
	<div id="footer" class="footer">
		<div class="footer-top">
			<div class="logo"></div>
			<div class="services">
				<div class="servers-top">产品及服务</div>
				<div class="line">
					<span></span>
				</div>
				<div class="servers-list">
					<div class="item">
						<ul>
							<li><a :href="$baseUrl.$_home+'Protection/'">版权保护</a></li>
							<li><a :href="$baseUrl.$_home+'Operation/'">版权运营</a></li>
							<li><a :href="$baseUrl.$_edu">骑士学院</a></li>
						</ul>
					</div>
					<div class="item">
						<ul>
							<li><a :href="$baseUrl.$_check">图文检测</a></li>
							<li><a :href="$baseUrl.$_copy">自助维权</a></li>
							<li><a href="javascript:void(0);" @click="BangZhu">帮助中心</a></li>
							<li><a :href="$baseUrl.$_us">关于我们</a></li>
						</ul>
					</div>
				</div>
			</div>
			<div class="contact">
				<div class="contact-top">联系方式</div>
				<div class="line">
					<span></span>
				</div>
				<div class="contact-list">
					<div class="item">
						<ul>
							<li>杭州刀豆网络科技有限公司</li>
							<li>邮箱：contact@rightknights.com</li>
							<li>电话：0571-2828 4050</li>
							<li>杭州市余杭区仓前街道良睦路1288号</li>      
						</ul>
					</div>
				</div>
			</div>
			<div class="code">
				<div class="code-left" :class="{'code-image-zhihu':index == '0','code-image-weibo':index == '2' ,'code-image-weixin':index == '1'}"></div>
				<div class="code-right">
					<div class="code-item" @mouseover="codeHover(0)"></div>
					<div class="code-item" @mouseover="codeHover(1)"></div>
					<div class="code-item" @mouseover="codeHover(2)"></div>
				</div>
			</div>
		</div>
		<div class="footer-foot">
			 ©杭州刀豆网络科技有限公司2015 <a href="http://www.beian.miit.gov.cn" target="_blank">浙ICP备15037285号</a> – All Rights Reserved  <br />
			<span></span><a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33011002013172" target="_blank">浙公网安备 33011002013172号</a>              
		</div>
	</div>
</template>

<script>
	export default {
		name:'footers',
		data(){
			return {
				index:0
			}
		},
		methods:{
			codeHover(val){
				this.index = val
			},
			BanQuan(){
				var url = window.location.href
				window.location.href = this.$baseUrl.$_router+'router?callback='+url+'&&returnUrl='+this.$baseUrl.$_router+'copy_right'
			},
			BangZhu(){
				var url = window.location.href
				window.location.href = this.$baseUrl.$_router+'router?callback='+url+'&&returnUrl='+this.$baseUrl.$_router+'FAQ'
			},
			WoMen(){
				var url = window.location.href
				window.location.href = this.$baseUrl.$_router+'router?callback='+url+'&&returnUrl='+this.$baseUrl.$_router+'about_us'
			}
		}
	}
</script>

<style lang="less" scoped>
	.footer{
		width: 100%;
		height: 370px;
		min-width: 1200px;
		float: left;
		text-align: center;
		background:rgba(36,44,62,1);
		.footer-top{
			padding-top: 44px;
			height: 268px;
			border-bottom: 1px solid #666666;
			width:100%;
			.logo{
				display: inline-block;
				width: 193px;
				height: 62px;
				background-image: url('../../assets/common/footer-logo.png');
				background-position: center center;
				background-size: 193px 62px;
				background-repeat: no-repeat;
				margin-right: 93px;
				vertical-align: top;
			}
			.line{
				width: 100%;
				overflow: hidden;
				height: 4px;
				margin-bottom: 18px;
				span{
					display: inline-block;
					width: 42px;
					height: 4px;
					background: #3399FF;
					float: left;
				}
			}
			.services{
				width: auto;
				height: auto;
				display: inline-block;
				vertical-align: top;
				.servers-top{
					width: auto;
					height: 28px;
					line-height: 28px;
					text-align: left;
					margin-bottom: 8px;
					font-size:16px;
					font-family:Source Han Sans CN;
					font-weight:500;
					color:rgba(255,255,255,1);
				}
				.servers-list{
					width: 100%;
					height: auto;
					overflow: hidden;
					display: inline-block;
					.item{
						float: left;
						width: auto;
						text-align: left;
						height: auto;
						ul{
							
							li{
								width: 100%;
								height: auto;
								line-height: 30px;
								a{
									display: inline-block;
									width: auto;
									font-size:14px;
									font-family:Source Han Sans CN;
									font-weight:300;
									color:rgba(255,255,255,1);
									line-height:30px;
									opacity:0.8;
								}
							}
						}
						
					}
					.item:nth-child(1){
						margin-right:52px;
					}
				}
			}
			.contact{
				width: auto;
				height: auto;
				display: inline-block;
				vertical-align: top;
				margin-left: 106px;
				margin-right: 93px;
				.contact-top{
					width: auto;
					height: 28px;
					line-height: 28px;
					text-align: left;
					margin-bottom: 8px;
					font-size:16px;
					font-family:Source Han Sans CN;
					font-weight:500;
					color:rgba(255,255,255,1);
				}
				.contact-list{
					width: 100%;
					height: auto;
					overflow: hidden;
					display: inline-block;
					.item{
						float: left;
						width: auto;
						text-align: left;
						height: auto;
						li{
							width: 100%;
							height: auto;
							line-height: 30px;
							font-size:14px;
							font-family:Source Han Sans CN;
							font-weight:300;
							color:rgba(255,255,255,1);
							line-height:30px;
							opacity:0.8;
						}
					}
				}
			}
			.code{
				width: auto;
				height: auto;
				display: inline-block;
				padding-top: 7px;
				vertical-align: top;
				.code-left{
					width: 155px;
					height: 146px;
					float: left;
					margin-right: 17px;
				}
				.code-image-weibo{
					background-image: url('webo.png');
					background-size: 155px 146px;
				}
				.code-image-weixin{
					background-image: url('weixin.png');
					background-size: 155px 146px;
				}
				.code-image-zhihu{
					background-image: url('zhihu.png');
					background-size: 155px 146px;
				}
				.code-right{
					width: 38px;
					height: auto;
					float: left;
					.code-item{
						width: 38px;
						height: 38px;
						// background: #fff;
						margin-bottom: 11px;
						border-radius: 50%;
						background-position: center center;
						background-repeat: no-repeat;
						background-size: 38px 38px;
					}
					.code-item:nth-child(1){
						background-image: url('../../assets/common/footer-zhihu.png');
					}
					.code-item:nth-child(2){
						background-image: url('../../assets/common/footer-weixin.png');
					}
					.code-item:nth-child(3){
						background-image: url('../../assets/common/footer-weibo.png');
					}
				}
			}
		}
		.footer-foot{
			width: 100%;
			min-width: 1200px;
			height: 101px;
			font-size:12px;
			font-family:Source Han Sans CN;
			font-weight:300;
			color:rgba(255,255,255,1);
			line-height:24px;
			opacity:0.5;
			padding-top: 22px;
			a{
				color:rgba(255,255,255,1);
			}
			span{
				display: inline-block;
				width: 20px;
				height: 20px;
				background-image: url(beian_icon.png);
				background-size: 20px 20px;
				margin-right: 5px;
				vertical-align: middle;
				margin-bottom: 3px;
			}
		}
	}
</style>
