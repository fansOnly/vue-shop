<template>
	<div id="app">
		<Banner :bannerList="bannerList" />
		<el-button @click="visible = true">Button</el-button>
		<el-dialog :visible.sync="visible" title="Hello world">
			<p>Try Element</p>
		</el-dialog>
	</div>
</template>

<script>
import Banner from "./components/Banner.vue";

export default {
	name: "app",
	components: {
		Banner
	},
	data(){
		return {
			bannerList: [],
			visible: false
		}
	},
	mounted(){
		this.$api.get('index/getBannerList',{})
		.then(res=>{
			console.log("Setting", res);
			this.bannerList = res.bannerList;
		})
	},
	methods:{}
}
</script>

<style>
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
@import './assets/css/base.css';
</style>
