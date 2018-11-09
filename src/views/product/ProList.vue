<template>
	<div>
		<div class="top flex-box">
			<Search class="searchArea"></Search>
			<div class="type" @click="showChange">
				<span v-if="dismode" class="iconfont icon-photoItem"></span>
				<span v-else class="iconfont icon-picList"></span>
			</div>
		</div>
		<div class="sort_box flex-box">
			<div :class="['sort_t', {on: sortId == 1}]" data-sort="1" @click="sortChange">综合</div>
			<div :class="['sort_t', {on: sortId == 2}]" data-sort="2" @click="sortChange">销量<span :class="['iconfont icon-up', {on:up1 ==1}]"></span><span :class="['iconfont icon-down', {on:up1 ==2}]"></span></div>
			<div :class="['sort_t', {on: sortId == 3}]" data-sort="3" @click="sortChange">价格<span :class="['iconfont icon-up', {on:up2 ==1}]"></span><span :class="['iconfont icon-down', {on:up2 ==2}]"></span></div>
			<div class="sort_t" @click="">筛选</div>
		</div>

		<div v-if="productList.length">
			<List1 v-if="dismode" :products="productList"></List1>
			<List2 v-else :products="productList"></List2>

			<div v-if="nomore" class="nomore">我是有底线的</div>
			<div v-else class="loadmore" @click="loadmore">
				<span v-if="loading"><img class="loading" src="@/assets/loading.gif" alt="loading..."></span>
				<span v-else>加载更多</span>
			</div>
		</div>
		<NoData v-else title="商城列表"></NoData>
	</div>
</template>

<script>
	import Search from '@/components/Search'
	import List1 from '@/views/product/List1'
	import List2 from '@/views/product/List2'
	import NoData from '@/components/NoData'
	export default {
		name: 'ProList',
		components: {
			Search,
			List1,
			List2,
			NoData
		},
		data() {
			return {
				sortId: 1,
				up1: 0, // 销量默认升序 1-升序 2-降序
				up2: 0, // 价格默认升序 1-升序 2-降序
				dismode: true, // true -> 图片列表   false -> 图文列表
				categoryId: 0,
				productList: [],
				page: 1,
				total: 0,
				pageSize: 2,
				nomore: false,
				loading: false
			}
		},
		mounted() {
			this.categoryId = this.$route.params.categoryId;
			this.dismode = localStorage.getItem("dismode") ? localStorage.getItem("dismode") : true;
			this.GetGoodsList(this.page);
		},
		methods: {
			GetGoodsList: function (page) {
				this.$api.get('Goods/GetGoodsList', {
						categoryId: this.categoryId,
						page: page,
						pageSize: this.pageSize,
					})
					.then(res => {
						console.log("GetGoodsList", res);
						this.loading = false;
						if (res.productList.length > 0) {
							let productList = this.productList || [];
							const productListx = res.productList;
							productList = productList.concat(productListx);
							this.productList = this.sortProduct(productList);
							this.page = productListx.length ? page : page - 1;
							this.nomore = res.count <= this.pageSize * page ? true : false;
							this.total = res.count;
						} else {
							this.nomore = true;
						}
					})
			},
			sortChange: function (e) {
				this.sortId = e.target.dataset.sort;
				this.up1 = this.sortId == 2 ? this.up1 == 0 ? 1 : this.up1 == 1 ? 2 : 1 : 0;
				this.up2 = this.sortId == 3 ? this.up2 == 0 ? 1 : this.up2 == 1 ? 2 : 1 : 0;
				this.productList = this.sortProduct(this.productList);
			},
			sortProduct(products){
				if(this.sortId == 3){
					if(this.up2 == 2){
						products.sort((a, b) => this.getPrice(b) - this.getPrice(a));
					}else {
						products.sort((a, b) => this.getPrice(a) - this.getPrice(b));
					}
				}else if (this.sortId == 2) {
					if(this.up1 == 2){
						products.sort((a, b) => a.sales - b.sales);
					}else {
						products.sort((a, b) => b.sales - a.sales);
					}
				} else {
					// 时间为主，浏览为辅
					products.sort((a, b) => b.views - a.views).sort((a, b) => b.create_time - a.create_time);
				}
				return products;
			},
			getPrice(obj){
				return Number(obj.mprice) > 0 ? Number(obj.mprice) : Number(obj.price)
			},
			showChange: function () {
				this.dismode = !this.dismode;
				localStorage.setItem("dismode", this.dismode);
			},
			loadmore() {
				const total = this.total;
				const page = this.page;
				const pageSize = this.pageSize;
				// const keyword = this.keyword;
				if (total > page * pageSize) {
					// if(keyword){
					// 	this.searchx(this.categoryId, page + 1, this.sortId, this.up);
					// }else{
					this.loading = true;
					this.GetGoodsList(page + 1);
					// }
				} else {
					console.log("nodata")
				}
			},
		}
	}
</script>
<style scoped>
	.top {
		align-items: center;
		background: #eee;
	}

	.searchArea {
		width: 87%;
	}

	.type {
		text-align: center;
	}

	.icon-picList:before,
	.icon-photoItem:before {
		color: #999;
		font-size: 30px;
	}

	.sort_box {
		height: 40px;
		background: #fff;
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
		line-height: 40px;
	}

	.sort_t {
		position: relative;
		width: 25%;
		text-align: center;
		font-size: 14px;
	}

	.sort_t.on {
		color: #ff495f;
	}

	.icon-up,
	.icon-down {
		position: absolute;
		top: 50%;
		left: 50%;
		font-size: 10px;
		color: #999;
		line-height: 1;
	}

	.icon-up {
		transform: translate(18px, -88%);
	}

	.icon-down {
		transform: translate(18px, -12%);
	}

	.icon-up.on,
	.icon-down.on {
		color: #ff495f;
	}
</style>