<template>
	<div>
		<TabSlide :tabItems="tabItems" :tabIndex="tabIndex" @TabSlide="TabSlide"></TabSlide>

		<div class="coupon-top flex-box">
			<div  v-if="tabIndex == 0" class="recommendCheck">
				<a-radio @change="checkRecommend" :checked="recommendCheck"></a-radio>
			</div>
			<div class="coupon-txt flex-box">
				<div v-if="tabIndex == 0">推荐优惠</div>
				<div class="coupon-tip" @click="openRules">使用规则</div>
			</div>
		</div>
		<div v-if="tabIndex == 0">
			<div v-if="useList.length" class="coupon-box flex-box">
				<div class="coupon-left">
					<a-radio-group @change="checkCoupon" v-model="couponId" >
						<a-radio v-for="(item, index) in useList" :key="index" :value="item.id"></a-radio>
					</a-radio-group>
				</div>
				<div class="coupon-right">
					<CouponComponents :couponList="useList"></CouponComponents>
				</div>
			</div>
			<NoData v-else title="可用优惠券"></NoData>
		</div>
		<div v-if="tabIndex == 1">
			<div v-if="unuseList.length" class="coupon-box flex-box">
				<div class="coupon-right2">
					<CouponComponents :couponList="unuseList"></CouponComponents>
				</div>
			</div>
			<NoData v-else title="优惠券列表"></NoData>
		</div>

		<div class="pay-bottom flex-box">
			<div class="pay-lt">已选{{checkedNum}}张，可抵扣<text class="pay-cr">￥{{coupon}}</text>元</div>
			<div class="pay-ok" @click="okCoupon">确认</div>
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
	import { Radio } from 'ant-design-vue'
	import GetBestCoupon from '@/utils/coupon2'
	import {mapGetters, mapActions, mapState} from 'vuex'
	export default {
		name: 'OrderCoupon',
		components: {
			NoData,
			NoMore,
			CouponComponents,
			TabSlide,
			'a-radio': Radio,
			'a-radio-group': Radio.Group
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
				coupon_tip: '',
				// couponId: -1
			}
		},
		computed:{
			// ...mapState({
			// 	couponId: state => state.coupon.id
			// })
			couponId: {
				get(){
					return this.$store.state.coupon.okCoupon.id
				},
				set(value){
					this.setCoupon(value)
				}
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
			...mapActions({
				setCoupon: 'coupon/setCoupon',
			}),
			okCoupon(){
				console.log(this.couponId);
				const okCoupon = this.useList.filter(item=>item.id == this.couponId)[0];
			},
			openRules(){},
			checkRecommend(){
				this.setCoupon({coupon:this.bestCoupon});
				this.recommendCheck = true;
			},
			checkCoupon(e){
				console.log('选择', `${e.target.value}`);
				const coupon = this.useList.filter(item=>item.id == e.target.value)[0];
				this.setCoupon({coupon:coupon});
				this.recommendCheck = e.target.value == this.bestCoupon.id;
			},
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
							const categories = Tools.pluck(carts, 'category_id');
							
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
									if (ele.man > money) {
										useList.splice(index, 1);
										unuseList.push(ele);
									}
								}
							}
						})
						
						this.bestCoupon = GetBestCoupon(this.carts, useList);
						this.recommendCheck = this.couponId == this.bestCoupon.id;
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
<style scoped>
.order-box { position: relative; height: 45px; background: #fff; line-height: 45px; justify-content: space-around; }
.order-box:after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 0; border-bottom: 1px solid #f3f3f3; }
.order { position: relative; width: 40%; font-size: 13px; color: #666; text-align: center; }
.order.on { color: #FF0036; }
.order.on:after { content: ""; position: absolute; left: 0; right: 0; bottom: 1px; height: 0; border-bottom: 2px solid #FF0036; }
.icon-order { font-size: 25px; line-height: 1; }



.coupon-box { padding: 10px; align-items: center; justify-content: space-between; }
.coupon-left { width: 10%; text-align: center; }
.coupon-right { width: 90%; }
.coupon-right2 { width: 100%; }
.weui-cell { height: 102px; margin-bottom: 10px; padding: 0; }
.weui-cell:before { display: none; }
.weui-check__hd_in-checkbox { padding-right: 0; }
.weui-icon-checkbox_circle,.weui-icon-checkbox_success { margin: 0; }


.coupon-top { height: 40px; margin-top: 10px; padding: 0 10px; background: #fff; line-height: 40px; align-items: center; }
.recommendCheck { width: 10%; }
.icon1 { position: relative; top: 8px; }
.coupon-txt { width: 90%; justify-content: space-between; }
.coupon-tip { color: #f00; text-align: right; }
.icon-tip:before { font-size: 22px; line-height: 1; vertical-align: middle; }


.coupon-item { align-items: center; }
.coupon-li { position: relative; height: 58px; margin-bottom: 10px; padding: 20px 0; background: #fff; border-top: 4px solid #4ad8da; border-radius: 3px; box-shadow: 0 0 5px rgba(0,0,0,.05); overflow: hidden; font-size: 12px; }
.coupon-li.expire { border-color: #ccc; }
.coupon-li.used { border-color: green; }
.coupon-li:after { content: ""; position: absolute; left: 110px; top: 0; bottom: 0; width: 0; border-left: 1px dashed #e5e5e5; }
.coupon-price { width: 110px; text-align: center; color: #4ad8da; }
.coupon-price.expire { color: #ccc; }
.coupon-price.used { color: green; }
.sp1 { display: inline-block; font-size: 35px; line-height: 1; font-family: 'impact'; vertical-align: top; font-weight: 100; }
.coupon-t2 { margin-top: 5px; }
.coupon-desc { padding-left: 15px; }
.coupon-p1 { font-size: 12px; }
.coupon-p2 { font-size: 12px; color: #bbb; }
.coupon-p3 { font-size: 12px; color: #ccc; }


.pay-bottom { position: fixed; left: 0; right: 0; bottom: 0; height: 50px; background: #fff; line-height: 50px; z-index: 7; justify-content: space-between; box-shadow: 0 1px 10px rgba(0,0,0,.1); }
.pay-lt { padding-left: 10px; font-size: 12px; }
.pay-cr { color: #FF0036; }
.pay-ok { width: 110px; height: 50px; background: linear-gradient(135deg,#FF0036, #FF9500); background: #FF0036; color: #fff; font-size: 16px; line-height: 50px; text-align: center; }
</style>