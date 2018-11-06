<template>
	<div id="app">
		<Header></Header>
		<transition :name="transitionName" mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	import Header from "./components/Header.vue"
	export default {
		name: "app",
		components: {
			Header
		},
		data(){
			return {
				transitionName: 'slide-left'
			}
		},
		watch:{
			'$route' (to, from) {
    			const toDepth = to.path.split('/').length
				const fromDepth = from.path.split('/').length
				this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
			}
		}
	}
</script>

<style>
	#app {
		font-family: "Avenir", Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		padding-top: 48px;
		color: #333;
		background-color: #fff;
		font-size: 14px;
		line-height: 1.5;
		overflow: hidden;
	}
	.mask{ 
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(0,0,0,.4);
		z-index: 1000;
		transition: all ease .5s;
		opacity: 0;
		z-index: -1;
	}

	@import '//at.alicdn.com/t/font_667160_k1loj6k2ef.css';
	/* @import '~@/assets/iconfont/iconfont.css'; */
</style>