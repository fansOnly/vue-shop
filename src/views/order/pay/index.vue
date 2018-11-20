<template>
	<div style="background:#f5f5f5;">
		<router-link v-if="addressList.length" :to="{name:'SelectAddress'}" class="pay-address flex-box">
			<div v-if="address.id" class="address">
				<div class="item flex-box">
					<div class="item-name">{{address.name}}</div>
					<div class="item-phone">{{address.phone}}</div>
					<div class="item-tag">{{address.title}}</div>
				</div>
				<div class="item">{{address.area}} {{address.address}}</div>
			</div>
			<div v-else class="address">选择收获地址</div>
			<span class="arrow"></span>
		</router-link>
		<router-link v-else :to="{name:'SelectAddress'}" class="pay-address flex-box">添加地址<span class="arrow"></span></router-link>

		<div v-if="carts.length" class="cart-section">
			<div v-for="(item, index) in carts" :key="index" :class="['cart-goods flex-box', carts.length == index+1 ? 'last' : '']">
				<img  v-if="item.thumbnail" class="cart-imgx" :src="item.thumbnail">
				<img v-else class="cart-imgx" src="@/assets/imgicon.png">
				<div class="cart-dis">
					<div class="cart-dis-t">{{item.title}}</div>
					<div class="cart-dis-i">
						<span v-for="(attr, index2) in item.goods_attrs" :key="index2" class="tags">{{attr.value}}</span>
					</div>
					<div class="cart-dis-p flex-box">
						<div v-if="item.mprice > 0" class="cart-dis-p1">￥<span class="pe1">{{item.mprice}}</span><span class="pe2">￥{{item.price}}</span></div>
						<div v-else class="cart-dis-p1">￥<span class="pe1">{{item.price}}</span></div>
						<div class="attr-num">x{{item.goods_num}}</div>
					</div>
				</div>
			</div>
		</div>

		<router-link class="section section4 flex-box" :to="{name:'OrderCoupon', params:{type:'useable'}}">
			<div class="secLeft4">选择优惠券</div>
			<div v-if="checkedCouponNum" class="arrowx">
				已选<span class="cr1">{{checkedCouponNum}}</span>张，可抵扣<span class="cr1">￥{{coupon}}</span>元
			</div>
			<div v-else class="arrowx">
				<span class="iconfont icon-coupon06"><span class="cart-coupon-t1"><span class="cr1">{{useCouponNum}}</span>张可用</span></span>
			</div>
		</router-link>

		<div class="pay-price">
			<div class="pay-pricex flex-box">
				<div class="pay-p1">商品金额</div>
				<div class="pay-p2">￥{{total}}</div>
			</div>
			<div class="pay-pricex flex-box">
				<div class="pay-p1">会员折扣</div>
				<div class="pay-p3">-￥{{discount}}</div>
			</div>
			<div v-if="coupon" class="pay-pricex flex-box">
				<div class="pay-p1">用券优惠</div>
				<div class="pay-p3">-￥{{coupon}}</div>
			</div>
			<!-- <div v-if="fullcut" class="pay-pricex flex-box">
			<div class="pay-p1">满减优惠</div>
			<div class="pay-p3">-￥{{fullcut}}</div>
		</div> -->
			<div class="pay-pricex flex-box">
				<div class="pay-p1">商品运费</div>
				<div class="pay-p3">+￥{{fare}}</div>
			</div>
		</div>

		<div class="pay-method">
			<div class="title">支付方式</div>
			<!-- <radio-group class="radio-group" bindchange="radioChange">
			<label class="radioLabel">
				<radio class="radioz" value="1" checked="{{ radioValue === '1' }}"/>微信支付
			</label>
			<label class="radioLabel">
				<radio class="radioz" value="2" checked="{{ radioValue === '2' }}"/>钱包支付 <span hidden="{{ radioValue !== '2' }}">(余额：<span style="color:#FF0036;font-weight:600;">{{ hasMoney }}</span>元)</span>
			</label>
		</radio-group> -->
		</div>

		<div class="pay-bottom flex-box">
			<div class="pay-lt">实付:<span class="pay-cr">￥<span class="pay-ft">{{total_fee}}</span><span class="pay-tl">(共计{{carts.length}}件)</span></span></div>
			<div class="pay-ok" @click="pay">{{ radioValue === '1' ? '微信' : '钱包' }}支付</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'OrderPay',
		data() {
			return {
				address: {},
				addressList: [],
				carts: [],
				total: '0.00', // 总价
				total_fee: '0.00', // 优惠后价格
				fare: '0.00', // 运费
				// coupon: '0.00', // 优惠
				fullcut: '0.00', // 满减
				content: '',
				useCouponNum: 0,
				// checkedCouponNum: 0,
				discount: 0,
				radioValue: "1",
				hasMoney: null,
				category: '',
				categories: []
			}
		},
		computed: {
			checkedCouponNum(){
				return !Tools.isEmptyObject(this.$store.state.coupon.okCoupon) ? 1 : 0;
			},
			coupon(){
				return !Tools.isEmptyObject(this.$store.state.coupon.okCoupon) ? (this.$store.state.coupon.okCoupon.jian).toFixed(2) : '0.00';
			}
		},
		mounted() {
			this.GetAddress();
			const type = this.$route.params.type;
			if (type == 'buyNow') {
				let cartsx = localStorage.getItem("cartsx");
				let cart = [];
				let total = 0,
					price = 0;
				let categories = [];
				cartsx.forEach(ele => {
					price = Number(ele.mprice) > 0 ? ele.mprice : ele.price;
					cart.push(ele);
					total += parseFloat(price) * ele.goods_num;
					categories.push(ele.category_id);
				})
				this.carts = cart;
				this.total = Tools.Decimal(total);
				this.total_fee = Tools.Decimal(total);
				this.category = categories.join('');
				this.GetUseCouponList(categories);
			} else if (type == 'cart') {
				this.GetUserCart();
			}
		},
		beforeDestroy() {
			// localStorage.removeItem("cartsx");
		},
		methods: {
			wxPay() {
				this.$store.commit('coupon/setCoupon',{});
			},
			SetOrderData() {},
			pay() {
				const address = this.address;
				if (JSON.stringify(address) == '{}') {
					Toast.show({
						text: '请选择收货地址！'
					})
					return !1;
				}
				const useCouponNum = this.useCouponNum;
				const checkedCouponNum = this.checkedCouponNum;
				if (useCouponNum > 0) {
					if (checkedCouponNum == 0) {
					} else {
						this.wxPay();
					}
				} else {
					this.wxPay();
				}
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
						// console.log("categories", categories);
						useList.forEach((ele, index) => {
							if (ele.isAll == 0) {
								let use_category = ele.categories.split(',');
								if (use_category.every(item => !categories.includes(item))) {
									// 无交集-不可用
									useList.splice(index, 1);
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
									}
								}
							}
						})
						this.useCouponNum = useList.length;
					})
			},
			GetAddress(user_id) {
				this.$api.get('user/GetAddress', {
						user_id
					})
					.then(res => {
						console.log("GetAddress", res);
						if (res.addressList.length > 0) {
							let addressList = res.addressList;
							let address = {};
							const addressId = localStorage.getItem("addressId") ? localStorage.getItem("addressId") : 0;
							addressList.forEach(ele => {
								if (addressId) {
									if (addressId == ele.id) {
										address = ele;
									}
								} else {
									// 设置默认地址
									if (ele.state == 2) {
										address = ele;
									}
								}
							})
							this.address = address;
							this.addressList = addressList;
						}
					})
			},
		}
	}
</script>
<style scoped>
	.cart-section { margin-top: 10px; background: #fff; }
.cart-title { position: relative; padding: 10px; font-size: 16px; }
.cart-title:after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 0; border-bottom: 1px solid #eee; }
.cart-goods { position: relative; margin-left: 10px; padding: 10px 10px 10px 0; }
.cart-goods:after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 0; border-bottom: 1px solid #eee; }
.cart-goods.last:after { display: none; }
/*.cart-img { width: 30%; }*/
.cart-imgx { width: 80px; height: 80px; }
.cart-dis { width: 100%; padding: 0 0 0 10px; }
.cart-dis-t { overflow:hidden; text-overflow:ellipsis; display:-webkit-box;  -webkit-box-orient:vertical; -webkit-line-clamp:1; color: #000; line-height: 1.5; font-size: 14px; }
.cart-dis-i { margin: 5px 0 10px; color: #999; font-size: 12px; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:1; }
.tags { margin-right: 5px; padding: 0 5px; background: #eee; border-radius: 2px; }
.cart-dis-p { justify-content: space-between; align-items: center; }
.cart-dis-p1 { color: #FF0036; font-size: 12px; }
.pe1 { font-size: 14px; }
.pe2 { margin-left: 5px; color: #ccc; font-size: 12px; text-decoration: line-through; }


.pay-address { position: relative; margin-bottom: 10px; padding: 10px; background: #fff; justify-content: space-between; align-items: center; }
.item { position: relative; padding: 5px 10px 0; align-items: center; color: #333; }
.item-name { width: 80px; }
.item-tag { height: 15px; margin-left: 15px; padding: 0 10px; border: 1px solid #FF9500; color: #FF9500; font-size: 11px; line-height: 15px; }
.arrow:after { position: static; }


.pay-content { margin-top: 10px; padding: 10px; background: #fff; }
.textarea { height: 100px; padding: 8px; border: 1px solid #e5e5e5; line-height: 1.2; text-align: justify; }


.pay-price { position: relative; margin-bottom: 10px; padding: 10px; background: #fff; justify-content: space-between; align-items: center; }
.pay-pricex { height: 25px; line-height: 25px; justify-content: space-between; }
.pay-p1 { color: #999; }
.pay-p2 { color: #000; font-size: 16px; }
.pay-p3 { color: #FF0036; font-size: 12px; }



.pay-bottom { position: fixed; left: 0; right: 0; bottom: 0; height: 50px; background: #fff; line-height: 50px; z-index: 22; justify-content: space-between; box-shadow: 0 1px 10px rgba(0,0,0,.1); }
.pay-lt { padding-left: 10px; font-size: 12px; }
.pay-cr { color: #FF0036; font-size: 14px; }
.pay-tl { margin-left: 5px; font-size: 12px; }
.pay-ft { font-size: 18px; font-weight: 600; }
.pay-ok { width: 110px; height: 50px; background: linear-gradient(135deg,#FF0036, #FF9500); background: #FF0036; color: #fff; font-size: 16px; line-height: 50px; text-align: center; }



.section { margin: 10px 0; padding: 10px; background: #fff; }
.section4 { justify-content: space-between; align-items: center; color: #333; }
.arrowx { font-size: 12px; }
.arrowx:after { content: ""; display: inline-block; height: 10px; width: 10px; border-width: 1px 1px 0 0; border-color: #C8C8CD; border-style: solid; -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0); transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0); }
.cr1 { padding: 0 1px; color: #FF0036; }
.icon-coupon06 { display: inline-block; position: relative; margin-right: 5px; color: #f00; font-size: 10px; text-align: center; }
.icon-coupon06:before { font-size: 12px; }
.cart-coupon-t1 { position: absolute; left: 0; right: 0; }

.pay-method { padding: 10px; background: #fff; }
.pay-method .title { line-height: 32px; }
.radio-group { margin-top: 10px; display: -webkit-flex; display: flex; }
.radioLabel { display: -webkit-flex; display: flex; align-items: center; }
.radioz { transform: scale(.7,.7); margin-right: 0; }
</style>