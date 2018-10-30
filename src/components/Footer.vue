<template>
	<div>
		<div class="footer">
			<div class="foot-item"><router-link to="/" class="foot-itema"><img v-if="footIndex == 1" class="foot-img" src="../assets/homes.png" alt=""><img v-else class="foot-img" src="../assets/home.png" alt="">首页</router-link></div>
			<div class="foot-item"><router-link to="/category" class="foot-itema"><img v-if="footIndex == 2" class="foot-img" src="../assets/carts.png" alt=""><img v-else class="foot-img" src="../assets/cart.png" alt="">分类</router-link></div>
			<div class="foot-item"><router-link to="/" class="foot-itema"><img v-if="footIndex == 3" class="foot-img" src="../assets/categorys.png" alt=""><img v-else class="foot-img" src="../assets/category.png" alt="">购物车</router-link></div>
			<div class="foot-item"><router-link to="/" class="foot-itema"><img v-if="footIndex == 4" class="foot-img" src="../assets/mys.png" alt=""><img v-else class="foot-img" src="../assets/my.png" alt="">我的</router-link></div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'Footer',
		data() {
			return {
				footIndex: 1
			}
		}
	}
</script>
<style scoped>
	.footer {
		display: -webkit-flex;
		display: flex;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: 60px;
		background: #ff495f;
		z-index: 999;
	}

	.foot-item {
		width: 25%;
	}

	.foot-itema {
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		display: block;
		height: 60px;
		padding-top: 7px;
		color: #fff;
		font-size: 14px;
		text-align: center;
	}

	.foot-img {
		display: block;
		width: 30px;
		margin: 0 auto;
	}
</style>