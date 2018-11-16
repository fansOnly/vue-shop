<template>
    <div>
        <div v-if="nomore" class="nomore">我是有底线的</div>
        <div v-else class="loadmore" @click="$emit('loadmore')">
            <span v-if="loading"><img class="loading" src="@/assets/loading.gif" alt="loading..."></span>
            <span v-else>加载更多</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'NoMore',
        props: {
            nomore: Boolean,
            loading: Boolean
        }
    }
</script>
<style scoped>
    .nomore {
        position: relative;
        padding: 10px;
        color: #ccc;
        font-size: 12px;
        text-align: center;
    }

    .nomore:before {
        content: "";
        display: inline-block;
        width: 70px;
        margin-right: 10px;
        height: 0;
        border-top: 1px dashed #ddd;
        vertical-align: middle;
    }

    .nomore:after {
        content: "";
        display: inline-block;
        width: 70px;
        margin-left: 10px;
        height: 0;
        border-top: 1px dashed #ddd;
        vertical-align: middle;
    }

    .loadmore {
        display: block;
        width: 40%;
        height: 35px;
        margin: 25px auto;
        text-align: center;
        border: 1px solid #e5e5e5;
        border-radius: 3px;
        background: #f5f5f5;
        line-height: 35px;
    }

    .loading {
        width: 15px;
        height: 15px;
        vertical-align: middle;
    }
</style>