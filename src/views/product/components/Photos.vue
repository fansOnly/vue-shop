<template>
	<div class="banner">
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div v-for="(item, index) in something.photos" :key="index" class="swiper-slide"><img :src="item.url" alt=""></div>
			</div>
			<div class="swiper-pagination"></div>
		</div>
		<!-- <div class="swiperPages">{{bannerIndex}}/{{something.photos.length}}</div> -->
		<div class="swiperPages"></div>
		<router-link v-if="something.video" to="" class="swiperVideo flex-box"><span class="iconfont icon-video"></span>视频</router-link>
	</div>
</template>

<script>
	import Swiper from 'swiper';
	export default {
		name: 'Photos',
		props: {
			something: Object
		},
		mounted() {
			new Swiper('.swiper-container', {
				observer: true, //修改swiper自己或子元素时，自动初始化swiper
				observeParents: true, //修改swiper的父元素时，自动初始化swiper
				autoplay: true,
				loop: true,
				pagination: {
					el: '.swiperPages',
					type: 'custom',
					renderCustom: function (swiper, current, total) {
						return current + ' / ' + total;
					}
				},
			})
		}
	}
	import 'swiper/dist/css/swiper.css';
</script>
<style scoped>
	.swiper-button-next,
	.swiper-button-prev {
		display: none;
	}

	.banner {
		position: relative;
	}

	.swiper-dots {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 15px;
		justify-content: center;
	}

	.swiper-dot {
		width: 5%;
		height: 5px;
		margin: 0 2px;
		border-radius: 3px;
		background: #fff;
		opacity: 1;
	}

	.swiper-dot.on {
		background: #fda522;
	}

	.swiperPages {
		position: absolute;
		left: auto;
		bottom: 15px;
		right: 15px;
		width: 50px;
		height: 25px;
		background: rgba(0, 0, 0, .5);
		border-radius: 2em;
		color: #fff;
		font-size: 14px;
		color: #fff;
		z-index: 9;
		text-align: center;
		line-height: 25px;
	}

	.swiperVideo {
		position: absolute;
		bottom: 15px;
		right: auto;
		left: 15px;
		width: 70px;
		height: 25px;
		background: rgba(0, 0, 0, .5);
		border-radius: 2em;
		color: #fff;
		font-size: 14px;
		color: #fff;
		z-index: 9;
		text-align: center;
		line-height: 25px;
		align-items: center;
		justify-content: center;
	}

	.icon-video:before {
		font-size: 24px;
		margin-right: 2px;
	}
</style>