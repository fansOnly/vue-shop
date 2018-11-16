<template>
	<div>

		<!-- <div class="order-box flex-box">
			<div :class="['order', type == 1 ? 'on' : '']" @click="tabOrder">可用优惠券<text class="f12">({{useList.length}})</text></div>
			<div :class="['order', type == 2 ? 'on' : '']" @click="tabOrder">不可用优惠券<text class="f12">({{unuseList.length}})</text></div>
		</div> -->
		<TabSlide :tabItems="tabItems" :tabIndex="tabIndex" @TabSlide="TabSlide"></TabSlide>

		<div v-if="tabIndex == 1">
			<div class="coupon-top flex-box">
				<div class="recommendCheck" @click="checkRecommend">
				</div>
				<div class="coupon-txt flex-box">
					<div>推荐优惠</div>
					<div class="coupon-tip" @click="openRules">使用规则</div>
				</div>
			</div>
			<div v-if="useList.length" class="coupon-box flex-box">
				<div class="coupon-right">
					<CouponComponents :couponList="useList"></CouponComponents>
					<!-- <div v-for="(item, index) in useList" :key="index" class="coupon-li">
						<div class="coupon-item flex-box">
							<div class="coupon-price">
								<div class="coupon-t1">￥<text class="sp1">{{item.jian}}</text></div>
								<div class="coupon-t2">满{{item.man}}元可用</div>
							</div>
							<div class="coupon-desc">
								<div class="coupon-p1">{{item.title}}</div>
								<div class="coupon-p2">{{item.isAll ? '全品类通用券' : '部分商品可用'}}</div>
								<div v-if="item.endless == 1" class="coupon-p3">{{item.use_start}} - {{item.use_end}}</div>
								<div v-else class="coupon-p3">不限期</div>
							</div>
						</div>
					</div> -->
				</div>
			</div>
			<NoData v-else :title="可用优惠券"></NoData>
		</div>
		<div v-if="tabIndex == 2">
			xxxxxxxxxxx
		</div>

		<div class="pay-bottom flex-box">
			<div class="pay-lt">已选{{checkedNum}}张，可抵扣<text class="pay-cr">￥{{coupon}}</text>元</div>
			<div class="pay-ok" @click="okCoupon">确认</div>
		</div>

		<div v-if="mask">
			<div class="mask" @click="closeRules"></div>
			<div class="rules flex-col">
				<div class="rules-t">优惠券使用规则</div>
				<div class="rules-c">
					<div v-html="coupon_tip"></div>
				</div>
				<div class="rules-btn" @click="closeRules">确定</div>
			</div>
		</div>
	</div>
</template>

<script>
	const tabItems = ['可用优惠券', '不可用优惠券'];
	const tabItemEns = ['useable', 'useless'];
	let tabIndex = 0;
	import NoData from '@/components/NoData'
	import NoMore from '@/components/NoMore'
	import CouponComponents from '@/components/Coupon'
	import TabSlide from '@/components/TabSlide'
	export default {
		name: 'OrderCoupon',
		components: {
			NoData,
			NoMore,
			CouponComponents,
			TabSlide
		},
		data() {
			return {
				tabItems,
				tabItemEns,
				tabIndex,
				carts: [],
				useList: [],
				unuseList: [],
				total: 0,
				checkedNum: 0,
				coupon: '0.00',
				recommendCheck: !1,
				mask: !1,
				coupon_tip: ''
			}
		},
		watch: {
			'$route'(to, from) {
				this.tabIndex = this.tabItemEns.indexOf(to.params.type);
				// this.page = 1;
				// this.GetOrderList();
			}
		},
		mounted() {
			this.GetUserCart();
		},
		methods: {
			okCoupon(){},
			async GetUserCart(user_id) {
				await this.$api.get('Cart/GetUserCart', {
						user_id
					})
					.then(res => {
						console.log("GetUserCart", res);
						if (res.cartList.length > 0) {
							let carts = res.cartList.filter(item => item.checked == 1);
							const total = Number(res.cartTotal);
							const fare = Number(this.fare);
							const coupon = Number(this.coupon);
							const discount = Number(this.discount / 10 * total);
							const total_fee = total + fare - coupon - discount;
							let categories = [];
							carts.forEach(ele => {
								categories.push(ele.category_id);
							})
							this.carts = carts;
							this.total = Tools.Decimal(total);
							this.total_fee = Tools.Decimal(total_fee);
							this.categories = categories;
							this.category = categories.join('');
						}
					})
					await this.GetUseCouponList(this.categories);
			},
			GetUseCouponList(user_id) {
				this.$api.get('coupon/GetUseCouponList', {
						user_id
					})
					.then(res => {
						console.log("GetUseCouponList", res);
						let couponsList = res.couponsList;
						const categories = this.categories;
						const total = Number(this.total);
						const carts = this.carts;
						let useList = couponsList.filter(item => item.man < total);
						let unuseList = couponsList.filter(item=> item.man > total );
						// console.log("categories", categories);
						useList.forEach((ele, index) => {
							if (ele.isAll == 0) {
								let use_category = ele.categories.split(',');
								if (use_category.every(item => !categories.includes(item))) {
									// 无交集-不可用
									useList.splice(index, 1);
									unuseList.push(ele);
								} else if (use_category.some(item => !categories.includes(item))) {
									// 取交集，判断是否满足条件，不满足满减条件不可用
									const commonCategories = Tools.ArrayIntersect(use_category, categories);
									// console.log(arr);
									let tempArr = [];
									carts.forEach(ele2 => {
										if (commonCategories.includes(ele2.category_id.toString())) {
											tempArr.push(ele2);
										}
									})
									// console.log("tempArr", tempArr);
									const money = tempArr.reduce((a, b) => a + b.goods_num * Number(b.mprice > 0 ? b.mprice : b.price), 0);
									// console.log("money", money);
									if (ele.man > money) {
										useList.splice(index, 1);
										unuseList.push(ele);
									}
								}
							}
						})
						const okCouponList = localStorage.getItem("okCouponList");
						okCouponList.length && useList.length && useList.forEach(ele=>{
							okCouponList.forEach(ele2=>{
								ele.checked = ele.id == ele2.id;
							})
						})
						this.useList = useList;
						this.unuseList = unuseList;
					})
			},
			TabSlide(index) {
				this.$router.push({
					name: 'OrderCoupon',
					params: {
						type: tabItemEns[index]
					}
				});
			},
		}
	}
</script>