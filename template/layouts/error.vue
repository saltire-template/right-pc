<template>
  <div class="container">
    <div class="container-img" v-if="error.statusCode === 404">
		<div class="img">
			<img src="http://resource.rightknights.com/rk/images/404.gif" alt="">
			<div class="btn">
				<nuxt-link to="/">返 回 首 页</nuxt-link>
			</div>
		</div>
	</div>
    <h1 v-else>应用发生错误异常</h1>
    
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'default' // 你可以为错误页面指定自定义的布局
}
</script>
<style lang="less" scoped>
	.container{
		width: 100%;
		min-width: 1300px;
		background: rgb(246, 246, 246);
		.container-img{
			width: 100%;
			height: auto;
			min-width: 1300px;
			text-align: center;
			display:inline-block;
			.img{
				display: inline-block;
				width: auto;
				height: auto;
				position: relative;
				img{
					display: inline-block;
				}
			}
			.btn{
				width: 160px;
				height: 36px;
				position: absolute;
				background: #3399ff;
				left: 50%;
				bottom: 80px;
				border-radius: 6px;
				margin-left: -87px;
				a{
					color: #fff;
					font-size: 18px;
					width: 110px;
					height: 36px;
					line-height: 36px;
				}
			}
		}
	}
</style>