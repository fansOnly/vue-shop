<template>
    <div style="background:#000">
        <video :src="video" controls class="video" width="100%" height="">
            您的浏览器不支持 video 标签。
        </video>
    </div>
</template>

<script>
    export default {
        name: 'ProductVideo',
        data() {
            return {
                video: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
            }
        },
        mounted() {
            this.goods_id = this.$route.params.id;
            this.GetGoodsVideo();
        },
        methods: {
            GetGoodsVideo: function () {
                this.$api.get('Goods/GetGoodsVideo', {
                        goods_id: this.goods_id
                    })
                    .then(res => {
                        console.log("GetGoodsVideo", res);
                        var ext = Tools.getFilenameExt(res.video);
                        // console.log(ext);
                        if (ext != 'mp4') {
                            console.log("您上传的视频格式暂不支持")
                            return !1;
                        }
                        this.video = res.video;
                    })
            },
        }
    }
</script>
<style scoped>
    .video {
        /* margin-top: 50%;
        transform: translateY(-25%); */
    }
</style>