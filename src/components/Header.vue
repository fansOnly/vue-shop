<template>
	<div>
		<div class="topArea">
			<!-- <div class="location"><span class="iconfont icon-location"></span>合肥市</div> -->
			<a href="" class="search">
				<span class="iconfont icon-search"></span>
				搜索商品
			</a>
			<div class="category" bindtap="goCategory">
				<span class="iconfont icon-category"></span>
			</div>
		</div>
		<Banner :bannerList="bannerList" />
	</div>
</template>

<script>
	import Banner from './Banner.vue';
	export default {
		name: 'Header',
		components: {
			Banner
		},
		data() {
			return {
				bannerList: []
			}
		},
		created() {},
		mounted() {
			this.GetBannerList();
		},
		methods: {
			GetBannerList: function () {
				this.$api.get('index/getBannerList', {})
					.then(res => {
						console.log("Setting", res);
						this.bannerList = res.bannerList;
					})
			}
		}
	}
</script>
<style>
	@import '../assets/css/base.css';
</style>