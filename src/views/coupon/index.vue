<template>
	<div>
		<div v-if="couponList.length" class="coupon">
			<div v-for="(item, index) in couponList" :key="" :class="['coupon-li', item.status == -1 ? 'expire' : item.status == 2 ? 'used' : '']">
				<div class="coupon-item flex-box">
					<div :class="['coupon-price', item.status == -1 ? 'expire' : item.status == 2 ? 'used' : '']">
						<div class="coupon-t1">￥<span class="sp1">{{item.jian}}</span></div>
						<div class="coupon-t2">满{{item.man}}元可用</div>
					</div>
					<div class="coupon-desc">
						<div class="coupon-p1">{{item.title}}</div>
						<div class="coupon-p2">{{item.isAll ? '全品类通用券' : '部分商品可用'}}</div>
						<div v-if="item.endless == 0" class="coupon-p3">{{item.use_start}}-{{item.use_end}}</div>
						<div v-else class="coupon-p3">无限期</div>
					</div>
					<div class="coupon-select" @click="getTicket(item.id, index)">领取</div>
				</div>
			</div>

			<div v-if="nomore" class="nomore">我是有底线的</div>
			<div v-else class="loadmore" @click="loadmore">
				<span v-if="loading"><img class="loading" src="@/assets/loading.gif" alt="loading..."></span>
				<span v-else>加载更多</span>
			</div>
		</div>
		<NoData v-else title="优惠券列表"></NoData>
	</div>
</template>

<script>
	import NoData from '@/components/NoData'
	export default {
		name: 'coupon',
		components: {
			NoData
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
			this.user_id = 1;
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
			getTicket(id, index) {
				const couponList = this.couponList;
				couponList.splice(index, 1);
				if (this.user_id) {
					this.$api.post('coupon/GetCoupon', {couponId:id,user_id: this.user_id })
					.then(res => {
						this.couponList = couponList;
					})
				} else {
					console.log("please login");
				}
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
.coupon-li { position: relative; margin-bottom: 10px; background: #fff; border-top: 4px solid #4ad8da; border-radius: 3px; box-shadow: 0 1px 10px rgba(0,0,0,.1); overflow: hidden; font-size: 12px; }
.coupon-li.expire { border-color: #ccc; }
.coupon-li.used { border-color: green; }
.coupon-li:after { content: ""; position: absolute; left: 34%; top: 0; bottom: 0; width: 0; border-left: 1px dashed #e5e5e5; }

.coupon-item { height: 90px; justify-content: space-between; align-items: center; }
.coupon-price { width: 35%; text-align: center; color: #4ad8da; }
.coupon-price.expire { color: #ccc; }
.coupon-price.used { color: green; }
.sp1 { display: inline-block; font-size: 30px; line-height: 1; font-family: 'impact'; vertical-align: top; }
.coupon-t2 { margin-top: 5px; }
.coupon-desc { width: 50%; padding-left: 5%; }
.coupon-select { width: 15%; text-align: center; }
.coupon-p1 { font-size: 12px; }
.coupon-p2 { font-size: 12px; color: #bbb; }
.coupon-p3 { font-size: 12px; color: #ccc; }
</style>