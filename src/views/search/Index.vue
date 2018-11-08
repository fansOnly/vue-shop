<template>
	<div>
		<Search></Search>
		<div class="hotbox">
			<div class="hots">热词搜索</div>
			<div class="hotwords flex-box">
				<div v-for="(item, index) in hotwords" :key="index" class="word">{{item}}</div>
			</div>
		</div>
	</div>
	
</template>


<script>
	import Search from '@/components/Search'
	export default {
		name: 'searchIndex',
		components: {
			Search
		},
		data() {
			return {
				hotwords: ['手机', '电脑', 'PDA'],
				input: '',
				autofocus: false,
				width: 'auto',
				marginRight: '-40px',
				visibility: 'visible',
				showClose: false
			}
		},
		methods: {
			showSearch: function () {
				this.width = '80px';
				this.marginRight = 0;
				this.autofocus = true;
				this.visibility = 'hidden';
			},
			hideSearch: function () {
				this.width = 'auto';
				this.marginRight = '-40px';
				this.autofocus = false;
				this.visibility = 'visible';
				this.showClose = false;
			},
			inputFocus: function(){
				if(this.input.length > 0){
					this.showClose = true;
				}
			},
			inputTyping: function(){
				if(this.input.length > 0){
					this.showClose = true;
				}
			},
			clearInput: function(){
				this.input = '';
			}
		},
		// directives: {
		// 	focus: {
		// 		inserted: function (el, value) {
		// 			if (value) {
		// 				el.focus();
		// 			}
		// 		}
		// 	}
		// },
	}
</script>
<style scoped>
	.search-box {
		display: -webkit-box;
		display: flex;
		align-items: center;
		width: 100%;
		text-align: center;
		padding: 10px;
		background: #eee;
	}

	.search-wrap {
		position: relative;
		width: 100%;
		background: #fff;
		border-radius: 3px;
		height: 32px;
		line-height: 32px;
		overflow: hidden;
	}

	.search-area {
		display: -webkit-box;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		left: 0;
		right: 0;
		height: 32px;
		line-height: 32px;
		background: #fff;
		border-radius: 3px;
		transition: width .3s, opacity .5s;
		z-index: 1;
	}

	.search-text {
		margin-left: 5px;
		color: #ddd;
	}

	.search_input {
		position: absolute;
		display: block;
		width: 100%;
		height: 32px;
		line-height: 32px;
		border: 0;
		background: transparent;
		border-radius: 3px;
		text-align: left;
		opacity: 0;
		outline: none;
	}

	.search_input_focus {
		opacity: 1;
		z-index: 2;
		padding: 0 10px 0 27px;
	}

	.icon-search::before {
		font-size: 16px;
		color: #ddd;
	}

	.icon-iclose{
		position: absolute;
		right: 5px;
		top: 50%;
		z-index: 3;
		font-size: 30px;
		transform: translateY(-50%);
	}

	.btn-cancel {
		width: 40px;
		height: 32px;
		line-height: 32px;
		padding-left: 8px;
		border-radius: 3px;
		color: #333;
		text-align: right;
		transition: margin-right .3s, opacity .3s;
	}

	.hotbox {
		padding: 10px;
		background: #fff;
		border-top: 1px solid #eee;
	}

	.hots {
		margin-bottom: 10px;
		font-size: 16px;
	}

	.hotwords {
		flex-wrap: wrap;
	}

	.word {
		height: 30px;
		margin: 0 8px 8px 0;
		padding: 0 10px;
		background: #f3f3f3;
		border-radius: 3px;
		line-height: 30px;
	}
</style>