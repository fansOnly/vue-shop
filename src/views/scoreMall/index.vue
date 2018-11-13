<template>
    <div>
        <div v-if="scoreList.length">
        <List :products="scoreList"></List>
        <div v-if="nomore" class="nomore">我是有底线的</div>
			<div v-else class="loadmore" @click="loadmore">
				<span v-if="loading"><img class="loading" src="@/assets/loading.gif" alt="loading..."></span>
				<span v-else>加载更多</span>
            </div>
        </div>
        <NoData v-else title="积分商城"></NoData>
    </div>
</template>

<script>
    import List from '@/views/scoreMall/components/List'
    import NoData from '@/components/NoData'
    export default {
        name: 'score',
        components: {List,NoData},
        data(){
            return {
                scoreList: [],
                page: 1,
                pageSize: 6,
                nomore: false,
                total: null,
                loading: false
            }
        },
        mounted() {
            this.GetScoreMall(this.page);
        },
        methods:{
            GetScoreMall(page) {
                this.$api.get('score/GetScoreMall', {page:page,pageSize:this.pageSize})
                .then(res => {
                    console.log("GetScoreList", res);
                    this.loading = false;
                    if(res.scoreMallList.length > 0){
                        let scoreMallList = this.scoreMallList || [];
                        const scoreMallListx = res.scoreMallList;
                        scoreMallList = scoreMallList.concat(scoreMallListx);
                        this.scoreList = scoreMallList;
                        this.page = scoreMallListx.length ? page : page - 1;
                        this.nomore = res.count <= this.pageSize * page ? !0 : !1;
                        this.scoreMatotalllList = res.count;
                    }else{
                        this.nomore = true;
                    }
                })
            },
            loadmore() {
				const total = this.total;
				const page = this.page;
				const pageSize = this.pageSize;
				if (total > page * pageSize) {
					this.loading = true;
					this.GetScoreMall(page + 1);
				} else {
					console.log("nodata")
				}
			},
        }
    }
</script>
<style scoped></style>