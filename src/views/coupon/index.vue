<template>
	<div>
		<div v-if="couponList.length" class="coupon">
			<CouponComponents :couponList="couponList" :canIGet="true" @GetTicket="GetTicket"></CouponComponents>
			<NoMore :nomore="nomore" :loading="loading" @loadmore="loadmore"></NoMore>
		</div>
		<NoData v-else title="优惠券列表"></NoData>
	</div>
</template>

<script>
	import NoData from '@/components/NoData'
	import NoMore from '@/components/NoMore'
	import CouponComponents from '@/components/Coupon'
	export default {
		name: 'Coupon',
		components: {
			NoData,
			NoMore,
			CouponComponents
		},
		data() {
			return {
				couponList: [],
				page: 1,
				pageSize: 6,
				total: null,
				nomore: false,
				loading: false
			}
		},
		mounted() {
			// this.user_id = 1;
			this.GetAllCounponList(this.page);
		},
		methods: {
			GetAllCounponList(page) {
				this.$api.get('coupon/GetAllCouponList', { page: page,pageSize: this.pageSize, user_id: this.user_id})
				.then(res => {
					console.log("GetAllCounponList", res);
					this.loading = false;
					if(res.couponList .length > 0){
						let couponList = page == 1 ? [] : this.couponList;
						const couponListx = res.couponList;
						couponListx.length && couponListx.forEach(ele=>{
							if(ele.endless == 0){
								ele.use_start = App.Tools.formatTime(ele.use_start, '.');
								ele.use_end = App.Tools.formatTime(ele.use_end, '.');
							}
						})
						couponList = couponList.concat(couponListx);
						this.couponList = couponList;
						this.page = couponListx.length ? page : page - 1;
						this.nomore = res.count <= this.pageSize * page ? !0 : !1;
						this.total = res.count;
					}else{
						this.nomore = true;
					}
				})
			},
			GetTicket(index) {
				const id = this.couponList[index].id;
				// if (this.user_id) {
					this.$api.post('coupon/GetCoupon', {couponId:id,user_id: this.user_id })
					.then(res => {
						this.couponList.splice(index, 1);
					})
				// } else {
				// 	console.log("please login");
				// 	this.$router.push({
				// 		name: 'Login',
				// 		query: { redirect: this.$route.fullPath }
				// 	})
				// }
			},
			loadmore() {
				const total = this.total;
				const page = this.page;
				const pageSize = this.pageSize;
				if (total > page * pageSize) {
					this.loading = true;
					this.GetAllCounponList(page + 1);
				} else {
					console.log("nodata")
				}
			},
		}
	}
</script>

<style scoped>
.coupon { padding: 10px; }
</style>