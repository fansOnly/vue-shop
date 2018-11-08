<template>
	<div>
		<div class="header" id="header">
			<div class="headerL">
				<span v-show="!isIndex" class="iconfont icon-back" @click="goBack"></span>
			</div>
			<div class="header-t">{{pageTitle}}</div>
			<div class="headerR">
				<!-- <span v-show="!isIndex" class="iconfont icon-cart2" @click="goCart"></span> -->
				<!-- <span v-show="!isIndex" class="iconfont icon-user" @click="goUser"></span> -->
				<span class="iconfont icon-ellipsis" @click="share"></span>
			</div>
		</div>
		<Share :isshare="isshare" v-on:close="isshare = false"></Share>
	</div>
</template>

<script>
	// import { mapState } from 'vuex'
	import Share from './Share';
	export default {
		name: 'Header',
		components: {
			Share
		},
		data() {
			return {
				pageTitle: '',
				isIndex: true,
				isshare: false
			}
		},
		created() {},
		computed: {
			// pageTitle() {
			// 	const routes = this.$router.options.routes;
			// 	let title = null;
			// 	routes.forEach(element => {
			// 		if (element.name == this.$route.name) {
			// 			title = element.meta.title
			// 		}
			// 	});
			// 	return title;
			// }
			// ...mapState({
			// 	pageTitle: state => state.title.pageTitle
			// })
		},
		watch: {
			'$route'(to, from) {
				this.isIndex = to.path === '/' ? true : false;
				if(to.matched.some(record => record.meta.title)){
					this.pageTitle = to.meta.title;
				}
			}
		},
		mounted() {
			// console.log(this.$route)
		},
		methods: {
			goBack: function () {
				window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
			},
			share: function () {
				this.isshare = !this.isshare;
			},
			goUser: function () {
				this.$router.push('/user');
			},
			goCart: function () {
				this.$router.push('/cart');
			}
		}
	}
</script>
<style scoped>
	.header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 48px;
		padding: 0 10px;
		background: #ff495f;
		color: #fff;
		line-height: 48px;
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
		text-align: center;
	}

	.headerL,
	.headerR {
		width: 20%;
		display: -webkit-box;
		display: flex;
		align-items: center;
	}

	.headerL {
		justify-content: flex-start;
	}

	.headerR {
		justify-content: flex-end;
	}

	.icon-back {
		width: 50%;
		font-size: 26px;
		text-align: left;
	}

	.icon-ellipsis,
	.icon-cart2,
	.icon-user {
		width: 50%;
		font-size: 26px;
		text-align: right;
	}
</style>