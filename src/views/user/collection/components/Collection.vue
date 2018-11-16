<template>
    <div>
        <router-link v-for="(item, index) in collectionList" :key="index" :to="{name:item.goods_id ? 'ProductDetail' : 'ScoreDetail', params:{ id: item.goods_id ? item.goods_id : item.score_id }}" class="order-li flex-box">
            <img v-if="item.thumbnail" :src="item.thumbnail" class="goods-imgx">
            <img v-else src="@/assets/imgicon.png" class="goods-imgx">
            <div class="goods-txt">
                <div class="goods-t">{{item.title}}</div>
                <div class="goods-i">收藏时间：{{item.fav_time}}</div>
                <!-- <div v-if="item.mprice" class="price">￥<text class="pe1">{{item.mprice}}</text><text class="pe2">￥{{item.price}}</text></div>
                        <div v-else class="price">￥<text class="pe1">{{item.price}}</text></div> -->
            </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: 'Collection',
        props: {
            collectionList: Array
        }
    }
</script>
<style scoped>
.order-li { position: relative; padding: 10px; background: #fff; font-size: 12px; justify-content: space-between; }
.order-li:after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 0; border-bottom: 1px solid #f3f3f3; }

.goods-imgx { width: 80px; height: 80px; }
.goods-txt { width: 100%; padding: 0 0 0 10px; }
.goods-t { overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:3; color: #333; font-size: 13px; line-height: 1.5; }
.goods-i { margin: 2px 0; color: #ccc; font-size: 12px; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:1; }

.price { color: #ff495f; font-size: 12px; }
.pe1 { font-size: 14px; }
.pe2 { margin-left: 5px; color: #aaa; font-size: 12px; text-decoration: line-through; }
</style>