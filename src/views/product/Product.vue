<template>
	<div>
		<div class="page__bd">
			<div class="topBar">
				<div class="topBar-ul flex-box">
					<div :class="['topBar-li', {on: tabIndex == 1}]" data-index="1" @click="tabbar">商品描述</div>
					<div :class="['topBar-li', {on: tabIndex == 2}]" data-index="2" @click="tabbar">规格参数</div>
					<div :class="['topBar-li', {on: tabIndex == 3}]" data-index="3" @click="tabbar">包装售后</div>
					<div :class="['topBar-li', {on: tabIndex == 4}]" data-index="4" @click="tabbar">全部评价</div>
				</div>
			</div>
			<div class="pageItem" v-if="tabIndex == 1">
				<Photos :something="product"></Photos>
				<div class="section section1 flex-box">
					<div class="title1">
						<div class="title">{{product.title}}</div>
						<div class="subt">{{product.subtitle}}</div>
						<div v-if="mprice > 0" class="price">￥<span class="pe1">{{mprice}}</span><span class="pe2">￥{{price}}</span></div>
						<div v-else class="price">￥<span class="pe1">{{price}}</span></div>
					</div>
					<button class="share1" open-type="share"><span class="iconfont icon-share"></span>分享</button>
				</div>
				<div class="section section2 flex-box">
					<div class="str2 c3"><span class="iconfont icon-05 icon-pro gray"></span>热度：{{product.views}}</div>
					<!-- <div class="str2 c3"><span class="iconfont icon-05 icon-pro gray"></span>收藏：{{product.favs}}</div> -->
					<div class="str2 c3"><span class="iconfont icon-06 icon-pro gray"></span>月销：{{product.sales}}</div>
					<div class="str2 c3"><span class="iconfont icon-07 icon-pro gray"></span>库存：{{product.lave}}</div>
				</div>
				<div class="section section3 flex-box">
					<div class="str3 c3"><span class="iconfont icon-03 icon-pro color"></span>正品保证</div>
					<div class="str3 c3"><span class="iconfont icon-01 icon-pro color"></span>质量保证</div>
					<div class="str3 c3"><span class="iconfont icon-04 icon-pro color"></span>极速退款</div>
					<div class="str3 c3"><span class="iconfont icon-wepay2 icon-pro color"></span>微信支付</div>
				</div>

				<div class="section section5 flex-box" @click="openAttr('coupon')">
						<div class="flex-box" style="align-items:center;">领取优惠券<span class="iconfont icon-coupon"></span></div>
						<div class="arrowx"></div>
					</div>


				<div class="section section5 flex-box" @click="openAttr('attr')">
					<div class="">选择产品参数</div>
					<div class="arrowx"></div>
				</div>
				<div class="section section6 flex-box">
					<div class="">商品描述</div>
				</div>
				<div class="detailx detimg ">
					<div v-html="product.content"></div>
				</div>
			</div>

			<div class="pageItem" v-if="tabIndex == 2">
				<div class="detailx detimg ">
						<div v-html="product.content1"></div>
				</div>
			</div>
			<div class="pageItem" v-if="tabIndex == 3">
				<div class="detailx detimg ">
						<div v-html="product.content2"></div>
				</div>
			</div>
			<div class="pageItem" v-if="tabIndex == 4">
				<div v-if="evaluateList.length" class="detailx ">
					<div class="eval-statics flex-box">
						<div class="eval-count">好评率<br />{{evaluateCountList.avg ? evaluateCountList.avg : '100%'}}</div>
						<div class="eval-count">好评<br />{{evaluateCountList.good ? evaluateCountList.good : 0}}</div>
						<div class="eval-count">中评<br />{{evaluateCountList.mid ? evaluateCountList.mid : 0}}</div>
						<div class="eval-count">差评<br />{{evaluateCountList.bad ? evaluateCountList.bad : 0}}</div>
						<div class="eval-count">晒单<br />{{evaluateCountList.pic ? evaluateCountList.pic :0}}</div>
					</div>
					<div v-for="(item, index) in evaluateList" :key="index" class="eval-ul">
						<div class="eval-item1 flex-box">
							<img class="eval-avatar" :src="item.uavatar">
							<div class="eval-name">
								<div class="eval-t1 flex-box">
									<div>{{item.uname}}</div>
									<div class="eval-t3 xstar-box flex-box">
										<span :class="['xstar', {on:item.rate1 >= 1}]">★</span>
										<span :class="['xstar', {on:item.rate1 >= 2}]">★</span>
										<span :class="['xstar', {on:item.rate1 >= 3}]">★</span>
										<span :class="['xstar', {on:item.rate1 >= 4}]">★</span>
										<span :class="['xstar', {on:item.rate1 >= 5}]">★</span>
									</div>
								</div>
								<div class="eval-t2">发布于{{item.create_time}}</div>
							</div>
						</div>
						<div class="eval-item2">{{item.content}}</div>
						<div v-if="item.more.length" class="eval-item3">
							<img v-for="(img, index2) in item.more" :key="index2" class="eval-img" :src="img.pic" @click="showGallery" :data-current="index2">
						</div>
						<div v-if="item.reply" class="eval-item4">
							<div class="eval-item4-t flex-box">
								<div class="eval-item4-t1">客服回复：</div>
								<div class="eval-item4-t2">{{item.reply_time}}</div>
							</div>
							<div class="eval-item4-c">{{item.reply}}</div>
						</div>
					</div>
					<router-link to="" class="eval-link">查看更多</router-link>
				</div>
				<NoData v-else title="评价列表"></NoData>
			</div>

			<div class="buttons flex-box">
				<router-link to="/" class="ico-btn" ><span class="iconfont icon-shop"></span>
					<div>首页</div>
				</router-link>
				<div class="ico-btn" @click="SetUserFav"><span :class="['iconfont', isfav ? 'icon-fav1' : 'icon-fav']"></span>
					<div>收藏</div>
				</div>
				<router-link class="ico-btn" :to="{name:'cart'}"><span class="iconfont icon-cart2"></span>
					<div>购物车</div><span class="cart-num">{{cartLength}}</span>
				</router-link>
				<div class="cart-btn cart-btn1" @click="openAttr('attr')">加入购物车</div>
				<div class="buy-btn buy-btn1" @click="openAttr('attr')">立即购买</div>
			</div>

			<span v-if="showTop" class="iconfont icon-top" @click="backTop"></span>
		</div>


		<!-- 属性选择box -->
		<div :class="['mask', {maskon:mask}]" @click="closeAttr" v-if="mask"></div>
		<div :class="['attr-box', {move: maskType == 'attr'}]" >
			<div class="attr_bd">
				<div class="attrx flex-box">
					<span class="iconfont icon-08" @click="closeAttr"></span>
					<img v-if="thumbnail" class="attr-A-img" :src="thumbnail">
					<img v-else class="attr-A-img" src="@/assets/imgicon.png">
					<div class="attr-A-tit">
						<div v-if="mprice > 0" class="attr-A-t1">￥<span class="pe1">{{mprice}}</span><span class="pe2">￥{{price}}</span></div>
						<div v-else class="attr-A-t1">￥<span class="pe1">{{price}}</span></div>
						<div class="attr-A-t2">月销：{{product.sales}} 库存：{{product.stock}}</div>
						<div v-if="selectAttrValues.length" class="attr-A-t3">选择
							<span v-for="(attr, index) in selectAttrValues" :key="index" class="attr-A-t4">{{attr}}</span>
						</div>
						<div v-else class="attr-A-t3">选择
							<span v-for="(name, index) in selectAttrNames" :key="index" class="attr-A-t4">{{name}}</span>
						</div>
					</div>
				</div>
				<div v-if="product.attrs.length" class="attrx attr-val">
					<div v-for="(item, index) in product.attrs" :key="index">
						<div class="attr-name">{{item.attr_name}}</div>
						<div class="attrs flex-box">
							<span v-for="(value, index2) in item.values" :key="index2" :data-index="index" :data-index2="index2" :data-attrid="item.attr_id" :data-id="value" :class="['attr-value', attrIds[index] == value ? 'on' : '']" @click="selectValue">{{item.names[index2]}}</span>
						</div>
					</div>
				</div>
				<div class="attrx flex-box attr-total">
					<div class="attr-name">购买数量</div>
					<div class="attr-num">
						<span v-if="buyNum <= 1" class="minus disabled">-</span>
						<span v-else class="minus" @click="minusNum">-</span>
						<input class="num-input" type="number" name="buyNum" maxlength="4" v-model="buyNum" v-on:input="okNum" disabled />
						<span v-if="buyNum >= product.lave" class="plus disabled">+</span>
						<span v-else class="plus" @click="plusNum">+</span>
					</div>
				</div>
			</div>
			<div class="buttonx flex-box">
				<div class="cart-btn" @click="addCart">加入购物车</div>
				<div class="buy-btn" @click="buyNow">立即购买</div>
			</div>
		</div>

		<!-- 优惠券选择box -->
		<div :class="['coupon-box', {move: maskType == 'coupon'}]" >
			<div class="coupon-t">当前可用优惠券</div>
			<span class="iconfont icon-08 icon08x" @click="closeAttr"></span>
			<div v-if="couponsList.length" class="coupon-height">
				<div v-for="(item, index) in couponsList" :key="index" :class="['coupons sawtooth flex-box ', item.status == 0 ? 'status0' : item.status == 1 ? 'status1' : 'statusx']"
				 :data-index="index" :data-id="item.id" @click="getCoupon">
					<div class="coupon-item">
						<div class="coupon-item1 flex-box">
							<div class="coupon-t1">{{item.title}}</div>
							<div :class="['coupon-cr1', item.status == 0 ? 'status0' : item.status == 1 ? 'status1' : 'statusx']">有效期</div>
						</div>
						<div class="coupon-item1 flex-box">
							<div class="">￥<span class="coupon-ft1">{{item.jian}}</span></div>
							<div :class="['coupon-cr1', item.status == 0 ? 'status0' : item.status == 1 ? 'status1' : 'statusx']">{{item.use_start}}</div>
						</div>
						<div class="coupon-item1 flex-box">
							<div :class="['coupon-cr1', item.status == 0 ? 'status0' : item.status == 1 ? 'status1' : 'statusx']">满{{item.man}}使用</div>
							<div :class="['coupon-cr1', item.status == 0 ? 'status0' : item.status == 1 ? 'status1' : 'statusx']">{{item.use_end}}</div>
						</div>
					</div>
					<div class="coupon-state ">
						<!-- <div v-if="{{item.status == 0}}" class="coupon-state1">待领取<div class="">剩余{{item.lave}}</div></div>
						<div wx:elif="{{item.status == 1}}" class="coupon-state1">已领取</div>
						<div v-else class="coupon-state1">已抢光</div> -->
						<span v-if="item.status == 0" class="iconfont icon-coupon05 couponIcon"></span>
						<span v-else-if="item.status == 1" class="iconfont icon-coupon03 couponIcon"></span>
						<span v-else class="iconfont icon-coupon04 couponIcon"></span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Photos from '@/views/product/Photos'
	import NoData from '@/components/NoData'
	export default {
		name: 'Product',
		components: {
			Photos,
			NoData
		},
		data() {
			return {
				bannerHeight: window.screen.width,
				autoplay: false,
				bannerIndex: 1,
				id: null,
				product: {
					attrs: []
				},
				price: null,
				mprice: null,
				prices: [],
				thumbnail: '',
				couponsList: [],
				tabIndex: 1,
				attrIds: [], //  选择的属性
				buyNum: 1, // 购买数量
				animationData: {},
				mask: false,
				maskType: '', //  attr/coupon
				showTop: !1,
				isfav: !1,
				selectAttrValues: [],
				selectAttrNames: [],
				evaluateList: [],
				evaluateCountList: {},
				cartLength: 0,
				contentImgs1: [],
				contentImgs2: [],
				contentImgs3: [],
			}
		},
		mounted() {
			this.goods_id = this.$route.params.id;
			this.user_id = 1;
			window.addEventListener('scroll', Tools.throttle(this.handleScroll));
			this.GetGoodsDetail();
		},
		methods: {
			async GetGoodsDetail() {
				await this.$api.get('Goods/GetGoodsDetail', {id: this.goods_id, user_id:this.user_id})
				.then(res => {
					console.log("GetGoodsDetail", res);
					let product = res.product;
					// product.content = product.content.replace(/&emsp;/gi, "");
					// product.content = product.content.replace(/<img/gi, "<img style='max-width:100%;height:auto;' ");
					// product.content1 = product.content1.replace(/&emsp;/gi, "");
					// product.content1 = product.content1.replace(/<img/gi, "<img style='max-width:100%;height:auto;' ");
					// product.content2 = product.content2.replace(/&emsp;/gi, "");
					// product.content2 = product.content2.replace(/<img/gi, "<img style='max-width:100%;height:auto;' ");

					let attrs = product.attrs;
					let selectAttrNames = [];
					attrs.forEach(ele => {
						selectAttrNames.push(ele.attr_name);
					})
					this.product = product;
					this.price = product.price;
					this.mprice = product.mprice;
					this.thumbnail = product.thumbnail;
					this.isfav = product.isfav;
					this.selectAttrNames = selectAttrNames;
					this.attrIds = new Array(attrs.length);
				})
				await this.GetGoodsEvaluateList();
				await this.GetAllCouponListByCategoryId();
			},
			GetGoodsEvaluateList: function() {
				this.$api.get('Evaluate/GetGoodsEvaluateList', {goods_id: this.goods_id, num: 3})
				.then(res => {
					console.log("GetGoodsEvaluateList", res);
					let evaluateList = res.evaluateList;
					evaluateList.length && evaluateList.map(item => item.create_time = Tools.formatTime(item.create_time, '.', ':'));
					evaluateList.map(item => item.reply_time = Tools.formatTime(item.reply_time, '.', ':'));
					this.evaluateList = evaluateList;
					this.evaluateCountList = res.evaluateCountList;
				})
			},
			GetAllCouponListByCategoryId: function() {
				this.$api.get('coupon/GetAllCouponListByCategoryId', {user_id: this.user_id, category_id:this.product.category_id})
				.then(res => {
					console.log("GetAllCouponListByCategoryId", res);
					let couponsList = res.couponsList;
					couponsList.length && couponsList.forEach(ele => {
						ele.use_start = Tools.formatTime(ele.use_start, '.', ':');
						ele.use_end = Tools.formatTime(ele.use_end - 1, '.', ':');
					})
					this.couponsList = couponsList;
				})
			},
			SetUserFav(){
				const state = this.isfav ? 0 : 1;
				this.$api.post('user/SetUserFav',{ goods_id: this.goods_id, user_id: this.user_id, state: state })
				.then(res => {
					console.log("SetUserFav", res);
					this.isfav = !this.isfav;
					Toast(`${res.msg}`);
				})
			},
			tabbar(e){
				this.tabIndex = e.target.dataset.index;
			},
			openAttr(mask){
				this.maskType = mask;
				this.mask = true;
			},
			closeAttr(){
				this.maskType = '';
				this.mask = false;
			},
			selectValue(e){
				let selectAttrValues = this.selectAttrValues;
				const attr_id = Number(e.target.dataset.attrid);
				const index = Number(e.target.dataset.index);
				const index2 = Number(e.target.dataset.index2);
				const attrId = Number(e.target.dataset.id);
				let attrs = this.product.attrs;
				let attrIds = this.attrIds;
				let price = Number(this.product.price), mprice = Number(this.product.mprice), thumbnail =  this.thumbnail;
				let prices = this.prices;  // 属性价格记录数组
				let pricesx = [];  // 属性价格记录数组
				attrs.forEach((ele, i) => {
					if (ele.attr_id == attr_id) {
						// attrIds[index] = attrId;
						selectAttrValues[index] = ele.names[index2];
						pricesx = ele.prices.map(function(price){
							const obj = {};
							obj.attr_id = attr_id;
							obj.price = price;
							obj.checked = !1;
							return obj;
						});
						pricesx[index2].checked = !0;
						prices[index] = pricesx[index2].price;
						thumbnail = ele.thumbnails[index2] ? ele.thumbnails[index2] : thumbnail;
					}
				})
				// console.log("prices", prices);
				price += prices.reduce((sum,price)=>sum+Number(price), 0);
				mprice += prices.reduce((sum,price)=>sum+Number(price), 0);
				for (var i = 0, lenI = selectAttrValues.length; i < lenI; i++) {
					if (selectAttrValues[i] == null) {
						selectAttrValues[i] = attrs[i].attr_name;
					}
				}
				this.$set(this.attrIds,index,attrId);
				this.selectAttrValues = selectAttrValues;
				this.price = Tools.Decimal(price);
				this.mprice = Tools.Decimal(mprice);
				this.thumbnail = thumbnail;
				this.prices = prices;
			},
			addCart(){},
			buyNow(){},
			getCoupon(){},
			okNum(){},
			minusNum(){
				this.buyNum--;
			},
			plusNum(){
				this.buyNum++;
			},
			handleScroll(){
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				if(scrollTop >= 300){
					this.showTop = true;
				}else{
					this.showTop = false;
				}
			},
			backTop(){
				window.scrollTo({
					top: 0,
					behavior: "smooth"
				});
			},
			showGallery(){}
		}
	}
</script>
<style scoped>
	.page__bd {
		padding-top: 40px;
		padding-bottom: 50px;
	}

	.section {
		margin-bottom: 10px;
		padding: 10px;
		background: #fff;
	}


	/*section1*/

	.title1 {
		width: 85%;
	}

	.title {
		color: #000;
		font-size: 14px;
		line-height: 1.2;
	}

	.subt {
		margin: 3px 0;
		color: #999;
		font-size: 12px;
		line-height: 1.3;
	}

	.price {
		color: #f00;
		font-size: 14px;
	}

	.pe1 {
		font-size: 18px;
		font-weight: 600;
	}

	.pe2 {
		margin-left: 5px;
		color: #ccc;
		font-size: 12px;
		text-decoration: line-through;
	}

	.share1 {
		width: 15%;
		margin: 0;
		padding: 0 0 0 5%;
		background: none;
		border: 0;
		color: #999;
		font-size: 12px;
		line-height: 1.2;
	}

	.share1:before,
	.share1:after {
		display: none;
	}

	.icon-share {
		display: block;
		font-size: 25px;
	}


	/*section2*/

	.section2 {
		justify-content: space-between;
		text-align: center;
	}

	.str2 {
		width: 33.333333%;
		font-size: 12px;
		line-height: 25px;
	}

	.icon-pro {
		margin-right: 3px;
		font-size: 23px;
		vertical-align: middle;
	}


	/*section3*/

	.section3 {
		flex-wrap: wrap;
		text-align: center;
		align-items: center;
	}

	.str3 {
		width: 25%;
		font-size: 12px;
		line-height: 25px;
	}

	/*section5*/

	.section5 {
		justify-content: space-between;
		align-items: center;
	}


	/*section6*/

	.section6 {
		margin-bottom: 0;
		border-bottom: 1px solid #f2f2f2;
	}


	/*attr-box*/

	.attr-box {
		position: fixed;
		left: 0;
		right: 0;
		bottom: -100%;
		background: #fff;
		z-index: 1001;
		opacity: 0;
		transition: all ease .5s;
	}


	.attr_bd {
		padding: 0 10px 10px;
	}

	.attrx {
		position: relative;
		padding: 10px 0;
	}

	.attrx:after {
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 0;
		border-bottom: 1px solid #eee;
	}

	.attr-val {
		max-height: 180px;
		overflow-y: auto;
		border-bottom: 1px solid #eee;
	}
	/* .attr-val::-webkit-scrollbar {
		display: none;
	} */

	.attr-val:after {
		display: none;
	}

	.attr-A-img {
		position: relative;
		margin-top: -25px;
		width: 80px;
		height: 80px;
		border: 2px solid #eee;
		/* box-shadow: 0 0 5px rgba(0, 0, 0, .05); */
	}

	.attr-A-tit {
		padding-left: 10px;
	}

	.attr-A-t2 {
		color: #333;
		font-size: 12px;
	}

	.attr-A-t1 {
		color: #f00;
		font-size: 12px;
		line-height: 1;
	}

	.attr-A-t3 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		font-size: 12px;
	}

	.attr-A-t4 {
		margin-right: 5px;
		color: #bbb;
		font-size: 12px;
	}

	.attr-name {
		line-height: 30px;
		color: #333;
	}

	.attrs {
		flex-wrap: wrap;
	}

	.attr-value {
		margin: 0 5px 5px 0;
		padding: 0 10px;
		background: #eee;
		border-radius: 2px;
		line-height: 2;
		text-align: center;
		font-size: 12px;
	}

	.attr-value.on {
		background: #ff495f;
		color: #fff;
	}

	.attr-total {
		justify-content: space-between;
	}

	.minus,
	.plus {
		display: inline-block;
		width: 30px;
		height: 30px;
		background: #eee;
		border-radius: 2px;
		font-size: 25px;
		font-family: 'arial';
		text-align: center;
		line-height: 30px;
		vertical-align: top;
	}

	.num-input {
		display: inline-block;
		width: 50px;
		height: 30px;
		border: 1px solid #eee;
		min-height: 30px;
		line-height: 28px;
		text-align: center;
		vertical-align: top;
		background: #fff;
	}

	.minus.disabled,
	.plus.disabled {
		color: #ccc;
	}


	/*button*/

	.cart-btn,
	.buy-btn {
		width: 50%;
		height: 50px;
		color: #fff;
		font-size: 16px;
		text-align: center;
		line-height: 50px;
	}

	.cart-btn {
		background: #FF9500;
	}

	.buy-btn {
		background: #FF0036;
	}

	.buttons {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: 50px;
		background: #fff;
		box-shadow: 0 1px 10px rgba(0, 0, 0, .3);
		z-index: 97;
		overflow: hidden;
	}

	.ico-btn {
		position: relative;
		width: 14%;
		padding-top: 4px;
		color: #999;
		font-size: 12px;
		line-height: 1;
		text-align: center;
	}

	.icon-shop,
	.icon-kefu,
	.icon-fav,
	.icon-cart2 {
		font-size: 25px;
	}

	.icon-fav1:before {
		color: #FF0036;
		font-size: 25px;
	}

	.cart-btn1,
	.buy-btn1 {
		width: 29%;
	}

	.cart-num {
		position: absolute;
		top: 5px;
		right: 5px;
		width: 15px;
		height: 15px;
		background: #f00;
		border-radius: 100%;
		color: #fff;
		font-size: 10px;
		text-align: center;
		line-height: 15px;
		overflow: hidden;
	}

	.detailx {
		position: relative;
		/*height: 350px;*/
		background: #fff;
		padding: 10px;
		text-align: justify;
	}
	/* .detailx::before { 
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		height: 0;
		border-top: 1px solid #f2f2f2;
	} */


	/*coupon*/

	.icon-08 {
		position: absolute;
		right: -5px;
		top: 5px;
		font-size: 30px;
		color: #bbb;
		line-height: 1;
	}

	.coupon-box {
		position: fixed;
		left: 0;
		right: 0;
		bottom: -100%;
		padding-bottom: 10px;
		background: #fff;
		z-index: 1001;
		opacity: 0;
		transition: all ease .5s;
	}

	.coupon-height {
		height: 260px;
		overflow-y: auto;
	}

	.coupon-t {
		position: relative;
		margin-bottom: 20px;
		padding: 10px;
		color: #000;
		font-size: 16px;
		text-align: center;
	}

	.coupon-t:after {
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 0;
		border-bottom: 1px solid #eee;
	}

	.icon08x {
		top: 5px;
	}

	.coupons {
		margin: 0 10px 10px;
		background: #4ad8da;
		justify-content: space-between;
		align-items: center;
		overflow: hidden;
		color: #fff;
	}

	.coupon-item {
		position: relative;
		width: 75%;
		padding: 10px;
		font-size: 12px;
	}

	.coupon-item:after {
		content: "";
		position: absolute;
		right: 0;
		top: -10px;
		bottom: -10px;
		width: 2px;
		background: #fff;
		z-index: 5;
	}

	.sawtooth {
		position: relative;
		background: #4ad8da;
	}

	.sawtooth:before,
	.sawtooth:after {
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		display: block;
		height: 3px;
		background-size: 5px 10px;
		z-index: 3;
	}

	.sawtooth:before {
		bottom: 0;
		background-color: #fff;
		background-position: 100% 15%;
		background-image: linear-gradient(-45deg, #4ad8da 25%, transparent 25%, transparent), linear-gradient(-135deg, #4ad8da 25%, transparent 25%, transparent), linear-gradient(-45deg, transparent 75%, #4ad8da 75%), linear-gradient(-135deg, transparent 75%, #4ad8da 75%);
	}

	.sawtooth:after {
		top: 0;
		background-color: #4ad8da;
		background-position: 100% 15%;
		background-image: linear-gradient(-45deg, #fff 25%, transparent 25%, transparent), linear-gradient(-135deg, #fff 25%, transparent 25%, transparent), linear-gradient(-45deg, transparent 75%, #fff 75%), linear-gradient(-135deg, transparent 75%, #fff 75%);
	}

	.couponIcon {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		font-size: 65px;
		line-height: 1;
	}

	.icon-coupon03 {
		color: green;
	}

	.icon-coupon04 {}

	.icon-coupon05 {
		color: #fff;
		font-size: 23px;
	}

	.coupon-item1 {
		justify-content: space-between;
		align-items: center;
	}

	.coupon-t1 {
		max-width: 70%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.coupon-cr1 {
		color: #269C9E;
	}

	.coupon-ft1 {
		font-size: 18px;
	}


	/*领光*/

	.sawtooth.statusx {
		background: #eee;
		color: #bbbf;
	}

	.sawtooth.statusx:before {
		background-image: linear-gradient(-45deg, #eee 25%, transparent 25%, transparent), linear-gradient(-135deg, #eee 25%, transparent 25%, transparent), linear-gradient(-45deg, transparent 75%, #eee 75%), linear-gradient(-135deg, transparent 75%, #eee 75%);
	}

	.sawtooth.statusx:after {
		background-color: #eee;
	}

	.coupon-cr1.statusx {
		color: #ccc;
	}

	.coupon-state {
		position: relative;
		width: 25%;
		padding: 20px 10px;
		font-size: 12px;
		text-align: center;
	}

	.coupon-state1 {
		color: #fff;
	}


	/*定顶部切换*/

	.topBar {
		position: fixed;
		left: 0;
		right: 0;
		top: 48px;
		height: 40px;
		background: #fff;
		box-shadow: 0 0 15px rgba(0, 0, 0, .1);
		line-height: 40px;
		text-align: center;
		z-index: 11;
	}

	.topBar-ul {
		position: relative;
		justify-content: space-around;
	}

	.topBar-ul:after {
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 0;
		border-bottom: 1px solid #eee;
	}

	.topBar-li {
		position: relative;
		color: #333;
		text-align: center;
	}

	.topBar-li.on {
		color: #ff495f;
	}


	/*评价区域*/

	.eval-ul {
		position: relative;
		padding-bottom: 10px;
	}

	.eval-ul:after {
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 0;
		border-bottom: 1px solid #eee;
	}

	.eval-statics {
		padding-bottom:  15px;
		justify-content: space-between;
	}

	.eval-count {
		width: 19%;
		padding: 5px;
		background: #fbe6e4;
		color: #999;
		font-size: 10px;
		text-align: center;
		line-height: 1.2;
	}

	.eval-item1 {
		margin-bottom: 10px;
	}

	.eval-avatar {
		width: 40px;
		height: 40px;
	}

	.eval-name {
		padding: 0 10px;
	}

	.eval-t1 {
		font-size: 13px;
		justify-content: space-between;
	}

	.eval-t2 {
		font-size: 12px;
		color: #999;
		line-height: 1.8;
	}

	.xstar {
		font-size: 18px;
	}

	.eval-item2 {
		color: #333;
		font-size: 13px;
	}

	.eval-item3 {
		margin-top: 10px;
		white-space: nowrap;
		overflow-x: auto;
	}
	.eval-item3::-webkit-scrollbar {
		display: none;
	}

	.eval-img {
		width: 80px;
		height: 80px;
		margin-right: 5px;
	}

	.eval-link {
		display: block;
		width: 100px;
		height: 30px;
		margin: 20px auto 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-size: 12px;
		line-height: 30px;
		text-align: center;
	}

	.detimg img {
		max-width: 100%;
		height: auto;
	}


	.eval-item4 {
		position: relative;
		margin-top: 10px;
		padding-left: 8px;
	}

	/*.eval-item4:before { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 0; border-top: 1px solid #eee; }*/
	.eval-item4-t {
		justify-content: space-between;
		align-items: center;
	}

	.eval-item4-t1 {
		color: #fc6;
		font-size: 14px;
	}

	.eval-item4-t2 {
		color: #ccc;
		font-size: 12px;
	}

	.eval-item4-c {
		color: #999;
		font-size: 12px;
	}

	.move { bottom: 0; opacity: 1; }
</style>