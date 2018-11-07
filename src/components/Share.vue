<template>
    <div>
        <div :class="['share', { move: isshare }]" >
            <div>分享到微信</div>
            <div>分享到微博</div>
            <div>分享到朋友圈</div>
        </div>
        <div :class="['mask', { maskon: isshare }]" @click="$emit('close')"></div>
    </div>
</template>

<script>
    export default {
        name: 'Share',
        props: ['isshare']
    }
</script>
<style scoped>
.share { 
    position: fixed;
    left: 0;
    right: 0;
    bottom: -100%;
    padding: 5%;
    background: #fff;
    z-index: 1001;
    transition: all ease .5s;
}
.move{
    bottom: 0;
}
</style>