<template>
	<div>
		<div id="category-container" class="categoty flex-box">
			<div class="cateL" width="30%">
				<div v-for="(item, index) in categories" :key="index" :class="['cateMenu', cateIndex == item.id ? 'on': '']"
				 :data-index="index" @click="changeCate">{{item.name}}</div>
			</div>
			<div class="cateR">
				<div v-for="(second, index) in category" :key="index">
					<div v-if="cateIndex == second.parent_id" class="cateItem">
						<div class="cateItem-t">{{second.name}}</div>
						<div v-if="second.children.length" class="cate-ul flex-box">
							<router-link v-for="(third, index2) in second.children" :key="index2" :to="{ name: 'ProductList', params: { category_id: third.id }}"
							 class="cate-li ">
								<img v-if="third.more.thumbnail" :src="third.more.thumbnail" class="">
								<img v-else src="~@/assets/imgicon.png" class="">
								<div class="cate-li_t">{{third.name}}</div>
							</router-link>
						</div>
						<div v-else class="cate-ul flex-box">
							<router-link class="cate-li " :to="{name:'ProductList',params:{category_id:third.id}}">
								<img v-if="second.thumbnail" :src="second.thumbnail" class="">
								<img v-else src="~@/assets/imgicon.png" class="">
								<div class="cate-li_t">{{second.name}}</div>
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Footer></Footer>
	</div>
</template>

<script>
	import Footer from '@/components/Footer.vue'
	export default {
		name: 'Category',
		components: {
			Footer
		},
		data() {
			return {
				cateIndex: 1,
				categories: [],
				category: []
			}
		},
		mounted() {
			const windowHeight = window.screen.height;
			const headerHeight = document.getElementById("header").offsetHeight;
			const footerHeight = document.getElementById("footer").offsetHeight;
			document.getElementById("category-container").style = "height:" + (windowHeight - headerHeight - footerHeight) +
				"px";
			this.getCategory();
		},
		methods: {
			async getCategory() {
				await this.$api.get('category/index', {})
					.then(res => {
						console.log("getCategory", res);
						if (res.categories.length > 0) {
							this.categories = res.categories;
							this.cateIndex = res.categories[0].id;
						}
					})
				await this.getCategoryById(this.cateIndex);
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
			changeCate: function (e) {
				console.log(e);
				const index = e.target.dataset.index;
				this.cateIndex = this.categories[index].id;
				this.getCategoryById(this.cateIndex);
			}
		},
	}
</script>
<style scoped>
	.categoty {
		overflow: hidden;
	}

	.cateL {
		width: 30%;
		background: #f5f5f5;
		overflow-y: auto;
	}

	.cateMenu {
		padding: 10px 5px;
		font-size: 12px;
		text-align: center;
		line-height: 1.5;
	}

	.cateMenu.on {
		background: #fff;
		color: #ff495f;
		font-weight: 600;
	}


	.cateR {
		width: 70%;
		padding: 0 3%;
		background: #fff;
		overflow-y: auto;
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