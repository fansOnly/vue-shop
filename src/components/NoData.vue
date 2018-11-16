<template>
    <div class="noData">
        <img class="noData-img" src="@/assets/nodata.png">
        <div class="noData-txt">您的{{title}}是空的...</div>
    </div>
</template>

<script>
    export default {
        name: 'nodata',
        props: {
            title: String
        }
    }
</script>

<style scoped>
    .noData {
        margin-top: 40%;
        transform: translateY(-50%);
        text-align: center;
    }

    .noData-img {
        width: 126px;
    }

    .noData-txt {
        color: #ccc;
        font-size: 14px;
    }
</style>