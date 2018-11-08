<template>
	<div id="app">
		<Header></Header>
		<transition :name="transitionName">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	import Header from "./components/Header.vue"
	export default {
		name: "app",
		components: {
			Header
		},
		data() {
			return {
				transitionName: 'slide-left'
			}
		},
		watch: {
			'$route'(to, from) {
				const toDepth = to.path.split('/').length
				const fromDepth = from.path.split('/').length
				this.transitionName = toDepth > fromDepth ? 'slide-right' : 'slide-left'
			}
		}
	}
</script>

<style>
	#app {
		font-family: "Avenir", Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		padding-top: 48px;
		color: #333;
		background-color: #fff;
		font-size: 14px;
		line-height: 1.5;
		overflow: hidden;
	}

	/* .slide-left-enter-active, .slide-right-enter-active, .slide-left-leave-active, .slide-right-leave-active {
		transition: all .3s ease;
	}

	.slide-left-enter, .slide-left-leave-to {
		opacity: 0;
		transform: translateX(-100%);
	}

	.slide-right-enter, .slide-right-leave-to {
		opacity: 0;
		transform: translateX(100%);
	}

	.slide-left-enter-to, .slide-left-leave, .slide-right-enter-to, .slide-right-leave {
		opacity: 1;
		transform: translateX(0);
	} */
	
	@import '//at.alicdn.com/t/font_667160_k1loj6k2ef.css';
	/* @import '~@/assets/iconfont/iconfont.css'; */
</style>