<template>
	<div style="background:#f7f7f7;">
		<div class="order-box flex-box">
			<div :class="['order', state == 0 ? 'on' : '' ]" data-type="all" @click="tabOrder">全部订单</div>
			<div :class="['order', state == 1 ? 'on' : '' ]" data-type="unpay" @click="tabOrder">待支付</div>
			<div :class="['order', state == 2 ? 'on' : '' ]" data-type="unreceive" @click="tabOrder">待收货</div>
			<div :class="['order', state == 3 ? 'on' : '' ]" data-type="unevaluate" @click="tabOrder">待评价</div>
			<div :class="['order', state == 11 ? 'on' : '']" data-type="unreturn" @click="tabOrder">退换货</div>
		</div>
		<!-- <div class="order-box flex-box">
			<router-link to="/order/all" :class="['order', state == 0 ? 'on' : '' ]" >全部订单</router-link>
			<router-link to="/order/unpay" :class="['order', state == 1 ? 'on' : '' ]" >待支付</router-link>
			<router-link to="/order/unreceive" :class="['order', state == 2 ? 'on' : '' ]" >待收货</router-link>
			<router-link to="/order/unevaluate" :class="['order', state == 3 ? 'on' : '' ]" >待评价</router-link>
			<router-link to="/order/unreturn" :class="['order', state == 11 ? 'on' : '']" >退换货</router-link>
		</div> -->
		
		<!-- 全部订单 -->
		<div v-if="state == 0 && orderList.length">
			<div v-for="(item, index) in orderList" :key="index" class="order-li">
				<div class="item item1 flex-box">
					<div class="item-t1"><span class="c9">订单编号：</span>{{item.order_sn}}</div>
					<!-- <span v-if="item.state == 1" class="iconfont icon-time1">{{wxTimer[index].countDown}}</span> -->
					<span v-if="item.state == 4 || item.state == 77 || item.state == 78 || item.state == 13" :data-index="index" :data-id="item.id" class="iconfont icon-delete" @click="delOrder"></span>
				</div>
				<div class="item item1 flex-box">
					<div class="item-t1"><span class="c9">下单时间：</span>{{item.create_time}}</div>
				</div>
				<div v-if="item.state == 2 || item.state == 3 || item.state == 4">
					<div class="item item1 flex-box">
						<div class="item-t1"><span class="c9">支付时间：</span>{{item.pay_time}}</div>
					</div>
				</div>
				<div class="item item2 flex-box">
					<div class="item-t1">
						<div>
							<span class="c9">状态：</span>
							<span v-if="item.state == 1" class="state1">待支付</span>
							<span v-else-if="item.state == 2" class="state2">待收货</span>
							<span v-else-if="item.state == 3" class="state3">待评价</span>
							<span v-else-if="item.state == 4" class="state4">已签收</span>
							<span v-else-if="item.state == 11" class="state3">待退货</span>
							<span v-else-if="item.state == 12" class="state3">退货中</span>
							<span v-else-if="item.state == 13" class="state3">已退款</span>
							<span v-else-if="item.state == 77" class="state5">过期取消</span>
							<span v-else-if="item.state == 78" class="state5">用户取消</span>
						</div>
						<div v-if="item.goods_id"><span class="c9">总价：</span>￥{{item.total_fee}}</div>
						<div v-if="item.score_id"><span class="c9">总价：</span>{{item.score}}积分</div>
					</div>
					<div v-if="item.state == 1" class="flex-box">
						<div :data-id="item.id" :data-index="index" class="item-pay" @click="cancelOrder2">取消订单</div>
						<router-link to="detail?order_id=item.id" class="item-pay">去支付</router-link>
					</div>
					<div v-if="item.state == 2" class="flex-box">
						<div class="item-pay" :data-index="index" :data-id="item.id" @click="shipperInfo">物流详情</div>
						<div v-if="item.goods_id" class="item-pay" :data-index="index" :data-id="item.id" @click="tuihuo">申请退货</div>
						<div v-if="item.goods_id" class="item-pay" :data-index="index" :data-id="item.id" @click="okReceive">确认收货</div>
						<div v-if="item.score_id" class="item-pay" :data-index="index" :data-id="item.id" @click="okReceive2">确认收货</div>
					</div>
					<div v-if="item.state == 4"  class="flex-box">
						<div class="item-pay" :data-index="index" :data-id="item.id" @click="shipperInfo">物流详情</div>
						<router-link to="evaluate/evaluation?order_id=item.id" class="item-pay">查看评价</router-link>
						<router-link v-if="item.goods_id" to="/pages/product/detail?id=item.goods[0].id" class="item-pay">再次购买</router-link>
						<router-link v-if="item.score_id" to="/pages/user/pointdetail/index?id=item.goods[0].id" class="item-pay">再次购买</router-link>
					</div>
					<router-link v-if="item.state == 11" to="tui/detail?order_id=item.id" class="item-pay" :data-index="index" :data-id="item.id">待退货</router-link>
					<div v-if="item.state == 12" class="flex-box">
						<router-link to="tui/delivery?order_id=item.id" class="item-pay" :data-index="index" :data-id="item.id">物流信息</router-link>
						<router-link to="tui/detail?order_id=item.id" class="item-pay" :data-index="index" :data-id="item.id">退货中</router-link>
					</div>
					<router-link v-if="item.state == 13" to="tui/detail?order_id=item.id" class="item-pay" :data-index="index" :data-id="item.id">已退款</router-link>
					<div v-if="item.state == 3"  class="flex-box">
						<div class="item-pay" :data-index="index" :data-id="item.id" @click="shipperInfo">物流详情</div>
						<router-link to="evaluate/evaluate?order_id=item.id" class="item-pay">去评价</router-link>
					</div>
					<router-link v-if="item.goods_id && (item.state == 77 || item.state == 78)" to="/pages/product/detail?id=item.goods[0].id" class="item-pay">再次购买</router-link>
					<router-link v-if="item.score_id && (item.state == 77 || item.state == 78)" to="/pages/user/pointdetail/index?id=item.goods[0].id" class="item-pay">再次购买</router-link>
				</div>
				<div class="item last">
					<!-- <div class="shop">官方旗舰店</div> -->
					<div v-for="(goods, index2) in item.goods" :key="index2" class="goods flex-box">
						<router-link to="/pages/product/detail?id=goods.id" class="goods-img">
							<img v-if="goods.thumbnail" :src="goods.thumbnail" mode="widthFix">
							<img v-else src="@/assets/imgicon.png" mode="widthFix">
						</router-link>
						<router-link to="detail?order_id=item.id" class="goods-txt">
							<div class="goods-t">{{goods.title}}</div>
							<div class="goods-attr">
								<span v-for="(attr, index3) in goods.attrs" :key="index3" class="goods-attrv">{{attr.value}}</span>
							</div>
							<div class="goods-n">x {{goods.num}}</div>
						</router-link>
					</div>
				</div>
			</div>
			<div v-if="nomore" class="nomore">我是有底线的</div>
		</div>
		<!-- 未支付订单 -->
		<div v-else-if="state == 1 && unpayList.length">
			<div v-for="(item, index) in unpayList" :key="index" class="order-li">
				<div class="item item1 flex-box">
					<div class="item-t1"><span class="c9">订单编号：</span>{{item.order_sn}}</div>
					<!-- <span class="iconfont icon-time1">{{wxTimer[index].countDown}}</span> -->
				</div>
				<div class="item item1 flex-box">
					<div class="item-t1"><span class="c9">下单时间：</span>{{item.create_time}}</div>
				</div>
				<div class="item item2 flex-box">
					<div class="item-t1">
						<div>
							<span class="c9">状态：</span>
							<span class="state1">待支付</span>
						</div>
						<div v-if="item.goods_id"><span class="c9">总价：</span>￥{{item.total_fee}}</div>
						<div v-if="item.score_id"><span class="c9">总价：</span>{{item.score}}积分</div>
					</div>
					<div class="flex-box">
						<div :data-id="item.id" :data-index="index" class="item-pay" @click="cancelOrder2">取消订单</div>
						<router-link to="detail?order_id=item.id" class="item-pay">去支付</router-link>
					</div>
				</div>
				<div class="item last">
					<!-- <div class="shop">官方旗舰店</div> -->
					<div v-for="(goods, index2) in item.goods" :key="index2" class="goods flex-box">
						<router-link to="/pages/product/detail?id=goods.id" class="goods-img">
							<img v-if="goods.thumbnail" :src="goods.thumbnail" mode="widthFix">
							<img v-else src="@/assets/imgicon.png" mode="widthFix">
						</router-link>
						<router-link to="detail?order_id=item.id" class="goods-txt">
							<div class="goods-t">{{goods.title}}</div>
							<div class="goods-attr">
								<span v-for="(attr, index3) in goods.attrs" :key="index3" class="goods-attrv">{{attr.value}}</span>
							</div>
							<div class="goods-n">x {{goods.num}}</div>
						</router-link>
					</div>
				</div>
			</div>
			<div v-if="nomore" class="nomore">我是有底线的</div>
		</div>
		<!-- 待收货订单 -->
		<!-- 待评价订单 -->
		<!-- 退换货订单 -->
		<div v-else>
			<div class="noData">
				<img class="noData-img" src="@/assets/nodata.png" mode="widthFix">
				<div class="noData-txt">您的订单列表是空的...</div>
			</div>
		</div>
	</div>
</template>

<script>
	import countDown from "@/libs/wxCountDown.js";
	export default {
		name: 'order',
		data(){
			return {
				orderList: [],
				unpayList: [],
				unreceiveList: [],
				unevaluateList: [],
				unreturnList: [],
				page: 1,
				pageSize: 6,
				total: null,
				nomore: !1,
				state: 0,
			}
		},
		watch:{
			'$route'(to, from){
				const type = to.params.type;
				this.state = type == 'unpay' ? 1 : type == 'unreceive' ? 2 : type == 'unevaluate' ? 3 : type == 'unreturn' ? 11 : 0;
				this.GetOrderList(this.page, this.state);
			}
		},
		mounted() {
			this.user_id = 1;
			const type = this.$route.params.type;
			this.state = type == 'unpay' ? 1 : type == 'unreceive' ? 2 : type == 'unevaluate' ? 3 : type == 'unreturn' ? 11 : 0;
			this.GetOrderList(this.page, this.state);
		},
		methods:{
			GetOrderList: function(page,state){
				this.$api.get('Order/index', {user_id: this.user_id,page:page,pageSize:this.pageSize,state:state})
				.then(res=>{
					console.log("GetOrderList", res);
					if(res.orderList.length > 0){
						let orderList = page == 1 ? [] : state == 1 ? this.unpayList : state == 2 ? this.unreceiveList : state ==3 ? this.unevaluateList : state == 11 ? this.unreturnList : this.orderList;
						const orderListx = res.orderList;
						orderList = orderList.concat(orderListx);
						orderList.forEach(ele=>{
							ele.create_time = Tools.formatTime(ele.create_time, '-', ':');
							ele.pay_time = ele.pay_time ? Tools.formatTime(ele.pay_time, '-', ':') : 0;
							ele.total_fee = Tools.Decimal(Number(ele.total_fee));
							if(ele.state == 1){
								ele.countDownNum = Math.floor((24*60*60*1000 - (new Date().getTime() - ele.update_time*1000))/1000);
								// console.log(ele.countDownNum);
							}
						})
						// countDown(this, orderList, 1, this.cb2);
						if(state == 1){
							this.unpayList = orderList;
						}else if(state == 2){
							this.unreceiveList = orderList;
						}else if(state == 3){
							this.unevaluateList = orderList;
						}else if(state == 11){
							this.unreturnList = orderList;
						}else{
							this.orderList = orderList;
						}
						this.page = orderListx.length ? page : page - 1;
						this.nomore = res.count <= this.pageSize * page ? !0 : !1;
						this.total = res.count;
					}else{
						this.nomore = true;
					}
				})
			},
			cb2: function(index){
				const orderList = this.orderList;
				console.log("订单"+orderList[index].id + "：倒计时结束啦");
				// this.$set(this.orderList,index,attrId);
				// this.cancelOrder(index);
			},
			tabOrder(e){
				this.$router.push(e.target.dataset.type);
			},
			cancelOrder2(){},
			shipperInfo(){},
			delOrder(){},
			okReceive(){},
			tuihuo(){},
		}
	}
</script>
<style scoped>



.order-box { position: relative; height: 40px; background: #fff; line-height: 40px; /*justify-content: space-around;*/ }
.order-box:after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 0; border-bottom: 1px solid #f3f3f3; }
.order { position: relative; width: 20%; font-size: 13px; color: #666; text-align: center; }
.order.on { color: #FF0036; }
.order.on:after { content: ""; position: absolute; left: 0; right: 0; bottom: 1px; height: 0; border-bottom: 2px solid #FF0036; }
.icon-order { font-size: 25px; line-height: 1; }


.order-li { margin-top: 10px; background: #fff; font-size: 12px; }
.item { position: relative; padding: 0 5px; justify-content: space-between; align-items: center; }
.item1 { height: 35px; line-height: 35px; }
.item2 { padding: 10px 5px; }
.item:after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 0; border-bottom: 1px solid #f3f3f3; }
.item.last:after { display: none; }


.item-pay { width: 60px; height: 28px;margin-left: 5px; background: #e6264f; border-radius: 3px; color: #fff; font-size: 12px; text-align-last: center; line-height: 28px; text-align: center; }
.icon-delete:before { color: #999; font-size: 20px; }
.icon-time1 { color: #999; font-size: 12px; }
.icon-time1:before { font-size: 20px; vertical-align: middle; }
.state1 { color: #FF0036; }
.state2 { color: #FF9500; }
.state3 { color: #FF9500; }
.state4 { color: green; }
.state5 { color: #ccc; }


.shop { position: relative; padding: 10px; }
/*.shop:after { content: ""; position: absolute; left: 10px; right: 0; bottom: 0; height: 0; border-bottom: 1px solid #f3f3f3; }*/
.goods { padding: 10px 0; }
.goods-img { width: 25%; margin-right: 2%; }
.goods-txt { width: 73%; }
.goods-t { overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:2; color: #333; font-size: 12px; line-height: 1.3; }
.goods-n { color: #999; }
.goods-attr { margin: 3px 0; color: #999; font-size: 12px; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:1; }
.goods-attrv { margin-right: 5px; padding: 2px 5px; background: #eee; border-radius: 2px; }
</style>