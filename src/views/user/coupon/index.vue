<template>
	<div>
		<TabSlide :tabItems="tabItems" :tabIndex="tabIndex" @TabSlide="TabSlide"></TabSlide>

		<!-- 未使用 -->
		<div v-if="tabIndex == 0 && unusedCouponList.length" class="coupon">
			<CouponComponent :couponList="unusedCouponList" ></CouponComponent>
			<NoMore :nomore="nomore" :loading="loading" @loadmore="loadmore"></NoMore>
		</div>
		<!-- 已使用 -->
		<div v-else-if="tabIndex == 1 && usedCouponList.length" class="coupon">
			<CouponComponent :couponList="usedCouponList" ></CouponComponent>
			<NoMore :nomore="nomore" :loading="loading" @loadmore="loadmore"></NoMore>
		</div>
		<!-- 已过期 -->
		<div v-else-if="tabIndex == 2 && expiredCouponList.length" class="coupon">
			<CouponComponent :couponList="expiredCouponList" ></CouponComponent>
			<NoMore :nomore="nomore" :loading="loading" @loadmore="loadmore"></NoMore>
		</div>
		<NoData v-else title="优惠券列表"></NoData>
	</div>
</template>

<script>
	const tabItems = ['未使用', '已使用', '已过期'];
	const tabItemEns = ['unused', 'used', 'expired'];
	let tabIndex = 0;
	import NoData from '@/components/NoData'
	import NoMore from '@/components/NoMore'
	import CouponComponent from '@/components/Coupon'
	import TabSlide from '@/components/TabSlide'
	export default {
		name: 'UserCoupon',
		components: {
			NoData,
			NoMore,
			CouponComponent,
			TabSlide
		},
		data() {
			return {
				tabItems,
				tabItemEns,
				tabIndex,
				state: 1,
				unusedCouponList: [],
				usedCouponList: [],
				expiredCouponList: [],
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
				this.GetCouponList();
			}
		},
		mounted() {
			this.GetCouponList();
		},
		methods: {
			GetCouponList: function (user_id) {
				this.$api.get('user/GetCouponList', {
						user_id,
						page: this.page,
						pageSize: this.pageSize,
						type: this.tabIndex + 1
					})
					.then(res => {
						console.log('GetCouponList', res);
						this.loading = false;
						if (res.couponList.length > 0) {
							let couponList = this.page == 1 ? [] : this.tabIndex == 0 ? this.unusedCouponList : this.tabIndex == 1 ? this.usedCouponList : this.tabIndex == 2 ? this.expiredCouponList : [];
							const couponListx = res.couponList;
							couponListx.length && couponListx.forEach(ele => {
								if (ele.endless == 1) {
									ele.use_start = Tools.formatTime(ele.use_start, '.');
									ele.use_end = Tools.formatTime(ele.use_end, '.');
								}
							});
							couponList = couponList.concat(couponListx);
							if (this.tabIndex == 0) {
								this.unusedCouponList = couponList;
							} else if (this.tabIndex == 1) {
								this.usedCouponList = couponList;
							} else {
								this.expiredCouponList = couponList;
							}
							this.page = couponListx.length ? this.page : this.page - 1;
							this.nomore = res.count <= this.pageSize * this.page ? !0 : !1;
							this.total = res.count;
						} else {
							this.unusedCouponList = [];
							this.usedCouponList = [];
							this.expiredCouponList = [];
							this.nomore = true;
						}
					})
			},
			TabSlide(index) {
				this.$router.push({
					name: 'UserCoupon',
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
					this.GetCouponList();
				} else {
					console.log("nodata");
				}
			},
		}
	}
</script>
<style scoped>
	.coupon {
		padding: 10px;
	}
</style>