<template>
  <div>
    <top></top>
    <Nuxt v-if='isRouterAlive' />
    <footers></footers>
    <Login></Login>
    <sidebar></sidebar>
	<UpdateTips></UpdateTips>
  </div>
</template>

<script>
  import top from '~/components/common/top.vue'
  import footers from '~/components/common/footer.vue'
  import Login from "~/components/login/index"
  import sidebar from "~/components/common/sidebar"
  import UpdateTips from "~/components/UpdateTips"
  
  export default {
    components:{
      top,footers,Login,sidebar
    },
	provide(){
		return{
			reload: this.reload
		}
	},
	head() {
	  return {
	    script: [
		  {
	        src: '/js/jquery.min.js',
	        ssr: false,
		  },
	    ],
	  }
	},
	data(){
		return {
			isRouterAlive:true
		}
	},
	mounted() {
		this.$store.commit('SET_VIP_INTEGRAL_DISPATCH', _.randomString())
	},
	methods:{
		reload(){
			this.isRouterAlive = false;
			this.$nextTick(function(){
				this.isRouterAlive = true;
			})
		},
	}
  }

</script>

<style>
body,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	hr,
	p,
	blockquote,
	dl,
	dt,
	dd,
	ul,
	ol,
	li,
	pre,
	form,
	fieldset,
	legend,
	button,
	input,
	textarea,
	th,
	td {
		margin: 0;
		padding: 0;
	}

	body,
	button,
	input,
	select,
	textarea {
		font: 12px/1.5tahoma, arial, \5b8b\4f53;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-size: 100%;
	}

	address,
	cite,
	dfn,
	em,
	var {
		font-style: normal;
	}

	code,
	kbd,
	pre,
	samp {
		font-family: couriernew, courier, monospace;
	}

	small {
		font-size: 12px;
	}

	ul,
	ol {
		list-style: none;
	}

	a {
		text-decoration: none;
	}

	a:hover {
		text-decoration: none;
	}

	sup {
		vertical-align: text-top;
	}

	sub {
		vertical-align: text-bottom;
	}

	legend {
		color: #000;
	}

	fieldset,
	img {
		border: 0;
	}

	button,
	input,
	select,
	textarea {
		font-size: 100%;
	}

	body {
		background: #F0F3F6;
	}
	#app{
		width: 100%;
		height: auto;
	}
</style>
