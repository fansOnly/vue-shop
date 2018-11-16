<template>
    <div>
        <div class="order-box flex-box">
            <div v-for="(item, index) in tabItems" :key="index" :class="['order', {on:tabIndex == index}]" :style="{width:(100/tabItems.length)+'%'}" @click="TabSlide(index)">{{item}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TabSlide',
        props: {
            tabItems: Array,
            tabIndex: Number
        },
        methods:{
            TabSlide(index){
                this.$emit('TabSlide', index);
            }
        }
    }
</script>
<style scoped>
.order-box { position: relative; height: 40px; background: #fff; line-height: 40px; /*justify-content: space-around;*/ }
.order-box:after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 0; border-bottom: 1px solid #f3f3f3; }
.order { position: relative; font-size: 13px; color: #666; text-align: center; }
.order.on { color: #FF0036; }
.order.on:after { content: ""; position: absolute; left: 0; right: 0; bottom: 1px; height: 0; border-bottom: 2px solid #FF0036; }
.icon-order { font-size: 25px; line-height: 1; }
</style>