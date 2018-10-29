<template>
	<div>
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div v-for="(item, index) in bannerList" :key="index" class="swiper-slide">
					<img :src="item.image" alt="">
				</div>
			</div>
			<div class="swiper-pagination"></div>
			<div class="swiper-button-prev"></div>
			<div class="swiper-button-next"></div>
		</div>
	</div>
</template>

<script>
	import Swiper from 'swiper';
	export default {
		name: 'Banner',
		props: {
			bannerList: Array
		},
		mounted() {
			new Swiper('.swiper-container', {
				observer: true, //修改swiper自己或子元素时，自动初始化swiper
				observeParents: true, //修改swiper的父元素时，自动初始化swiper
				autoplay: true,
				loop: true,
				ppagination: {
					el: '.swiper-pagination'
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				},
			})
		}
	}
	import 'swiper/dist/css/swiper.css';
</script>
<style scoped>
	.swiper-button-next,
	.swiper-button-prev {
		outline: none;
	}
</style>