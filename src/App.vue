<template>
	<div id="app">
		<Home></Home>
		<router-view></router-view>
	</div>
</template>

<script>
import Home from "./views/Home.vue";

export default {
	name: "app",
	components: {
		Home
	}
}
</script>

<style>
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #333;
	background-color: #f7f7f7;
    font-size: 14px;
    line-height: 1.5;
}
@import './assets/css/reset.css';
</style>
