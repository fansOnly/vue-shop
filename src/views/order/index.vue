<template>
	<div style="background:#f7f7f7;">
		<TabSlide :tabItems="tabItems" :tabIndex="tabIndex" @TabSlide="TabSlide"></TabSlide>

		<!-- 全部订单 -->
		<div v-if="tabIndex == 0 && allorderList.length">
			<orderComponent :orderList="allorderList" @delOrder="delOrder" @cancelOrder2="cancelOrder2" @okReceive="okReceive"  @okReceive2="okReceive2" @tuihuo="tuihuo"></orderComponent>
			<NoMore :nomore="nomore" :loading="loading" @loadmore="loadmore"></NoMore>
		</div>
		<!-- 未支付订单 -->
		<div v-else-if="tabIndex == 1 && unpayList.length">
			<orderComponent :orderList="unpayList" @cancelOrder2="cancelOrder2"></orderComponent>
			<NoMore :nomore="nomore" :loading="loading" @loadmore="loadmore"></NoMore>
		</div>
		<!-- 待收货订单 -->
		<div v-else-if="tabIndex == 2 && unreceiveList.length">
			<orderComponent :orderList="unreceiveList" @okReceive="okReceive"  @okReceive2="okReceive2"></orderComponent>
			<NoMore :nomore="nomore" :loading="loading" @loadmore="loadmore"></NoMore>
		</div>
		<!-- 待评价订单 -->
		<div v-else-if="tabIndex == 3 && unevaluateList.length">
			<orderComponent :orderList="unevaluateList"></orderComponent>
			<NoMore :nomore="nomore" :loading="loading" @loadmore="loadmore"></NoMore>
		</div>
		<!-- 退换货订单 -->
		<div v-else-if="tabIndex == 4 && returnList.length">
			<orderComponent :orderList="returnList"></orderComponent>
			<NoMore :nomore="nomore" :loading="loading" @loadmore="loadmore"></NoMore>
		</div>
		<NoData v-else title="订单列表"></NoData>
	</div>
</template>

<script>
	const tabItems = ['全部订单', '待支付', '待收货', '待评价', '退换货'];
	const tabItemEns = ['all', 'unpay', 'unreceive', 'unevaluate', 'return'];
	let tabIndex = 0;
	import countDown from '@/utils/wxCountDown.js'
	import NoData from '@/components/NoData'
	import NoMore from '@/components/NoMore'
	import TabSlide from '@/components/TabSlide'
	import orderComponent from './components/List'
	export default {
		name: 'Order',
		components: {
			NoData,
			NoMore,
			orderComponent,
			TabSlide
		},
		data() {
			return {
				tabItems,
				tabItemEns,
				tabIndex,
				allorderList: [],
				unpayList: [],
				unreceiveList: [],
				unevaluateList: [],
				returnList: [],
				state: 0,
				page: 1,
				pageSize: 6,
				total: null,
				nomore: !1,
				tabIndex: 0,
				loading: false
			}
		},
		watch: {
			'$route'(to, from) {
				this.tabIndex = this.tabItemEns.indexOf(to.params.type);
				this.page = 1;
				this.GetOrderList();
			}
		},
		mounted() {
			this.GetOrderList();
		},
		methods: {
			GetOrderList: function (user_id) {
				this.$api.get('Order/index', {
						user_id,
						page: this.page,
						pageSize: this.pageSize,
						state: this.tabIndex == 4 ? 11 : this.tabIndex
					})
					.then(res => {
						console.log("GetOrderList", res);
						this.loading = false;
						if (res.orderList.length > 0) {
							let orderList = this.page == 1 ? [] : this.tabIndex == 1 ? this.unpayList : this.tabIndex == 2 ? this.unreceiveList :
								this.tabIndex == 3 ? this.unevaluateList : this.tabIndex == 4 ? this.returnList : this.allorderList;
							const orderListx = res.orderList;
							orderList = orderList.concat(orderListx);
							orderList.forEach(ele => {
								ele.create_time = Tools.formatTime(ele.create_time, '-', ':');
								ele.pay_time = ele.pay_time ? Tools.formatTime(ele.pay_time, '-', ':') : 0;
								ele.total_fee = Tools.Decimal(Number(ele.total_fee));
								if (ele.state == 1) {
									ele.countDownNum = Math.floor((24 * 60 * 60 * 1000 - (new Date().getTime() - ele.update_time * 1000)) /
										1000);
									// console.log(ele.countDownNum);
								}
							})
							// countDown(this, orderList, 1, this.cb2);
							if (this.tabIndex == 1) {
								this.unpayList = orderList;
							} else if (this.tabIndex == 2) {
								this.unreceiveList = orderList;
							} else if (this.tabIndex == 3) {
								this.unevaluateList = orderList;
							} else if (this.tabIndex == 4) {
								this.returnList = orderList;
							} else {
								this.allorderList = orderList;
							}
							this.page = orderListx.length ? this.page : this.page - 1;
							this.nomore = res.count <= this.pageSize * this.page ? !0 : !1;
							this.total = res.count;
						} else {
							this.allorderList = [];
							this.unpayList = [];
							this.unreceiveList = [];
							this.unevaluateList = [];
							this.returnList = [];
							this.nomore = true;
						}
					})
			},
			cb2: function (index) {
				const orderList = this.allorderList;
				console.log("订单" + orderList[index].id + "：倒计时结束啦");
				// this.$set(this.orderList,index,attrId);
				// this.cancelOrder(index);
			},
			TabSlide(index) {
				this.$router.push({
					name: 'Order',
					params: {
						type: tabItemEns[index]
					}
				});
			},
			cancelOrder2(index) {},
			delOrder(index) {
				console.log(index);
			},
			okReceive(index) {},
			okReceive2(index) {},
			tuihuo(index) {},
			loadmore() {
				const total = this.total;
				const page = this.page;
				const pageSize = this.pageSize;
				if (total > page * pageSize) {
					this.loading = true;
					this.page++;
					this.GetOrderList();
				} else {
					console.log("nodata");
				}
			},
		}
	}
</script>
<style scoped>

</style>