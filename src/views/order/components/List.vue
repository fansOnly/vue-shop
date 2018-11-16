<template>
	<div>
		<div v-for="(item, index) in orderList" :key="index" class="order-li">
			<div class="item item1 flex-box">
				<div class="item-t1"><span class="c9">订单编号：</span>{{item.order_sn}}</div>
				<span v-if="item.state == 1" class="iconfont icon-time1">{{item.countDownNum}}</span>
				<span v-if="item.state == 4 || item.state == 77 || item.state == 78 || item.state == 13" class="iconfont icon-delete" @click="delOrder(index)"></span>
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
					<div v-if="item.score_id"><span class="c9">总价：</span>{{item.total_fee}}积分</div>
				</div>
				<div v-if="item.state == 1" class="flex-box">
					<div class="item-pay" @click="cancelOrder2(index)">取消订单</div>
					<router-link :to="{name:'OrderDetail', params:{id: item.id}}" class="item-pay">去支付</router-link>
				</div>
				<div v-if="item.state == 2" class="flex-box">
					<router-link class="item-pay" :to="{name:'Dilivery',params:{order_id:item.id}}">物流详情</router-link>
					<div v-if="item.goods_id" class="item-pay" @click="tuihuo(index)">申请退货</div>
					<div v-if="item.goods_id" class="item-pay" @click="okReceive(index)">确认收货</div>
					<div v-if="item.score_id" class="item-pay" @click="okReceive2(index)">确认收货</div>
				</div>
				<div v-if="item.state == 4" class="flex-box">
					<router-link class="item-pay" :to="{name:'Dilivery',params:{order_id:item.id}}">物流详情</router-link>
					<router-link :to="{name:'Evaluation', params:{order_id:item.id}}" class="item-pay">查看评价</router-link>
					<router-link v-if="item.goods_id" :to="{name:'ProductDetail', params:{id:item.goods[0].id}}" class="item-pay">再次购买</router-link>
					<router-link v-if="item.score_id" :to="{name:'ScoreDetail', params:{id:item.score_id}}" class="item-pay">再次购买</router-link>
				</div>
				<router-link v-if="item.state == 11" :to="{name:'ReturnSubmit', params:{order_id:item.id}}" class="item-pay">待退货</router-link>
				<div v-if="item.state == 12" class="flex-box">
					<router-link :to="{name:'ReturnDilivery',params:{order_id:item.id}}" class="item-pay">退货物流</router-link>
					<router-link :to="{name:'ReturnDetail',params:{order_id:item.id}}" class="item-pay">退货中</router-link>
				</div>
				<router-link v-if="item.state == 13" :to="{name:'ReturnDetail',params:{order_id:item.id}}" class="item-pay">已退款</router-link>
				<div v-if="item.state == 3" class="flex-box">
					<router-link class="item-pay" :to="{name:'Dilivery',params:{order_id:item.id}}">物流详情</router-link>
					<router-link :to="{name:'Evaluate', params:{order_id:item.id}}" class="item-pay">去评价</router-link>
				</div>
				<router-link v-if="item.goods_id && (item.state == 77 || item.state == 78)" :to="{name:'ProductDetail', params:{id:item.goods[0].id}}"
					class="item-pay">再次购买</router-link>
				<router-link v-if="item.score_id && (item.state == 77 || item.state == 78)" :to="{name:'ScoreDetail', params:{id:item.score_id}}" class="item-pay">再次购买</router-link>
			</div>
			<div class="item last">
				<!-- <div class="shop">官方旗舰店</div> -->
				<div v-for="(goods, index2) in item.goods" :key="index2" class="goods flex-box">
					<router-link :to="{name:'ProductDetail', params:{id:goods.id}}" class="goods-img">
						<img v-if="goods.thumbnail" :src="goods.thumbnail">
						<img v-else src="@/assets/imgicon.png">
					</router-link>
					<router-link :to="{name:'OrderDetail', params:{id:item.id}}" class="goods-txt">
						<div class="goods-t">{{goods.title}}</div>
						<div class="goods-attr">
							<span v-for="(attr, index3) in goods.attrs" :key="index3" class="goods-attrv">{{attr.value}}</span>
						</div>
						<div class="goods-n">x {{goods.num}}</div>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'OrderList',
		props: {
			orderList: Array
		},
		methods:{
			delOrder(index){
				this.$emit('delOrder', index);
			},
			cancelOrder2(index){
				this.$emit('cancelOrder2', index);
			},
			tuihuo(index){
				this.$emit('tuihuo', index);
			},
			okReceive(index){
				this.$emit('okReceive', index);
			},
			okReceive2(index){
				this.$emit('okReceive2', index);
			},
		}
	}
</script>
<style scoped>
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