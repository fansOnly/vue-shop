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
	import 'element-ui/lib/theme-chalk/index.css';
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

	@import '//at.alicdn.com/t/font_667160_eifpxk8au6r.css';
	@import '~@/assets/css/reset.css';
	/* @import '~@/assets/iconfont/iconfont.css'; */
</style>