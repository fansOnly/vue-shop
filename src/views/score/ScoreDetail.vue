<template>
	<div>
		<div class="page__bd">
			<div class="pageItem" v-if="tabIndex == 1">
				<Photos :something="product"></Photos>
				<div class="section section1 flex-box">
					<div class="title1">
						<div class="title">{{product.title}}</div>
						<div class="subt">{{product.subtitle}}</div>
						<div class="price"><span class="pe1">{{product.score}}</span>积分</div>
					</div>
					<button class="share1"><span class="iconfont icon-share"></span>分享</button>
				</div>
				<div class="section section2 flex-box">
					<div class="str2 c3"><span class="iconfont icon-05 icon-pro gray"></span>热度：{{product.views}}</div>
					<!-- <div class="str2 c3"><span class="iconfont icon-05 icon-pro gray"></span>收藏：{{product.favs}}</div> -->
					<div class="str2 c3"><span class="iconfont icon-06 icon-pro gray"></span>已兑：{{product.stock - lave}}</div>
					<div class="str2 c3"><span class="iconfont icon-07 icon-pro gray"></span>剩余：{{lave}}</div>
				</div>
				<div class="section section6 flex-box">
					<div class="">商品描述</div>
				</div>
				<div class="detailx detimg flex-col" style="min-height: 200px;">
					<div v-html="product.content"></div>
				</div>
			</div>

			<div class="buttons flex-box">
				<div class="buy-btn fav-btn1 flex-box" @click="SetUserFav"><span :class="['iconfont', isfav ? 'icon-fav1' : 'icon-fav', 'icon-favx']"></span>{{isfav
					? '已收藏' : '加入收藏'}}</div>
				<div class="buy-btn buy-btn1" @click="openAttr('attr')">立即兑换</div>
			</div>

			<span v-if="showTop" class="iconfont icon-top" @click="backTop"></span>
		</div>


		<!-- 属性选择box -->
		<div :class="['mask', {maskon:mask}]" @click="closeAttr" v-if="mask"></div>
		<div :class="['attr-box', {move: maskType == 'attr'}]" >
			<div class="attr_bd">
				<div class="attrx flex-box">
					<span class="iconfont icon-08" @click="closeAttr"></span>
					<img v-if="product.thumbnail" class="attr-A-img" :src="product.thumbnail">
					<img v-else class="attr-A-img" src="@/assets/imgicon.png">
					<div class="attr-A-tit">
						<div class="attr-A-t1"><span class="pe1">{{product.score}}</span>积分</div>
					</div>
				</div>
				<div class="attrx flex-box attr-total">
					<div class="attr-name">购买数量</div>
					<div class="attr-num">
						<span v-if="buyNum <= 1" class="minus disabled">-</span>
						<span v-else class="minus" @click="minusNum">-</span>
						<input class="num-input" type="number" name="buyNum" maxlength="4" v-model="buyNum" disabled />
						<span v-if="buyNum >= lave" class="plus disabled">+</span>
						<span v-else class="plus" @click="plusNum">+</span>
					</div>
				</div>
				<router-link v-if="isLogin && addressList.length" :to="{name:'selectaddress'}" class="pay-address flex-box">
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
				<router-link v-if="isLogin && !addressList.length" :to="{name:'addaddress'}" class="pay-address flex-box">添加地址<span class="arrow"></span></router-link>
			</div>
			<div class="buttonx flex-box">
				<!-- <div class="cart-btn" @click="addCart">加入购物车</div> -->
				<div class="buy-btn" @click="buyNow">立即兑换</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Photos from '@/views/product/Photos'
	export default {
		name: 'scoredetail',
		components: {
			Photos
		},
		data() {
			return {
				id: 0,
				product: {},
				tabIndex: 1,
				buyNum: 1, // 购买数量
				score: 0,
				lave: 0,
				mask: !1,
				maskType: '', //  attr/coupon
				showTop: !1,
				isfav: !1,
				address: {},
				addressList: [],
				isLogin: !0
			}
		},
		mounted() {
			this.id = this.$route.params.id;
			this.user_id = 1;
			this.GetPointStoreDetail();
			this.GetAddress();
		},
		methods:{
			GetPointStoreDetail: function() {
				this.$api.get('score/detail', { id: this.id, user_id: this.user_id })
					.then(res => {
						console.log("GetPointStoreDetail", res);
						let product = res.product;
						// product.content = product.content.replace(/&emsp;/gi, "");
						// product.content = product.content.replace(/<img/gi, "<img style='max-width:100%;height:auto;' ");
						this.product = product;
						this.lave = product.lave;
						this.isfav = product.isfav;
					})
			},
			GetAddress: function(){
				this.$api.get('user/GetAddress', { user_id: this.user_id })
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
			buyNow(){
				if (this.address) {
					const id = Number(this.id);
					const address_id = this.address.id;
					const user_id = this.user_id;
					const score_type = Number(this.product.type);
					const score = Number(this.product.score);
					const buyNum = Number(this.buyNum);
					if(this.lave <= 0){
						Toast.show({text:'没有了！！！'});
					}else{
						this.$api.post('score/Exchange', {id,address_id,user_id,score_type,score,buyNum})
						.then(res => {
							console.log("Exchange", res);
							if(res.code == 1){
								this.lave = this.lave - buyNum
								setTimeout(()=>{
									this.closeAttr(); 
								},1500)
							}else if(res.code == -3){
								this.lave = res.lave;
							}else{
								setTimeout(()=>{
									this.closeAttr(); 
								},1500)
							}
						})
					}
				}
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
			openAttr(mask){
				if(this.lave <= 0){
					Toast.show({text:'没有了！！！'});
				}else{
					this.maskType = mask;
					this.mask = true;
				}
			},
			closeAttr(){
				this.maskType = '';
				this.mask = false;
			},
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
/*section1*/
.section {
    margin-bottom: 10px;
    padding: 10px;
    background: #fff;
}
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
    margin-bottom: 1px;
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
    overflow-y: scroll;
    border-bottom: 1px solid #eee;
}

.attr-val:after {
    display: none;
}

.attr-A-img {
    position: relative;
    margin-top: -25px;
    width: 80px;
    height: 80px;
    border: 2px solid #eee;
    /*box-shadow: 0 0 5px rgba(0, 0, 0, .05);*/
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
    margin-right: 3px;
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
	background: #fff;
    min-height: 28px;
    line-height: 28px;
    text-align: center;
    vertical-align: top;
}

.minus.disabled,
.plus.disabled {
    color: #ccc;
}


/*button*/
.buy-btn {
    width: 100%;
    height: 50px;
    color: #fff;
    font-size: 16px;
    text-align: center;
    line-height: 50px;
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
    align-items: center;
}

.ico-btn {
    position: relative;
    width: 15%;
    padding-top: 4px;
    color: #999;
    font-size: 12px;
    line-height: 1;
    text-align: center;
}

.icon-shop,
.icon-kefu,
.icon-cart2 {
    font-size: 25px;
}

.icon-fav:before { color: #aaa; }
.icon-fav1:before { color: #FF0036; }

.icon-favx::before { font-size: 30px; }

.buy-btn1 { width: 50%; }
.fav-btn1 { width: 50%; /*background: #FF9500;*/ background: #fff; color: #333; align-items: center; justify-content: center; }

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
    min-height: 200px;
    background: #fff;
    padding: 10px;
    text-align: justify;
}


/*coupon*/

.mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 98;
}

.icon-08 {
    position: absolute;
    right: -5px;
    top: 5px;
    font-size: 30px;
    color: #bbb;
    line-height: 1;
}

.pay-address { position: relative; padding: 10px 0; background: #fff; justify-content: space-between; align-items: center; }
.item { position: relative; padding: 5px 10px 0; align-items: center; }
.item-name { width: 80px; }
.item-tag { height: 15px; margin-left: 15px; padding: 0 10px; border: 1px solid #FF9500; color: #FF9500; font-size: 11px; line-height: 15px; }
.arrow { margin-right: 3px; }
.arrow:after { position: static; }

.move { bottom: 0; opacity: 1; }
</style>