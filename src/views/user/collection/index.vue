<template>
	<div>
		<TabSlide :tabItems="tabItems" :tabIndex="tabIndex" @TabSlide="TabSlide"></TabSlide>

		<!-- 商品收藏 -->
		<div v-if="tabIndex == 0 && productCollectionList.length" class="coupon">
			<CollectionComponents :collectionList="productCollectionList"></CollectionComponents>
			<NoMore :nomore="nomore" :loading="loading" @loadmore="loadmore"></NoMore>
		</div>
		<!-- 积分收藏 -->
		<div v-else-if="tabIndex == 1 && scoreCollectionList.length" class="coupon">
			<CollectionComponents :collectionList="scoreCollectionList"></CollectionComponents>
			<NoMore :nomore="nomore" :loading="loading" @loadmore="loadmore"></NoMore>
		</div>
		<NoData v-else title="收藏列表"></NoData>
	</div>
</template>

<script>
	const tabItems = ['商品收藏', '积分收藏'];
	const tabItemEns = ['product', 'score'];
	let tabIndex = 0;
	import NoData from '@/components/NoData'
	import NoMore from '@/components/NoMore'
	import TabSlide from '@/components/TabSlide'
	import CollectionComponents from './components/Collection'
	export default {
		name: 'UserCollection',
		components: {
			NoData,
			NoMore,
			TabSlide,
			CollectionComponents
		},
		data() {
			return {
				tabItems,
				tabItemEns,
				tabIndex,
				productCollectionList: [],
				scoreCollectionList: [],
				page: 1,
				pageSize: 6,
				nomore: false,
				total: 0,
				loading: false
			}
		},
		watch: {
			'$route'(to, from) {
				this.tabIndex = this.tabItemEns.indexOf(to.params.type);
				this.page = 1;
				this.GetFavList();
			}
		},
		mounted() {
			this.GetFavList();
		},
		methods: {
			GetFavList: function (user_id) {
				this.$api.get('user/GetFavList', {
						page: this.page,
						pageSize: this.pageSize,
						type: this.tabIndex + 1,
						user_id
					})
					.then(res => {
						console.log("GetFavList", res);
						this.loading = false;
						if (res.favList.length > 0) {
							let favList = this.page == 1 ? [] : this.tabIndex == 0 ? this.productCollectionList : this.tabIndex == 1 ? this.scoreCollectionList : [];
							const favListx = res.favList;
							favListx.length && favListx.filter(item=>item.type = this.tabIndex + 1);
							favListx.length && favListx.map(item=>item.fav_time = Tools.formatTime(item.fav_time, '-',":"));
							favList = favList.concat(favListx);
							if (this.tabIndex == 0) {
								this.productCollectionList = favList;
							} else {
								this.scoreCollectionList = favList;
							}
							this.page = favListx.length ? this.page : this.page - 1;
							this.nomore = res.count <= this.pageSize * this.page ? !0 : !1;
							this.total = res.count;
						} else {
							this.productCollectionList = [];
							this.scoreCollectionList = [];
							this.nomore = true;
						}
					})
			},
			TabSlide(index) {
				this.tabIndex = index;
				this.$router.push({
					name: 'UserCollection',
					params: {
						type: tabItemEns[index]
					}
				});
			},
			loadmore() {
				const total = this.total;
				const page = this.page;
				const pageSize = this.pageSize;
				if (total > page * pageSize) {
					this.loading = true;
					this.page++;
					this.GetFavList();
				} else {
					console.log("nodata");
				}
			},
		}
	}
</script>
<style scoped>
</style>