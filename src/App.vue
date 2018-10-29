<template>
	<div id="app">
		<Header></Header>
		<Home></Home>
	</div>
</template>

<script>
import Header from "./components/Header.vue";
import Home from "./views/Home.vue";

export default {
	name: "app",
	components: {
		Header,
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
