<template>
	<div>
		<div v-for="(item, index) in couponList" :key="" :class="['coupon-li', item.status == -1 ? 'expired' : item.status == 2 ? 'used' : 'unused']">
			<div class="coupon-item flex-box">
				<div :class="['coupon-price', item.status == -1 ? 'expired' : item.status == 2 ? 'used' : 'unused']">
					<div class="coupon-t1">￥<span class="sp1">{{item.jian}}</span></div>
					<div class="coupon-t2">满{{item.man}}元可用</div>
				</div>
				<div class="coupon-desc">
					<div class="coupon-p1">{{item.title}}</div>
					<div class="coupon-p2">{{item.isAll ? '全品类通用券' : '部分商品可用'}}</div>
					<div v-if="item.endless == 0" class="coupon-p3">{{item.use_start}}-{{item.use_end}}</div>
					<div v-else class="coupon-p3">无限期</div>
				</div>
				<div v-if="canIGet" class="coupon-select" @click="getTicket(index)">领取</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'coupon',
		props: {
			couponList:{
				type: Array,
				default: []
			},
			canIGet: {
				type: Boolean,
				default: false
			}
		},
		methods:{
			getTicket(index){
				this.$emit('GetTicket', index);
			}
		}
	}
</script>
<style scoped>
.coupon-li { position: relative; margin-bottom: 10px; border-top-width: 4px; border-top-style: solid; border-radius: 3px; box-shadow: 0 1px 10px rgba(0,0,0,.1); overflow: hidden; font-size: 12px; }
.coupon-li.unused { border-top-color: #4ad8da; }
.coupon-li.expired { border-top-color: #ccc; }
.coupon-li.used { border-top-color: green; }
.coupon-li:after { content: ""; position: absolute; left: 34%; top: 0; bottom: 0; width: 0; border-left: 1px dashed #e5e5e5; }

.coupon-item { height: 90px; align-items: center; }
.coupon-price { width: 35%; text-align: center; }
.coupon-price.unused { color: #4ad8da; }
.coupon-price.expired { color: #ccc; }
.coupon-price.used { color: green; }
.sp1 { display: inline-block; font-size: 30px; line-height: 1; font-family: 'impact'; vertical-align: top; }
.coupon-t2 { margin-top: 5px; }
.coupon-desc { width: 50%; padding-left: 5%; }
.coupon-select { width: 15%; text-align: center; }
.coupon-p1 { font-size: 12px; }
.coupon-p2 { font-size: 12px; color: #bbb; }
.coupon-p3 { font-size: 12px; color: #ccc; }
</style>