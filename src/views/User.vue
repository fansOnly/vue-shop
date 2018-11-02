<template>
	<div class="page__bd">
		<div class="user-x">
			<div class="user-top">
					<span v-if="iswxLogin" class="iconfont icon-tip" @click="openRules"></span>
					
					<div v-if="iswxLogin" class="user-head flex-box">
						<div class="user_avatar">
							<img class="avatar" :src="user.avatar" mode="widthFix">
						</div>
						<div class="user_info">
							<div class="user_name">{{user.name}}</div>
							<div class="div_tip"><span class="iconfont icon-level icon-v1"></span>{{user.title}}</div>
							<div class="div_tip">成长值：{{user.growth}}</div>
							<!-- <div class="div_tip">注册时间：{{user.create_time}}</div> -->
						</div>
					</div>
				<div v-else>
					<button v-if="canIUse" class="wxlogin"><span class="iconfont icon-wechat"></span>微信登录</button>
					<div v-else class="wxlogin">请升级微信版本</div>
				</div>
			</div>
		</div>

		<div v-if="iswxLogin">
			<div class="user-box order-box flex-box">
				<router-link to="/pages/order/index?state=1" class="order" hover-class="none"><span v-if="count.unpay" class="count">{{count.unpay}}</span><span class="iconfont icon-order1 icon-order"></span>
					<div>待支付</div>
				</router-link>
				<router-link to="/pages/order/index?state=2" class="order" hover-class="none"><span v-if="count.unreceive" class="count">{{count.unreceive}}</span><span class="iconfont icon-order5 icon-order"></span>
					<div>待收货</div>
				</router-link>
				<router-link to="/pages/order/index?state=3" class="order" hover-class="none"><span v-if="count.unevaluate" class="count">{{count.unevaluate}}</span><span class="iconfont icon-order3 icon-order"></span>
					<div>待评价</div>
				</router-link>
				<router-link to="/pages/order/index?state=0" class="order" hover-class="none"><span class="iconfont icon-order0 icon-order"></span>
					<div>全部订单</div>
				</router-link>
			</div>

			<div class="user-box quan-box flex-box">
				<router-link to="charge/index" class="quan" hover-class="none">
					<div class="pe1">{{count.wallet}}</div>钱包
				</router-link>
				<router-link to="score/index" class="quan" hover-class="none">
					<div class="pe1">{{count.score}}</div>积分
				</router-link>
				<router-link to="coupon/index" class="quan" hover-class="none">
					<div class="pe1">{{count.coupon}}</div>优惠券
				</router-link>
				<router-link to="fav/index" class="quan" hover-class="none">
					<div class="pe1">{{count.fav}}</div>收藏
				</router-link>
			</div>

			<div class="user-box acts-box">
				<router-link to="userInfo/index" class="acts" hover-class="none">
					<div class="acts-item"><span class="iconfont icon-user icon-acts"></span><span class="acts-t">个人信息</span></div>
					<div class="acts-item"><span class="arrow"></span></div>
				</router-link>
				<router-link to="address/index" class="acts" hover-class="none">
					<div class="acts-item"><span class="iconfont icon-address2 icon-acts"></span><span class="acts-t">地址管理</span></div>
					<div class="acts-item"><span class="arrow"></span></div>
				</router-link>
				<router-link to="charge/index" class="acts" hover-class="none">
					<div class="acts-item"><span class="iconfont icon-charge icon-acts"></span><span class="acts-t">充值中心</span></div>
					<div class="acts-item"><span class="arrow"></span></div>
				</router-link>
			</div>

		</div>
		<!-- 未登录 -->
		<div v-else>
			<div class="user-box order-box flex-box">
				<div class="order" @click="noLogin"><span v-if="count.order1" class="count"></span><span class="iconfont icon-order1 icon-order"></span>
					<div>待支付</div>
				</div>
				<div class="order" @click="noLogin"><span v-if="count.order2" class="count"></span><span class="iconfont icon-order5 icon-order"></span>
					<div>待收货</div>
				</div>
				<div class="order" @click="noLogin"><span v-if="count.order3" class="count"></span><span class="iconfont icon-order3 icon-order"></span>
					<div>待评价</div>
				</div>
				<div class="order" @click="noLogin"><span class="iconfont icon-order0 icon-order"></span>
					<div>全部订单</div>
				</div>
			</div>

			<div class="user-box quan-box flex-box">
				<div class="quan" @click="noLogin">
					<div class="pe1">0</div>钱包
				</div>
				<div class="quan" @click="noLogin">
					<div class="pe1">0</div>积分
				</div>
				<div class="quan" @click="noLogin">
					<div class="pe1">0</div>优惠券
				</div>
				<div class="quan" @click="noLogin">
					<div class="pe1">0</div>收藏
				</div>
			</div>


			<div class="user-box acts-box">
				<div class="acts" @click="noLogin">
					<div class="acts-item"><span class="iconfont icon-user icon-acts"></span><span class="acts-t">个人信息</span></div>
					<div class="acts-item"><span class="arrow"></span></div>
				</div>
				<div class="acts" @click="noLogin">
					<div class="acts-item"><span class="iconfont icon-address2 icon-acts"></span><span class="acts-t">地址管理</span></div>
					<div class="acts-item"><span class="arrow"></span></div>
				</div>
				<div class="acts" @click="noLogin">
					<div class="acts-item"><span class="iconfont icon-charge icon-acts"></span><span class="acts-t">充值中心</span></div>
					<div class="acts-item"><span class="arrow"></span></div>
				</div>
			</div>
		</div>


		<div class="user-box acts-box">
			<router-link to="feedback/index" class="acts nobtn">
				<div class="acts-item"><span class="iconfont icon-setting icon-acts"></span><span class="acts-t">授权设置</span></div>
				<div class="acts-item"><span class="arrow"></span></div>
			</router-link>
			<router-link to="feedback/index" class="acts" hover-class="none">
				<div class="acts-item"><span class="iconfont icon-feedback icon-acts"></span><span class="acts-t">意见反馈</span></div>
				<div class="acts-item"><span class="arrow"></span></div>
			</router-link>
			<router-link to="help/index" class="acts" hover-class="none">
				<div class="acts-item"><span class="iconfont icon-help icon-acts"></span><span class="acts-t">帮助文档</span></div>
				<div class="acts-item"><span class="arrow"></span></div>
			</router-link>
			<div class="acts" @click="makePhoneCall">
				<div class="acts-item"><span class="iconfont icon-tel icon-acts"></span><span class="acts-t">联系我们</span></div>
				<div class="acts-item"><span class="phone">{{phone}}</span><span class="arrowx"></span></div>
			</div>
			<div class="acts" @click="checkUpdate">
				<div class="acts-item"><span class="iconfont icon-version icon-acts"></span><span class="acts-t">版本更新</span></div>
				<div class="acts-item"><span v-if="newVersion" class="dots"></span></div>
			</div>
		</div>

		<Footer></Footer>
	</div>
</template>

<script>
	import Footer from '../components/Footer'
	export default {
		name: 'User',
		components: {
			Footer
		},
		data() {
			return {
				iswxLogin: true,
				canIUse: true,
				user: {},
				count: {},
				phone: null,
				checkUpdate: true,
				newVersion: true
			}
		},
		mounted() {
			this.user_id = 1;
			this.GetUserInfo();
		},
		methods: {
			async GetUserInfo(){
				this.$api.get('User/GetUserInfo', {user_id: this.user_id})
				.then(res=>{
					console.log("GetUserInfo", res);
					this.user = res.user;
				})
				await this.GetNumList();
			},
			GetNumList(){
				this.$api.get('User/GetNumList', {user_id: this.user_id})
				.then(res=>{
					console.log("GetNumList", res);
					this.count = res.count;
				})
			},
			noLogin(){
			},
			makePhoneCall(){
			},
			openRules(){}
		}
	}
</script>
<style scoped>
.user-x { background: #fff; padding: 5px; }
.user-top { position: relative; height: 100px; padding-top: 13px; background: linear-gradient(180deg, #f16c7c, #d83246); border-radius: 3px; overflow: hidden; box-shadow: 0 0 10px rgba(241,107,123,.2); }
.user_bg { position: absolute; left: 0; top: 0; right: 0; z-index: -1; }
.user-head { padding: 0 3%; align-items: center; justify-content: center; }
.user_avatar { margin-right: 5%; /*transform: translateY(20px);*/ text-align: center; }
.avatar { width: 70px; height: 70px; border: 2px solid #fff; box-shadow: 0 0 10px rgba(0,0,0,.2); border-radius: 100%; overflow: hidden; }

.user_info {  }
.user_name { color: #fff; font-size: 14px; }
.div_tip { color: #fff; font-size: 12px;}
.view_level { color: #fff; }
.icon-level { margin-right: 5px; }
.icon-level:before { font-size: 25px; }
.icon-level0:before { color: #bfbfbf; }
.icon-level1:before { color: #fff; }
.icon-level2:before { color: gold; }
.icon-level3:before { color: #8B8CBB; }
.icon-level4:before { color: #FFC516; }

.view_tip { font-size: 12px; color: #fff; }

.icon-tip { position: absolute; right: 3%; top: 10%; }
.icon-tip:before { color: #fff; font-size: 25px; }

.wxlogin { width: 74px; height: 74px; margin: 0 auto; padding: 0; background: #fff; border-radius: 100%; color: #51C332; font-size: 13px; line-height: 1; }
.icon-wechat { display: block; font-size: 35px; margin-top: 12px; line-height: 1; color: #51C332; }



.user-box { position: relative; margin-bottom: 10px; padding: 10px 0; background: #fff; }
.user-box:before { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 0; border-top: 1px solid #eee; }
.user-box:after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 0; border-bottom: 1px solid #eee; }

.order-box { /*justify-content: space-around;*/ }
.order { position: relative; width: 25%; font-size: 12px; color: #666; text-align: center; }
.icon-order:before { font-size: 30px; color: #666; line-height: 1; }
.count { position: absolute; top: 0px; right: 18px; width: 15px; height: 15px; background: #FF495F; border-radius: 100%; color: #fff; font-size: 10px; text-align: center; line-height: 15px; overflow: hidden; }

.quan-box { justify-content: space-around; }
.quan { width: 25%; font-size: 12px; color: #666; text-align: center; }
.pe1 { color: #FF0036; font-size: 14px; font-weight: 600; }

.acts-box { padding: 0; }
.acts { position: relative; padding: 5px 0 5px 10px; color: #333; font-size: 12px; display: -webkit-flex; display: flex; align-items: center; justify-content: space-between; }
.acts { display: -webkit-flex; display: flex; align-items: center; }
.acts:after { content: ""; position: absolute; left: 13px; right: 0; bottom: 0; height: 0; border-bottom: 1px solid #eee; }
.nobtn:after { content: ""; position: absolute; left: 13px; top: auto; right: 0; bottom: 0; height: 0; border-bottom: 1px solid #eee; display: block!important; }
.nobtn { text-align: left; }
.last:after { border: 0; }
.icon-acts { display: inline-block; /*margin-right: 5px;*/ color: #666; font-size: 30px; line-height: 1; vertical-align: middle; }
.arrowx { padding-right: 10px; }
.phone { color: #999; }



.mask { position: fixed; left: 0; right: 0; top: 0; bottom: 0; background: rgba(0,0,0,.6); z-index: 8; }
.rules { position: fixed; left: 10%; right: 10%; top: 15%; bottom: 15%; padding: 0 15px; background: #fff; border-radius: 5px; z-index: 9; }
.rules-t { height: 40px; color: #000; font-size: 14px; text-align: center; line-height: 40px; }
.rules-c { height: calc(100% - 85px); overflow-y: scroll; color: #999; }
.rules-btn { position: absolute; left: 0; right: 0; bottom: 0; height: 40px; color: #FF0036; text-align: center; line-height: 40px; }
.rules-btn:before { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 0; border-bottom: 1px solid #ddd; }
</style>