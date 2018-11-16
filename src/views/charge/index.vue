<template>
	<div>
		<div class="charge_container">
			<div class="charge_title">
				<div>充值中心</div>
				<router-link style="color: #ff495f;" :to="{name:'ChargeRecord'}">充值记录</router-link>
			</div>
			<div class="charge-area">
				<div :class="['charge-item', {selected: selected === item.vip}]" v-for="(item, index) in vipLevel"
					@click="chargeItem(index)" :key="index">
					<div class="ft24">{{ item.money }}</div>
					<div class="subtitle">{{ item.title }}</div>
				</div>
				<div :class="['charge-item', {selected:selected === 0}]" @click="otherMoney">
					<div class="ft18">其他金额</div>
				</div>
			</div>
			<div class="span-input">
				<span>充值金额</span>
				<input class="money-input" placeholder="请输入充值金额" v-model="chargeMoney" :disabled="disabled" />元
			</div>
		</div>
		<div class="viptip">
			<div class="rules-t">会员权益</div>
			<div class="rules-c">
				<div v-html="charge_tip"></div>
			</div>
		</div>
		<div class="confirm-btn" @click="chargePay">充值</div>

		<!-- 充值弹窗 -->
		<div v-if="mask" class="success">
			<img class="suc-t0" src="@/assets/suc.png">
			<div class="suc-t1">充值金额： {{chargeMoney}}元</div>
			<div v-if="firstVip">
				<div class="suc-t2">恭喜您，您已成为我们的终身会员!</div>
				<div class="suc-t3">价值1000元的优惠券已经发送到您的账户，请及时查看!</div>
			</div>
			<div v-else>
				<div class="suc-t2">恭喜您，充值成功!</div>
			</div>
			<div class="suc-t4" @click="closeSuc">我知道了</div>
		</div>
		<div v-if="mask" class="mask"></div>
	</div>
</template>

<script>
	export default {
		name: 'Charge',
		data() {
			return {
				vipLevel: [
					{title: "终身会员", vip: 1, score: 10000, money: "10000", discount: "9"}
				],
				chargeMoney: 0,
				selected: null,
				disabled: false,
				focus: !1,
				charge_tip: '',
				mask: !1,
				firstVip: !0
			}
		},
		mounted() {
			this.GetChargeTip();
		},
		methods: {
			GetChargeTip: function(){
				this.$api.get('Setting/GetChargeTip', {})
				.then(res=>{
					// console.log("GetChargeTip", res);
					this.charge_tip = res.charge_tip;
				})
			},
			chargePay() {
				const total_fee = this.chargeMoney;
				if (total_fee === '') {
					return;
				}
			},
			chargeItem(index) {
				const item = this.vipLevel[index];
				this.chargeMoney = item.money;
				this.selected = item.vip;
				this.disabled = true;
				this.focus = false;
			},
			otherMoney() {
				this.chargeMoney = '';
				this.selected = 0;
				this.disabled = false;
				this.focus = true;
			},
		}
	}
</script>
<style scoped>
.charge_container {
	position: relative;
	padding: 10px;
	background: #fff;
}

.charge_title {
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid #eee;
	line-height: 40px;
}

.charge-area {
	padding: 10px 0;
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
}

.charge-item {
	width: 31%;
	height: 60px;
	margin: 1%;
	flex-shrink: 0;
	border: 1px solid #e5e5e5;
	padding: 0 15px;
	text-align: center;
	box-sizing: border-box;
	border-radius: 3px;
	/*font-size: 24px;*/
}

.charge-item.selected {
	border-color: #ff495f;
}

.subtitle {
	font-size: 12px;
	color: #999;
}

.text-input {
	display: -webkit-flex;
	display: flex;
	align-items: center;
	margin-top: 10px;
}

.confirm-btn {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 45px;
	background: #18BC9C;
	line-height: 45px;
	text-align: center;
	color: #fff;
}

.ft24 { margin-top: 11px; font-size: 20px; line-height: 1; }
.ft18 { font-size: 15px; line-height: 58px; color: #999; }

.viptip { margin-top: 5px; padding: 10px; background: #fff; }
.rules-t { color: #ff495f; font-size: 15px; line-height: 2.5; }
.rules-c { color: #999; }
.money-input { margin: 0 5px 0 15px; padding-left: 8px; background: #f5f5f5; border: 0; }

.success { position: fixed; left: 15%; right: 15%; top: 50%; padding: 5%; background: #fff; border-radius: 5px; box-shadow: 0 0 5px rgba(0,0,0,.1); z-index: 67; transform: translateY(-60%); }
.suc-t0 { display: block; width: 91px; margin: 0 auto 10px; transform: translateX(-5px); }
.suc-t2 { color: #ff495f; font-size: 14px; text-align: center; text-align: center; }
.suc-t1 { font-size: 12px; color: #999; text-align: center; }
.suc-t3 { font-size: 12px; color: #333; text-align: center; }
.suc-t4 { width: 50%; height: 33px; margin: 10px auto 0; background: #18BC9C; border-radius: 3px; color: #fff; font-size: 14px; text-align: center; line-height: 33px; }
</style>
