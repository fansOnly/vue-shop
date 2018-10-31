<template>
	<div class="page_bd" style="padding-bottom:110px;">
		<div class="edit flex-box">
			<div class="edit-t1">我的购物车</div>
			<div v-if="!editmode && carts.length" class="edit-t2" @click="editcart">编辑商品</div>
			<div v-if="editmode" class="edit-t2" @click="editok">完成</div>
		</div>
		<div v-if="carts.length" class="cart-section">
			<div class="cart-title flex-box">
				<div class="cart-shop">官方旗舰店</div>
				<router-link v-if="couponsList.length && !editmode" to="" class="get-coupon" >领取优惠券</router-link>
			</div>
			<div class="cart-box flex-box">
					<el-checkbox-group class="cart-left" v-model="checkedCarts" @change="handleCheckedCartsChange">
						<el-checkbox v-for="(item, index) in carts" :label="item.id" :key="index">&nbsp;</el-checkbox>
					</el-checkbox-group>

				<div class="cart-right" style="width: 100%;">
					<div v-for="(item, index) in carts" :key="index" class="cart-goods flex-box">
						<div v-if="item.thumbnail" class="cart-img"><img class="cart-imgx" :src="item.thumbnail" ></div>
						<div v-else class="cart-img"><img class="cart-imgx" src="~@/assets/imgicon.png" ></div>
						<div class="cart-dis">
							<div class="cart-dis-t">{{item.title}}</div>
							<div class="cart-dis-i">
								<span v-for="(attr, index) in item.goods_attrs" :key="index" class="tags" :data-id="attr.valueId">{{attr.value}}</span>
							</div>
							<div class="cart-dis-p flex-box">
								<div class="cart-dis-p1">
									<div class="cart-dis-p2">￥<span class="pe1">{{item.mprice > 0 ? item.mprice : item.price}}</span></div>
									<div v-if="item.mprice > 0" class="cart-dis-p3">￥{{item.price}}</div>
								</div>
								<div v-if="!editmode" class="attr-num">
									<span v-if="item.goods_num <= 1" class="minus disabled">-</span>
									<span v-else class="minus" :data-index="index" :data-cartid="item.id" @click="minusNum">-</span>
									<input class="num-input" type="number" name="buyNum" maxlength="4" v-model="item.goods_num" :data-index="index" :data-cartid="item.id" @blur="editNum" />
									<span v-if="item.goods_num >= 9999" class="plus disabled">+</span>
									<span v-else class="plus" :data-index="index" :data-cartid="item.id" @click="plusNum">+</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-else class="noData">
				<img class="noData-img" src="~@/assets/nodata.png" mode="widthFix">
				<div class="noData-txt">您的购物车是空的...</div>
			</div>
		
		<!-- 优惠券 -->
		<div v-if="couponx.id" class="cart-coupon">
			<div class="cart-coupon_p flex-box"><span class="iconfont icon-coupon06"><span class="cart-coupon-t1">满{{couponx.man}}减{{couponx.jian}}</span></span>用券立减{{couponx.jian}}元</div>
		</div>		
		
		<div v-if="editmode" class="editResult flex-box">
				<el-checkbox v-model="allChecked" @change="handleCheckAllChange">全选</el-checkbox>

			<div class="flex-box">
				<span class="editok" @click="clearCart">清空购物车</span>
				<span class="editok" @click="deleteCart">删除</span>
			</div>
		</div>
		<div v-else class="editResult flex-box" >
			<div class="flex-box checkLeft">
				<el-checkbox v-model="allChecked" @change="handleCheckAllChange">全选</el-checkbox>

				<div class="total">
					<div>总计：<span class="pe1">￥<span class="pe2">{{total}}</span></span></div>
					<div class="pe4">总额:￥{{total}}<!-- ,立减:￥{{cheap}} --></div>
				</div>
			</div>
			<div class="editok2" @click="goPay">去结算<span class="pe3">({{checkedNum}}件)</span></div>
		</div>
		<Footer></Footer>
	</div>
</template>

<script>
	import Footer from '../components/Footer'
	import GetBestCoupon from "../libs/coupon.js"
	import { mapGetters, mapState, mapActions } from 'vuex'
	
	export default {
		name: 'Cart',
		components:{
			Footer
		},
		data(){
			return {
				carts: [],
				total: '0.00', // 总价
				cheap: '0.00', // 优惠
				couponsList: [],
				couponx: {},  //  当前可用券
				editmode: !1,
				checkedCarts: [],
				allChecked: false,
				checkedNum: 0,
				deleteids: '',
			}
		},
		computed:{
			...mapState({
				// count: state => state.test.count
			})
		},
		mounted() {
			// this.setPageTitle({pageTitle:'购物车'})
			this.user_id = 1;
			this.GetUserCart();
		},
		methods:{
			// ...mapActions({
			// 	setPageTitle: 'title/setPageTitle'
			// }),
			GetUserCart(){
				this.$api.get('Cart/GetUserCart', {user_id:this.user_id})
				.then(res=>{
					console.log("GetUserCart", res);
					if(res.state == 1){
						const total = res.cartTotal;
						let carts = res.cartList;
						const allChecked = (carts.length && carts.filter(item => !item.checked ).length) ? false : true;
						let checkedNum = 0;
						carts.filter(item => !!item.checked && checkedNum++);
						this.carts = carts;
						this.total = this.tools.Decimal(total);
						this.allChecked = allChecked;
						this.checkedNum = checkedNum;
						this.editmode = !1;
						// return this.GetUseCouponList();
					}else{
						this.carts = [];
						this.total = '0.00';
						this.allChecked = !1;
						this.checkedNum = 0;
						this.editmode = !1;
					}
				})
			},
			handleCheckAllChange(val) {
				this.checkedCarts = val ? this.tools.pluck(this.carts, 'id') : [];
			},
			handleCheckedCartsChange(value) {
				let checkedCount = value.length;
				this.allChecked = checkedCount === this.carts.length;
			},
			editcart(){},
			editok(){},
			editNum(){},
			minusNum(e){
				const index = e.target.dataset.index;
				const id = this.carts[index].id;
				this.$store.dispatch('cart/miusCartNum', {id});
				
				// this.carts[index].goods_num--;
			},
			plusNum(){},
			deleteCart(){},
			clearCart(){},
			goPay(){},
		}
	}
</script>
<style scoped>
.edit { padding: 10px; background: #fff; box-shadow: 0 0 3px rgba(0,0,0,0.05); justify-content: space-between; }
.edit-t1 { color: #333; font-size: 14px; }
.edit-t2 { color: #FF0036; font-size: 14px; }

.cart-section { margin-top: 10px; padding: 0 0 10px 10px; background: #fff; }

.cart-title { position: relative; padding: 10px 10px 10px 0; justify-content: space-between; align-items: center; }
.cart-title:after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 0; border-bottom: 1px solid #e5e5e5; }
.cart-shop {  font-size: 16px; font-weight: 600; }
.get-coupon { color: #f00; font-size: 12px; }

.cart-box { align-items: center; }
.cart-left { padding:0 0 0 5px;}
/*el-checkbox*/
.el-checkbox__label { display: block; }
.el-checkbox { display: block; height: 100px; margin-left: 0; line-height: 100px; }
.checkLeft .el-checkbox { height: auto; line-height: inherit; padding-left: 5px; }

.cart-goods { position: relative; height: 100px; padding: 10px 0; }
.cart-goods:after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 0; border-bottom: 1px solid #eee; }

.cart-img { width: 80px; height: 80px; }
.cart-dis { padding: 0 10px; width: 100%; }
.cart-dis-t { overflow:hidden; text-overflow:ellipsis; display:-webkit-box;  -webkit-box-orient:vertical; -webkit-line-clamp:1; color: #000; line-height: 1.5; font-size: 14px; }
.cart-dis-i { margin: 5px 0 10px; color: #999; font-size: 12px; text-align: left; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:1; }
.tags { margin-right: 5px; padding: 0 5px; background: #eee; border-radius: 2px; }
.cart-dis-p { justify-content: space-between; align-items: center; }
.cart-dis-p1 { color: #FF0036; font-size: 12px; line-height: 1; }
.cart-dis-p3 { color: #ccc; font-size: 11px; text-decoration: line-through; }
.pe1 { color: #FF0036; font-size: 14px; }

.attr-total { justify-content: space-between; }
.minus,.plus { display: inline-block; width: 25px; height: 25px; background: #eee; border-radius: 2px; font-size: 20px; font-family: 'arial'; text-align: center; line-height: 25px; vertical-align: top; }
.num-input { display: inline-block; width: 40px; height: 25px; border: 1px solid #eee; min-height: 23px; line-height: 23px; text-align: center; vertical-align: top; }
.minus.disabled,.plus.disabled { color: #ccc; }


.weui-cell { height: 100px; padding: 0; }
.weui-cell:before { display: none; }

.editResult { position: fixed; left: 0; right: 0; bottom: 60px; height: 50px; padding-left: 10px; background: #fff; box-shadow: 0 1px 10px rgba(0,0,0,.1); font-size: 12px; z-index: 2; justify-content: space-between; align-items: center; }
.allcheck { line-height: 1; }
.checkLeft { justify-content: space-between; width: 68%; padding: 5px 2% 5px 0; align-items: center; text-align: right; }
.editok { margin-right: 5px; padding: 0 10px; height: 26px; background: #FF0036; border-radius: 2px; color: #fff; line-height: 26px; text-align: center; }
.editok2 { width: 30%; height: 50px; background: #FF0036; color: #fff; font-size: 16px; line-height: 50px; text-align: center; }


/*.pe1 { color: #FF0036; }*/
.pe2 { font-size: 16px; }
.pe3 { font-size: 11px; }
.pe4 { font-size: 11px; color: #333; }


.cart-coupon { padding-top: 10px; background: #fff; font-size: 12px; }
.cart-coupon_p { margin-top: 1px; height: 35px; line-height: 35px; padding: 0 10px; background: #fff3e3; color: #f99407; align-items: center; }
.icon-coupon06 { position: relative; margin-right: 5px; color: #f00; font-size: 10px; text-align: center; }
.icon-coupon06:before { font-size: 12px; }
.cart-coupon-t1 { position: absolute; left: 0; right: 0; }</style>