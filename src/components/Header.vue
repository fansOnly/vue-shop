<template>
	<div>
		<div class="header">
			<div class="headerL">
				<span v-show="!isIndex" class="iconfont icon-back" @click="goBack"></span>
			</div>
			<h3 class="header-t">我是标题啊</h3>
			<div class="headerR">
				<span class="iconfont icon-cart2" @click="goCart"></span>
				<span class="iconfont icon-user" @click="goUser"></span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Header',
		data() {
			return {
				isIndex: true
			}
		},
		created() {},
		mounted() {
		},
		watch: {
			$route(now, old){
				if(now.path === '/'){
					this.isIndex = true;
				}else{
					this.isIndex = false;
				}
			}
		},
		methods: {
			goBack: function(){
				console.log("goBack");
				if(this.$router.options.routes.length > 0){
					this.$router.go(-1);
				}else{
					this.$router.push('/');
				}
			},
			goUser: function(){
				console.log("goUser");
			},
			goCart: function(){
				console.log("goCart");
			}
		}
	}
</script>
<style scoped>
	.header{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 40px;
		padding: 0 10px;
		background: #ff495f;
		color: #fff;
		line-height: 40px;
		display: -webkit-box;
		display: flex;
		align-items: center;
		overflow: hidden;
		z-index: 9999;
	}
	.header-t {
		width: 60%;
		color: #fff;
		font-size: 16px;
	}
	.headerL, .headerR {
		width: 20%;
		display: -webkit-box;
		display: flex;
		align-items: center;
	}
	.icon-back{
		width: 50%;
		font-size: 26px;
		text-align: left;
	}
	.icon-cart2, .icon-user {
		width: 50%;
		font-size: 26px;
		text-align: right;
	}
</style>