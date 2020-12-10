<template>
	<div>
		<!-- 侧边栏代码 开始 -->
		<div class="sidebar">
			<!-- 建议反馈 -->
			<!-- <div class="sidebar-feedback" id="sidebar-feedback">
				<a href="javascript:void(0);" id="feedback-btn"></a>
			</div>
			<div id="moquu_weixin" class="moquu_weixin">
				<a href="javascript:void(0)">
					<span class="moquu_weixinh"></span>
				</a>
			</div>
			<div id="moquu_chart" class="moquu_chart">
				微信<br />公众号
				<span class="moquu_charthh"></span>
			</div>
			<a id="moquu_top" href="javascript:void(0)"></a> -->
			<div class="jing-ban-quan">
				<a href="https://whaleip.com/pages/#/" target="_blank" el="nofollow">
					<span></span>
					企业入口
				</a>
			</div>
			<div class="service"  @click="OpenWindow('https://cschat-ccs.aliyun.com/index.htm?tntInstId=_0t8K1Ye&scene=SCE00002310#/','960','648','在线客服','')">
				<span></span>
				在线客服
			</div>
			<div class="code" @mouseenter="show = 1" @mouseleave="show = 0">
				<div class="show-code" v-if="show == 1">
					<span></span>
					维权骑士二维码
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'sidebar',
		data(){
			return {
				show:0
			}
		},
		methods:{
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
			// var popWin = {
			// 	scrolling: "auto",
			// 	"int": function() {
			// 		this.mouseClose(),
			// 		this.closeMask()
			// 	},
			// 	showWin: function(a, b, c, d) {
			// 		var e = b - 52,
			// 		f = a / 2,
			// 		g = b / 2,
			// 		h = "";
			// 		// h += '<div id="mask" style="width:100%; height:100%; position:fixed; top:0; left:0; z-inde:1999;background:#cccccc; filter:alpha(opacity=10); -moz-opacity:0.1; -khtml-opacity: 0.1; opacity:0.1;"></div>',
			// 		// h += '<div id="maskTop" style="width: ' + a + "px; height: " + b + "px; border: #d1d1d1 5px solid; background: #ffffff; color: #333; position: fixed; top: 50%; left: 50%; margin-left: -" + f + "px; margin-top: -" + g + 'px; z-index: 2999; border-radius:5px; ">',
			// 		// h += '<div id="maskTitle" style="height:35px; line-height: 35px; font-family:����; font-size: 14px; font-weight:bold; color: #797979; padding-left: 10px; background: url(./images/hbbg.png); border-bottom: 1px solid #d1d1d1; position: relative;">',
			// 		// h += "" + c,
			// 		// h += '<div id="popWinClose" style="width: 15px; height:15px; cursor: pointer; position: absolute; top:10px; right: 9px; background: url(./images/closehdtipper.png)"></div>',
			// 		// h += "</div>",
			// 		// h += '<iframe width="' + a + '" height="' + e + '" frameborder="0" scrolling="' + this.scrolling + '" src="' + d + '"></iframe>',
			// 		// $("body").append(h),
			// 		// this.int()
			// 	},
			// 	mouseClose: function() {
			// 		$("#popWinClose").on("mouseenter",
			// 		function() {
			// 			$(this).css("background-image", "url(./images/closehdtipper.png)")
			// 		}),
			// 		$("#popWinClose").on("mouseleave",
			// 		function() {
			// 			$(this).css("background-image", "url(./images/closehdtipper.png)")
			// 		})
			// 	},
			// 	closeMask: function() {
			// 		$("#popWinClose").on("click",
			// 		function() {
			// 			$("#mask,#maskTop").fadeOut(function() {
			// 				$(this).remove()
			// 			})
			// 		})
			// 	}
			// };
			// function b() {
			// 	var h = $(window).height();
			// 	var t = $(document).scrollTop();
			// 	t > h ? $("#moquu_top").show() : $("#moquu_top").hide()
			// }
			// $(document).ready(function() {
			// 	b(),
			// 	$("#moquu_top").click(function() {
			// 		$(document).scrollTop(0)
			// 	})
			// }),
			// $(window).scroll(function() {
			// 	b()
			// });
		}
	}
</script>

<style lang="less" scoped>
	.sidebar{
		width: 56px;
		height: auto;
		position: fixed;
		z-index: 1000;
		right: 0;
		bottom: 20%;
		.jing-ban-quan{
			width: 56px;
			height: 96px;
			background: #6081FF;
			border-radius:6px 0px 0px 6px;
			line-height:18px;
			text-align: center;
			background-image: url(./images/j.png);
			background-repeat: no-repeat;
			background-size: 34px 34px;
			background-position: 13px 13px;
			a{
				padding: 13px;
				padding-right: 9px;
				display: inline-block;
				height: 96px;
				width: 56px;
				font-size:14px;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(255,255,255,1);
				span{
					display: inline-block;
					width: 34px;
					height: 34px;
				
				}
			}
		}
		.service{
			width: 56px;
			height: 114px;
			background: #3399FF;
			margin-top: 8px;
			border-radius:6px 0px 0px 6px;
			padding: 13px;
			padding-right: 9px;
			background-image: url(./images/kefu.png);
			background-repeat: no-repeat;
			background-size: 34px 34px;
			background-position: 13px 18px;
			cursor: pointer;
			font-size:14px;
			font-family:Source Han Sans CN;
			font-weight:400;
			text-align: center;
			color:rgba(255,255,255,1);
			line-height:18px;
			span{
				display: inline-block;
				width: 34px;
				height: 34px;
				font-size:14px;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(255,255,255,1);
				margin-top: 8px;
			}
		}
		.code{
			width: 56px;
			height: 56px;
			padding: 4px 4px 7px 7px;
			border-radius:6px 0px 0px 6px;
			background:rgba(26,173,25,1);
			background-image: url(./images/weixin.png);
			background-repeat: no-repeat;
			background-size: 45px 45px;
			margin-top: 8px;
			background-position: 7px 4px;
			cursor: pointer;
			position: relative;
			.show-code{
				width: 162px;
				height: 172px;
				border-radius:6px 0px 0px 6px;
				border: 2px solid #1AAD19;
				padding: 7px 14px;
				padding-bottom: 0;
				text-align: center;
				line-height: 14px;
				position: absolute;
				right: 0;
				top: 0;
				z-index: 1;
				background: #fff;
				font-size:14px;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(51,51,51,1);
				span{
					display: inline-block;
					width: 134px;
					height: 136px;
					background-image: url('./images/code.png');
					background-size: 134px 136px;
					
				}
				// 
			}
		}
	}
	/* 移动端适配 */
	@media screen and (max-width: 700px) {
	     .sidebar {
	        display: none !important;
	    }
	}
	
</style>
