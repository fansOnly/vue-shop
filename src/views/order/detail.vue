<template>
	<div style="background:#f7f7f7;">
		<div class="section">
			<div class="item1 itemx flex-box">
				<div>
					<span class="item-c9">订单状态：</span>
					<span v-if="order.state == 1" class="color">待支付</span>
					<span v-else-if="order.state == 2" class="color2">待收货</span>
					<span v-else-if="order.state == 3" class="color2">待评价</span>
					<span v-else-if="order.state == 4" class="color4">已签收</span>
					<span v-else-if="order.state == 11" class="color2">待退货</span>
					<span v-else-if="order.state == 12" class="color2">退货中</span>
					<span v-else-if="order.state == 13" class="color2">已退款</span>
					<span v-else-if="order.state == 77" class="color3">过期取消</span>
					<span v-else-if="order.state == 78" class="color3">用户取消</span>
					<!-- <span v-else class="">已支付</span> -->
				</div>
				<div v-if="order.state == 1" class="iconfont icon-time1">支付剩余：<CountDown :timetamp="order.countDownNum"></CountDown></div>
			</div>
			<div class="item1 flex-box"><span class="item-c9">订单编号：</span>{{order.order_sn}}</div>
			<div class="item1 flex-box"><span class="item-c9">下单时间：</span>{{order.create_time}}</div>
			<div v-if="order.state == 2 || order.state == 3 || order.state == 4" class="item1 itemx flex-box">
				<div class="item1 flex-box"><span class="item-c9">支付时间：</span>{{order.pay_time}}</div>
			</div>
			<div v-if="order.state == 77" class="item1 itemx flex-box">
				<div class="item1 flex-box"><span class="item-c9">取消时间：</span>{{order.cancel_time}}</div>
			</div>
			<!-- 待支付 -->
			<div v-if="order.state == 1" class="state-box flex-box">
				<div class="state-btn btn1" @click="cancelOrder">取消订单</div>
				<div v-if="order.pay_by == 1" class="state-btn btn2" @click="wxPay">立即支付</div>
				<div v-else class="state-btn btn2" @click="choosePay">立即支付</div>
			</div>
			<!-- 已取消 -->
			<div v-if="order.state == 77" class="state-box flex-box">
				<div class="state-btn btn1">订单已取消</div>
			</div>
			<!-- 已支付 -->
			<div v-if="order.state == 2" class="state-box flex-box">
				<router-link class="state-btn btn2" :to="{name:'Dilivery',params:{order_id:order.id}}">物流详情</router-link>
				<div v-if="order.goods_id" class="state-btn btn3" @click="tuihuo(order.id)">申请退货</div>
				<div v-if="order.goods_id" class="state-btn btn3" @click="okReceive(order.id)">确认收货</div>
				<div v-if="order.score_id" class="state-btn btn3" @click="okReceive2(order.id)">确认收货</div>
			</div>
			<!-- 待评价 -->
			<div v-if="order.state == 3" class="state-box flex-box">
				<router-link class="state-btn btn2" :to="{name:'Dilivery',params:{order_id:order.id}}">物流详情</router-link>
				<router-link :to="{name:'Evaluate', params:{order_id:order.id}}" class="state-btn btn3">去评价</router-link>
			</div>
			<!-- 已评价 -->
			<div v-if="order.state == 4" class="state-box flex-box">
				<router-link class="state-btn btn2" :to="{name:'Dilivery',params:{order_id:order.id}}">物流详情</router-link>
				<router-link :to="{name:'Evaluation', params:{order_id:order.id}}" class="state-btn btn3">查看评价</router-link>
			</div>
		</div>

		<div v-if="mask">
			<div :class="['mask', {maskon: mask}]" @click="closePay"></div>
			<div class="pay-type">
				<div class="pay-item pay-item1" @click="wxPay"><span class="iconfont icon-wepay2 icon-paytype"></span>微信支付</div>
				<div class="pay-item" @click="walletPay"><span class="iconfont icon-wallet icon-paytype"></span>钱包支付</div>
			</div>
		</div>

		<div class="pay-address">
			<div class="item1 flex-box"><span class="item-c9">商品金额：</span><span class="color">￥{{order.total_fee}}</span>(在线支付)</div>
			<div v-if="order.goods_coupon" class="item1 flex-box"><span class="item-c9">订单优惠：</span>￥{{order.goods_coupon}}</div>
			<div class="item1 flex-box"><span class="item-c9">收货地址：</span>{{order.area}} {{order.address}}</div>
			<div class="item1 flex-box"><span class="item-c9">收货人：</span>{{order.name}} {{order.phone}}</div>
			<div class="item1 flex-box"><span class="item-c9">配送方式：</span>普通快递</div>
		</div>

		<div class="pay-goods">
			<div class="pay-goods-t flex-box">
				<div class="ttt">官方旗舰店</div>
				<button class="contact" open-type="contact">在线客服<span class="iconfont icon-kefu2"></span></button>
			</div>
			<div v-for="(item, index) in order.goods" :key="index" class="cart-goods flex-box">
				<img v-if="item.thumbnail" class="cart-imgx" :src="item.thumbnail">
				<img v-else class="cart-imgx" src="@/assets/imgicon.png">
				<div class="cart-dis">
					<div class="cart-dis-t">{{item.title}}</div>
					<div class="cart-dis-i">
						<span v-for="(attr, index2) in item.attr" :key="index2" class="tags">{{attr.value}}</span>
					</div>
					<div class="cart-dis-p flex-box">
						<div class="cart-dis-p1">￥<span class="pe1">{{item.price}}</span></div>
						<div class="attr-num">x{{item.buyNum}}</div>
					</div>
				</div>
			</div>
		</div>

		<div class="pay-price">
			<div class="pay-pricex flex-box">
				<div class="pay-p1">商品金额</div>
				<div class="pay-p5">￥{{order.goods_total}}</div>
			</div>
			<div class="pay-pricex flex-box">
				<div class="pay-p1">会员折扣</div>
				<div class="pay-p2">-￥{{order.goods_discount}}</div>
			</div>
			<div v-if="order.goods_coupon" class="pay-pricex flex-box">
				<div class="pay-p1">用券优惠</div>
				<div class="pay-p2">-￥{{order.goods_coupon}}</div>
			</div>
			<!-- <div v-if="order.goods_coupon" class="pay-pricex flex-box">
				<div class="pay-p1">满减优惠</div>
				<div class="pay-p3">-￥{{order.goods_coupon}}</div>
			</div> -->
			<div class="pay-pricex flex-box">
				<div class="pay-p1">商品运费</div>
				<div class="pay-p4">+￥{{order.goods_fare}}</div>
			</div>
			<div class="pay-pricex pay-total">
				<div class="pay-p3">实付金额：<span class="pay-p6">￥{{order.total_fee}}</span></div>
			</div>
		</div>

		<div v-if="order.logisticCode" class="shipper">
			<div class="">快递公司：{{order.shipperName}}({{order.shipperCode}})</div>
			<div class="">快递单号：{{order.logisticCode}}</div>
			<div class="tuibox">
				<div v-for="(item, index) in shipper" :key="">
					<div class="tuip flex-box">
						<span class="tuip1"></span>
						<span class="tuip3">{{item.AcceptTime}}</span>
						<span class="tuip2">{{item.AcceptStation}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import CountDown from '@/components/CountDown'
	export default {
		name: 'OrderDetail',
		components: {CountDown},
		data() {
			return {
				order_id: 0,
				order: {},
				shipper: [],
				mask: !1,
				wallet: 0
			}
		},
		mounted() {
			this.order_id = this.$route.params.id;
			this.GetOrderDetail();
		},
		methods: {
			GetOrderDetail: function() {
				this.$api.get('Order/GetOrderDetail', {order_id: this.order_id})
				.then(res => {
					console.log("GetOrderDetail", res);
					var order = res.order;
					let countDownNum = Math.floor((24*60*60*1000 - (new Date().getTime() - order.update_time*1000))/1000);
					if(countDownNum > 0){
						order.countDownNum = countDownNum;
						// countDown(this, order, 1, this.cb2);
					}
					this.order = this.formatData(order);
					if(order.shipperCode && order.logisticCode){
						this.GetShipperInfo();
					}
				})
			},
			cb2: function(){
				console.log("订单"+ this.order.id + "：倒计时结束啦");
				// this.CancelOrder();
			},
			GetShipperInfo: function(){
				this.$api.get('Order/GetShipperInfo', {order_id: this.order_id})
				.then(res=>{
					console.log("GetShipperInfo", res);
					this.shipper = res.Traces;
				})
			},
			tuihuo(){},
			okReceive(){},
			okReceive2(){},
			cancelOrder: function() {
				this.$api.post('Order/UpdateOrderState', { order_id: this.order_id, user_id: this.user_id, state: 77 })
				.then(res => {
					console.log("UpdateOrderState", res);
					this.order.state = 77;
				})
			},
			choosePay: function(){
				this.mask = true;
			},
			closePay: function(){
				this.mask = false;
			},
			wxPay: function(){
				this.mask = false;
				const total_fee = Number(this.order.total_fee);
				this.$api.post('common/wxpay', {total_fee:total_fee,user_id: this.user_id,pay_type: 1,pay_by: 1, order_id: this.order_id})
				.then(res=>{
					console.log("wxPay", res);
				})
			},
			walletPay: function(){
				this.mask = false;
				const total_fee = Number(this.order.total_fee);
				this.$api.post('order/WalletPay', {total_fee:total_fee,user_id: this.user_id,pay_type: 1,pay_by: 2, order_id: this.order_id})
				.then(res=>{
					console.log("WalletPay", res);
					if(res.code ==1){
						// 钱包支付
						let user = JSON.parse(localStorage.getItem("user"));
						user.wallet = user.wallet - total_fee;
						localStorage.setItem("user", user);
					}else{
						console.log("err", res);
					}
				})
			},
			formatData(obj){
				obj.create_time = Tools.formatTime(obj.create_time, '-', ':');
				obj.cancel_time = Tools.formatTime(obj.update_time, '-', ':');
				obj.pay_time = obj.pay_time ? Tools.formatTime(obj.pay_time, '-', ':') : null;
				obj.goods_total = Tools.Decimal(Number(obj.goods_total));
				obj.goods_final = Tools.Decimal(Number(obj.goods_final));
				obj.goods_coupon = Tools.Decimal(Number(obj.goods_coupon));
				obj.goods_fare = Tools.Decimal(Number(obj.goods_fare));
				return obj;
			},
		}
	}
</script>
<style scoped>
.section {
    margin-bottom: 10px;
    padding: 10px;
    background: #fff;
}

.item1 {
    line-height: 1.8;
}

.itemx {
    justify-content: space-between;
    align-items: center;
}

.item-c9 {
    width: 70px;
    color: #999;
}

.state-box{
	justify-content: space-around;
	align-items: center;
	padding-top: 5px;
}

.state-btn {
	display: block;
	width: 100%;
	margin: 0 2%;
	height: 37px;
	border-radius: 3px;
	font-size: 14px;
    text-align: center;
    line-height: 35px;
}

.btn1 {
	background: #f3f3f3;
	border: 1px solid #f3f3f3;
    color: #333;
}

.btn2 {
	background: #FF495F;
	border: 1px solid #FF495F;
	color: #fff;
}

.btn3 {
	background: #18BC9C;
	border: 1px solid #18BC9C;
    color: #fff;
}


.page_bd {
    padding: 0 0 10px;
}

.pay-address {
    position: relative;
    margin-top: 10px;
    padding: 10px;
    background: #fff;
    justify-content: space-between;
    align-items: center;
}



/*.pay-address.fixed { position: fixed!important; left: 0; top: 0; right: 0; margin-top: 0; z-index: 66; }*/

.cart-goods {
    position: relative;
    padding: 10px;
    background: #fff;
}



.cart-imgx {
    width: 80px;
    height: 80px;
}

.cart-dis {
    width: 100%;
    padding: 0 0 0 10px;
}

.cart-dis-t {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    color: #000;
    line-height: 1.3;
    font-size: 12px;
}

.cart-dis-i {
    margin: 5px 0;
    color: #999;
    font-size: 12px;
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
}

.cart-dis-p1 {
    color: #FF0036;
    font-size: 12px;
}

.pe1 {
    font-size: 14px;
}

.pe2 {
    margin-left: 5px;
    color: #ccc;
    font-size: 12px;
    text-decoration: line-through;
}

.pay-goods {
    margin-top: 10px;
}

.pay-goods-t {
    position: relative;
    background: #fff;
    height: 40px;
    padding: 0 10px;
    line-height: 40px;
    justify-content: space-between;
    align-items: center;
}

.pay-goods-t:after {
    content: "";
    position: absolute;
    left: 10px;
    right: 0;
    bottom: 0;
    height: 0;
    border-bottom: 1px solid #eee;
}

.contact {
    background: none;
    border: 0;
    margin: 0;
    padding: 0;
    font-size: 12px;
    color: #999;
    line-height: 1;
}

.icon-kefu2 {
    font-size: 28px;
    line-height: 1;
    vertical-align: middle;
}

.contact:after,
.contact:before {
    display: none;
}



/*.pay-address:after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 0; border-bottom: 1px solid #eee; }*/

.item {
    position: relative;
    padding: 5px 10px 0;
    align-items: center;
}

.item-name {
    width: 80px;
}

.item-tag {
    height: 15px;
    margin-left: 15px;
    padding: 0 10px;
    border: 1px solid #FF9500;
    color: #FF9500;
    font-size: 11px;
    line-height: 15px;
}

.arrow:after {
    position: static;
}

.pay-price {
    margin: 10px 0;
    padding: 5px 10px;
    background: #fff;
}

.pay-pricex {
    height: 25px;
    line-height: 25px;
    justify-content: space-between;
}

.pay-p2 {
    color: #FF0036;
}
.pay-p3 {
    float: right;
}

.pay-p4 {
    color: #f60;
}

.pay-p5 { color: #333; }
.pay-p6 { color: #FF0036; font-weight: 600; }

.pay-total { margin-top: 5px; padding-top: 5px; border-top: 1px solid #eee; }

.pay-type { position: fixed; left: 20%; right: 20%; top: 50%; height: 80px; background: #fff; border-radius: 5px; transform: translateY(-50%);z-index: 999999; }
.pay-item { position: relative; height: 40px; line-height: 40px; color: #000; font-size: 16px; text-align: center; display: -webkit-flex; display: flex; align-items: center; justify-content: center; }
.pay-item1:after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 0; border-bottom: 1px solid #e5e5e5; }

.icon-paytype:before { color: #FF0036; font-size: 40px; }



.icon-time1 { color: #999; font-size: 12px; }
.icon-time1:before { font-size: 20px; vertical-align: middle; }

.color2 { color: red; }
.color { color: #f60; }
.color3 { color: #ccc; }
.color4 { color: green; }


.shipper { padding: 10px; background: #fff; }
.tuibox { padding-left: 10px; }
.tuip { position: relative; padding-bottom: 20px; align-items: center; line-height: 30px; }
.tuip:before { content: ""; position: absolute; left: 4px; top: 17px; bottom: -14px; width: 0; border-left: 1px solid #ccc; }
.tuip.on:before { border-color: #18BC9C; }
.tuip.last:before { display: none; }
.tuip1 { position: relative; top: -2px; display: inline-block; width: 7px; height: 7px; margin-right: 8px; background: #18BC9C; border: 1px solid #18BC9C; border-radius: 100%; }
.tuip2 { color: #18BC9C; font-size: 14px; line-height: 1.2; }
.tuip3 { text-align: right; color: #ccc; font-size: 12px; }
</style>