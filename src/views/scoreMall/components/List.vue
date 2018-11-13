<template>
        <div class="picList">
            <router-link v-for="(item, index) in products" :key="index" :to="{ name: 'scoredetail', params: { id: item.id } }" class="picList-li">
                <div class="picList-imgBox">
                    <img v-if="item.thumbnail" :src="item.thumbnail">
                    <img v-else src="@/assets/imgicon.png">
                    <span v-if="item.state == 3" class="product-tag tag-new">新品</span>
                    <span v-if="item.state == 2" class="product-tag tag-hot">热销</span>
                </div>
                <div class="picList-desc">
                    <div class="picList-t">{{item.title}}</div>
                    <div class="picList-p"><span class="picList-p1">{{item.score}}</span>积分</div>
                    <div class="picList-s flex-box"><span>剩余：{{item.lave}}</span><span>库存：{{item.lave}}</span></div>
                </div>
            </router-link>
        </div>
    </template>
    
    <script>
        export default {
            name: 'List',
            props: ['products']
        }
    </script>