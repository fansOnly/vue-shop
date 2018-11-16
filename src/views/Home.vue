<template>
	<div class="page__bd">
		<div class="topArea">
			<!-- <div class="location"><span class="iconfont icon-location"></span>合肥市</div> -->
			<router-link to="/searchIndex" class="top-search"><span class="iconfont icon-search"></span>搜索商品</router-link>
			<router-link to="/category" class="iconfont icon-category"></router-link>
		</div>
		<BannerComponents :bannerList="bannerList" /></BannerComponents>
		<div class="tabs_special">
			<router-link :to="{name:'Coupon'}" class="tabs_item">
				<img class="img" src="../assets/images/ico_01.png" />
				<span class="tabs_title">领劵中心</span>
			</router-link>
			<router-link to="" class="tabs_item">
				<img class="img" src="../assets/images/ico_02.png" />
				<span class="tabs_title">热卖产品</span>
			</router-link>
			<router-link :to="{name:'Score'}" class="tabs_item">
				<img class="img" src="../assets/images/ico_03.png" />
				<span class="tabs_title">积分兑换</span>
			</router-link>
			<router-link to="" class="tabs_item">
				<img class="img" src="../assets/images/ico_04.png" />
				<span class="tabs_title">天天特价</span>
			</router-link>
		</div>

		<div class="discount-area flex-box" style="margin-bottom: 10px;">
			<a v-for="(item, index) in adverList" :key="index" :href="item.url" class="discount-area-item">
				<img :src="item.image">
			</a>
		</div>

		<div class="sectionC">
			<div v-for="(item, index) in cateProList" :key="index">
				<div class="pro-cate-title">
					<div :class="[pro-cate-t,imgs[index].class]"><img class="pro-cate-tt pro-cate-tt1" :src="imgs[index].tt">{{
						item.title }}</div>
					<img class="pro-cate-bg" :src="imgs[index].tbg">
				</div>
				<div class="picList">
					<div v-for="(item2, index2) in item.data" :key="index2" class="picList-li"><a href="">
							<img :src="item.thumbnail">
							<div class="picList-desc">
								<div class="picList-t">{{item.title}}</div>
								<div class="picList-p">￥<span class="picList-p1">{{item.price}}</span></div>
							</div>
						</a></div>
				</div>
			</div>
		</div>
		<Footer></Footer>
	</div>
</template>

<script>
	import BannerComponents from "../components/Banner.vue"
	import Footer from "../components/Footer.vue";
	const imgs = [{
			class: 'pro-cate-t1',
			tt: '../assets/images/tt1.png',
			tbg: '../assets/images/tbg1.png'
		},
		{
			class: 'pro-cate-t2',
			tt: '../assets/images/tt2.png',
			tbg: '../assets/images/tbg2.png'
		},
		{
			class: 'pro-cate-t3',
			tt: '../assets/images/tt3.png',
			tbg: '../assets/images/tbg3.png'
		},
		{
			class: 'pro-cate-t4',
			tt: '../assets/images/tt4.png',
			tbg: '../assets/images/tbg4.png'
		},
		{
			class: 'pro-cate-t5',
			tt: '../assets/images/tt5.png',
			tbg: '../assets/images/tbg5.png'
		},
		{
			class: 'pro-cate-t6',
			tt: '../assets/images/tt6.png',
			tbg: '../assets/images/tbg6.png'
		},
		{
			class: 'pro-cate-t7',
			tt: '../assets/images/tt7.png',
			tbg: '../assets/images/tbg7.png'
		},
		{
			class: 'pro-cate-t8',
			tt: '../assets/images/tt8.png',
			tbg: '../assets/images/tbg8.png'
		},
		{
			class: 'pro-cate-t9',
			tt: '../assets/images/tt9.png',
			tbg: '../assets/images/tbg9.png'
		}
	];
	export default {
		name: 'Home',
		components: {
			BannerComponents,
			Footer
		},
		data(){
			return {
				bannerList: [],
				adverList: [],
				popupList: [],
				qrcodeList: [],
				cateProList: []
			}
		},
		computed:{
		},
		created() {
		},
		mounted() {
			this.GetSlideList();
			this.getCateProList();
		},
		methods: {
			GetSlideList: function () {
				this.$api.get('index/GetSlideList', {})
					.then(res => {
						console.log("GetSlideList", res);
						this.bannerList = res.slideList[1];
						this.adverList = res.slideList[2];
						this.popupList = res.slideList[3];
						this.qrcodeList = res.slideList[4];
					})
			},
			getCateProList() {
				this.$api.get('index/getCateProList', {})
					.then(res => {
						console.log("getCateProList", res);
						this.cateProList = this.functionFactory(res.cateProList);
					})
			},
			functionFactory(obj) {
				let arr = [];
				for (let item in obj) {
					arr.push({
						title: item,
						data: obj[item]
					})
				}
				return arr
			},
		}
	}
</script>
<style>
	@import '~@/assets/css/home.css';
</style>