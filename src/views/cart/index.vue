<template>
	<div class="page__bd" style="padding-bottom:100px;">
		<div class="edit flex-box">
			<div class="edit-t1">我的购物车</div>
			<div v-if="!editmode && carts.length" class="edit-t2" @click="editcart">编辑商品</div>
			<div v-if="editmode" class="edit-t2" @click="editcart">完成</div>
		</div>
		<div v-if="carts.length" class="cart-section">
			<div class="cart-title flex-box">
				<div class="cart-shop">官方旗舰店</div>
				<router-link v-if="couponsList.length && !editmode" :to="{name:'Coupon'}" class="get-coupon">领取优惠券</router-link>
			</div>
			<div class="cart-box flex-box">
				<a-checkbox-group  class="cart-left" :options="cartids" v-model="checkedCarts" @change="handleCheckedCartsChange" />

				<div class="cart-right" style="width: 100%;">
					<div v-for="(item, index) in carts" :key="index" class="cart-goods flex-box">
						<img v-if="item.thumbnail" class="cart-imgx" :src="item.thumbnail">
						<img v-else class="cart-imgx" src="~@/assets/imgicon.png">
						<div class="cart-dis">
							<div class="cart-dis-t">{{item.title}}</div>
							<div class="cart-dis-i">
								<span v-for="(attr, index2) in item.goods_attrs" :key="index2" class="tags" :data-id="attr.valueId">{{attr.value}}</span>
							</div>
							<div class="cart-dis-p flex-box">
								<div class="cart-dis-p1 flex-box">
									<div class="cart-dis-p2">￥<span class="pe1">{{item.mprice > 0 ? item.mprice : item.price}}</span></div>
									<div v-if="item.mprice > 0" class="cart-dis-p3">￥{{item.price}}</div>
								</div>
								<div v-if="!editmode" class="attr-num">
									<span v-if="item.goods_num <= 1" class="minus disabled">-</span>
									<span v-else class="minus" :data-index="index" :data-cartid="item.id" @click="minusNum">-</span>
									<input class="num-input" type="number" name="buyNum" maxlength="4" v-model="item.goods_num" :data-index="index" :data-cartid="item.id" disabled v-on:input="editNum" />
									<span v-if="item.goods_num >= 9999" class="plus disabled">+</span>
									<span v-else class="plus" :data-index="index" :data-cartid="item.id" @click="plusNum">+</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<NoData v-else title="购物车"></NoData>

		<!-- 优惠券 -->
		<div v-if="carts.length && couponx.id && !editmode" class="cart-coupon">
			<div class="cart-coupon_p flex-box"><span class="iconfont icon-coupon06"><span class="cart-coupon-t1">满{{couponx.man}}减{{couponx.jian}}</span></span>用券立减{{couponx.jian}}元</div>
		</div>

		<div v-if="editmode" class="editResult flex-box">
			<a-checkbox v-if="!editmode" :checked="checkAll" @change="handleCheckAllChange"></a-checkbox>
			<div></div>

			<div class="flex-box">
				<span class="editok" @click="clearCart">清空购物车</span>
				<span class="editok" @click="deleteCart">删除</span>
			</div>
		</div>
		<div v-else class="editResult flex-box">
			<div class="flex-box checkLeft">
				<div>
				<a-checkbox :checked="carts.length > 0 && checkAll" @change="handleCheckAllChange"></a-checkbox>&nbsp;全选
				</div>
				<div class="total">
					<div>总计：<span class="pe1">￥<span class="pe2">{{total}}</span></span></div>
					<div v-if="cheap > 0" class="pe4">立减:￥{{cheap}}</div>
				</div>
			</div>
			<div class="editok2" @click="goPay">去结算<span class="pe3">({{checkedNum}}件)</span></div>
		</div>
		<Footer></Footer>
	</div>
</template>

<script>
	import Footer from '@/components/Footer'
	import NoData from '@/components/NoData'
	// import GetBestCoupon from "../utils/coupon.js"
	import { Checkbox, Modal } from 'ant-design-vue'
	import {
		mapGetters,
		mapState,
		mapActions
	} from 'vuex'

	export default {
		name: 'Cart',
		components: {
			Footer,
			NoData,
			'a-checkbox': Checkbox,
			'a-checkbox-group': Checkbox.Group,
			Modal
		},
		data() {
			return {
				carts: [],
				cartids: [],
				// total: '0.00', // 总价
				cheap: '0.00', // 优惠
				couponsList: [],
				// couponx: {}, //  当前可用券
				editmode: !1,
				checkedCarts: [],
				// checkAll: false,
				// checkedNum: 0,
				deleteids: ''
			}
		},
		computed: {
			...mapState({
				// carts: state => state.cart.carts
			}),
			...mapGetters({
				// carts: 'cart/GetUserCart',
				total: 'cart/cartTotalPrice',
				checkAll: 'cart/checkAll',
				checkedNum: 'cart/checkedNum',
				couponx: 'cart/getBestCoupon'
			})
		},
		mounted() {
			// this.setPageTitle({pageTitle:'购物车'})
			this.user_id = 1;
			this.GetUserCart();
		},
		methods: {
			...mapActions({
				// setPageTitle: 'title/setPageTitle',
				setCarts: 'cart/setCarts',
				editQuantity: 'cart/editQuantity',
				incrementQuantity: 'cart/incrementQuantity',
				decrementQuantity: 'cart/decrementQuantity',
				setCouponsList: 'cart/setCouponsList'
			}),
			async GetUserCart() {
				await this.$api.get('Cart/GetUserCart', {
						user_id: this.user_id
					})
					.then(res => {
						console.log("GetUserCart", res);
						if (res.cartList.length > 0) {
							const total = res.cartTotal;
							this.carts = res.cartList;
							this.cartids = Tools.pluck(res.cartList, 'id').map(id=>id.toString());
							this.checkedCarts = Tools.pluck(res.cartList.filter(item => item.checked), 'id').map(id=>id.toString());
							this.setCarts({
								carts: this.carts,
								checkedCarts: this.checkedCarts
							});
						}
					})
					await this.GetUseCouponList();
			},
			GetUseCouponList: function(){
				this.$api.get('coupon/GetUseCouponList', {user_id:this.user_id})
				.then(res=>{
					console.log("GetUseCouponList", res);
					const couponsList = res.couponsList;
					couponsList.length && couponsList.forEach(ele=>{
						ele.use_start = Tools.formatTime(ele.use_start,'.',':');
						ele.use_end = Tools.formatTime(ele.use_end,'.',':');
					})
					this.setCouponsList({couponsList: couponsList});
				})
			},
			handleCheckAllChange(e) {
				Object.assign(this, {
					checkedCarts: e.target.checked ? Tools.pluck(this.carts, 'id').map(id=>id.toString()) : [],
					// checkAll: e.target.checked
				})
				this.setCarts({
					carts: this.carts,
					checkedCarts: this.checkedCarts
				});
			},
			handleCheckedCartsChange(checkedCarts) {
				// this.checkAll = checkedCarts.length === this.carts.length;
				this.setCarts({
					carts: this.carts,
					checkedCarts: this.checkedCarts
				});
			},
			editcart() {
				this.editmode = !this.editmode;
				// this.setCarts({
				// 	carts: this.carts,
				// 	checkedCarts: this.checkedCarts
				// });
			},
			editNum(e) {
				const index = e.target.dataset.index;
				const id = Number(e.target.dataset.cartid);
				const num = this.carts[index].goods_num;
				this.editQuantity({
					id,
					num
				});
			},
			minusNum(e) {
				const id = Number(e.target.dataset.cartid);
				this.decrementQuantity({
					id
				});
			},
			plusNum(e) {
				const id = Number(e.target.dataset.cartid);
				this.incrementQuantity({
					id
				});
			},
			deleteCart() {
				if(!this.checkedCarts.length){
					alert('请选择');
				}else{
					// this.carts = this.carts.filter(product => !this.checkedCarts.includes(product.id.toString()));
					// this.checkedCarts = [];
					// this.setCarts({
					// 	carts: this.carts,
					// 	checkedCarts: this.checkedCarts
					// })
				}
			},
			clearCart() {
				const that = this;
				Modal.confirm({
					title: '友情提示',
					content: '此操作将清空购物车商品, 是否继续?',
					okType: 'danger',
					centered: true,
					okText: '确认',
					cancelText: '取消',
					onOk() {
						return new Promise((resolve, reject) => {
							that.setCarts({
								carts: [],
								checkedCarts: []
							})
							console.log("删除成功");
						}).catch(() => console.log("取消删除"));
					},
					onCancel() {},
				});
			},
			goPay() {
				if(!this.checkedCarts.length){
					alert('请选择');
				}else{
					this.$router.push({name:'OrderPay', params:{type:'cart'}});
				}
			},
		}
	}
</script>
<style scoped>
	.edit {
		padding: 10px;
		background: #fff;
		box-shadow: 0 0 3px rgba(0, 0, 0, 0.05);
		justify-content: space-between;
	}

	.edit-t1 {
		color: #333;
		font-size: 14px;
	}

	.edit-t2 {
		color: #FF0036;
		font-size: 14px;
	}

	.cart-section {
		margin-top: 10px;
		padding: 0 0 10px 10px;
		background: #fff;
	}

	.cart-title {
		position: relative;
		padding: 10px 10px 10px 0;
		justify-content: space-between;
		align-items: center;
	}

	.cart-title:after {
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 0;
		border-bottom: 1px solid #e5e5e5;
	}

	.cart-shop {
		font-size: 16px;
		font-weight: 600;
	}

	.get-coupon {
		color: #f00;
		font-size: 12px;
	}

	.cart-box {
		align-items: center;
	}

	.cart-left {
		/* padding: 0 0 0 5px; */
	}

	/*a-checkbox*/
	.a-checkbox {
		display: block;
		height: 100px;
		margin-left: 0;
		line-height: 100px;
	}

	.checkLeft .a-checkbox {
		height: auto;
		line-height: inherit;
		/* padding-left: 5px; */
	}

	.cart-goods {
		position: relative;
		height: 100px;
		padding: 10px 0;
	}

	.cart-goods:after {
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 0;
		border-bottom: 1px solid #eee;
	}
	.cart-imgx {
		width: 80px;
		height: 80px;
	}

	.cart-dis {
		padding: 0 10px;
		width: 100%;
	}

	.cart-dis-t {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		color: #000;
		line-height: 1.5;
		font-size: 14px;
	}

	.cart-dis-i {
		height: 18px;
		margin: 5px 0 10px;
		color: #999;
		font-size: 12px;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}

	.tags {
		margin-right: 5px;
		padding: 0 5px;
		background: #eee;
		border-radius: 2px;
	}

	.cart-dis-p {
		justify-content: space-between;
		align-items: center;
		height: 25px;
		line-height: 25px;
	}

	.cart-dis-p1 {
		color: #FF0036;
		font-size: 12px;
		line-height: 1;
		align-items: center;
	}

	.cart-dis-p3 {
		padding-left: 5px;
		color: #ccc;
		font-size: 11px;
		text-decoration: line-through;
	}

	.pe1 {
		color: #FF0036;
		font-size: 14px;
	}

	.attr-total {
		justify-content: space-between;
	}

	.minus,
	.plus {
		display: inline-block;
		width: 25px;
		height: 25px;
		background: #eee;
		border-radius: 2px;
		font-size: 20px;
		font-family: 'arial';
		text-align: center;
		line-height: 25px;
		vertical-align: top;
	}

	.num-input {
		display: inline-block;
		width: 40px;
		height: 25px;
		background: #fff;
		border: 1px solid #eee;
		min-height: 23px;
		line-height: 23px;
		text-align: center;
		vertical-align: top;
	}

	.minus.disabled,
	.plus.disabled {
		color: #ccc;
	}


	.weui-cell {
		height: 100px;
		padding: 0;
	}

	.weui-cell:before {
		display: none;
	}

	.editResult {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 50px;
		height: 40px;
		padding-left: 10px;
		background: #fff;
		box-shadow: 0 1px 10px rgba(0, 0, 0, .1);
		font-size: 12px;
		z-index: 2;
		justify-content: space-between;
		align-items: center;
	}

	.allcheck {
		line-height: 1;
	}

	.checkLeft {
		justify-content: space-between;
		width: 68%;
		padding: 5px 0;
		align-items: center;
		text-align: right;
		line-height: 1;
	}

	.editok {
		margin-right: 5px;
		padding: 0 10px;
		height: 26px;
		background: #FF0036;
		border-radius: 2px;
		color: #fff;
		line-height: 26px;
		text-align: center;
	}

	.editok2 {
		width: 30%;
		height: 40px;
		background: #FF0036;
		color: #fff;
		font-size: 15px;
		line-height: 40px;
		text-align: center;
	}


	/*.pe1 { color: #FF0036; }*/
	.pe2 {
		font-size: 16px;
	}

	.pe3 {
		font-size: 11px;
	}

	.pe4 {
		font-size: 11px;
		color: #333;
	}


	.cart-coupon {
		background: #fff;
		font-size: 12px;
	}

	.cart-coupon_p {
		margin-top: 1px;
		height: 35px;
		line-height: 35px;
		padding: 0 10px;
		background: #fff3e3;
		color: #f99407;
		align-items: center;
	}

	.icon-coupon06 {
		position: relative;
		margin-right: 5px;
		color: #f00;
		font-size: 10px;
		text-align: center;
	}

	.icon-coupon06:before {
		font-size: 12px;
	}

	.cart-coupon-t1 {
		position: absolute;
		left: 0;
		right: 0;
	}
</style>