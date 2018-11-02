<template>
	<div id="app">
		<Header></Header>
		<router-view></router-view>
	</div>
</template>

<script>
	import Header from "./components/Header.vue"
	export default {
		name: "app",
		components: {
			Header
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