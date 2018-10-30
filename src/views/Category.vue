<template>
	<div>
		<el-container>
			<el-aside class="cateL" width="30%">
				<div v-for="(item, index) in categories" :key="index" :class="['cateMenu', cateIndex == item.id ? 'on': '']" :index="index" @click="changeCate">{{item.name}}</div>
			</el-aside>
			<el-main class="cateR">
				<div v-for="(second, index) in category" :key="index">
					<div v-if="cateIndex == second.parent_id" class="cateItem">
						<div class="cateItem-t">{{second.name}}</div>
						<div v-if="second.children.length" class="cate-ul flex-box">
								<router-link v-for="(third, index2) in second.children" :key="index2" to="" class="cate-li flex-col">
									<img v-if="third.more.thumbnail" :src="third.more.thumbnail" class="">
									<img v-else src="~@/assets/imgicon.png" class="">
									<div class="cate-li_t">{{third.name}}</div>
								</router-link>
	
						</div>
						<div v-else class="cate-ul flex-box">
						<router-link class="cate-li flex-col" to="">
							<img v-if="second.thumbnail" :src="second.thumbnail" class="">
							<img v-else src="~@/assets/imgicon.png" class="">
							<div class="cate-li_t">{{second.name}}</div>
						</router-link>
					</div>
					</div>
				</div>
			</el-main>
		</el-container>
	</div>
</template>


<script>
	export default {
		name: 'Category',
		data() {
			return {
				cateIndex: 1,
				categories: [],
				category: []
			}
		},
		mounted() {
			this.getCategory();
		},
		methods: {
			getCategory: function () {
				this.$api.get('category/index', {})
					.then(res => {
						console.log("getCategory", res);
						if (res.state == 1) {
							this.categories = res.categories;
							const idx = res.categories[0].id;
							this.cateIndex = idx;
							return this.getCategoryById(idx);
						}
					})
			},
			getCategoryById: function (id) {
				this.$api.get('category/getCategoryById', {
						id: id
					})
					.then(res => {
						console.log("getCategoryById", res);
						this.category = res.category;
					})
			},
			changeCate: function(e){
				console.log(e);
				// const index = e.currentTarget.dataset.id;
			}
		},
	}
</script>
<style scoped>
	.cateL {
		background: #f5f5f5;
	}

	.cateMenu {
		padding: 10px 5px;
		font-size: 14px;
		text-align: center;
		line-height: 1.5;
	}

	.cateMenu.on {
		background: #fff;
		color: #ff495f;
		font-weight: 600;
	}


	.cateR {
		padding: 0 3%;
		background: #fff;
	}

	.cateItem {
		/* margin-bottom: 15px; */
	}

	.cateItem-t {
		margin: 10px 0 5px;
		color: #000;
		font-weight: 600;
		font-size: 15px;
		line-height: 2;
		text-align: left;
	}

	.cate-ul {
		flex-wrap: wrap;
	}

	.cate-li {
		width: 33.33333%;
		padding: 5px;
	}

	.cate-li_t {
		color: #333;
		font-size: 12px;
		margin-top: 5px;
		text-align: center;
	}
</style>