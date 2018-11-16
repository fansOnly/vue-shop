<template>
	<div class="photoItem">
		<router-link v-for="(item, index) in products" :key="" :to="{ name: 'ProductDetail', params: { id: item.id } }"
			class="photoItem-li">
			<div class="photoItem-imgBox">
				<img v-if="item.thumbnail" class="photoItem-img" :src="item.thumbnail" >
				<img v-else class="photoItem-img" src="@/assets/imgicon.png" >
				<span v-if="item.state == 3" class="product-tag tag-new">新品</span>
				<span v-if="item.state == 2" class="product-tag tag-hot">热销</span>
			</div>

			<div class="photoItem-desc">
				<div class="photoItem-t">{{item.title}}</div>
				<div v-if="item.mprice > 0" class="photoItem-p">￥<span class="photoItem-p1">{{item.mprice}}</span><span
						class="photoItem-p2">￥{{item.price}}</span></div>
				<div v-else class="photoItem-p">￥<span class="photoItem-p1">{{item.price}}</span></div>
				<div class="photoItem-s flex-box"><span>销量：{{item.sales}}</span><span>库存：{{item.stock}}</span></div>
			</div>
		</router-link>
	</div>
</template>

<script>
	export default {
		name: 'List2',
		props: {
			products: Array
		}
	}
</script>