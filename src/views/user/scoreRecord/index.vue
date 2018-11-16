<template>
    <div>
        <div v-if="scoreList.length">
            <div class="score-box">
                <router-link v-for="(item, index) in scoreList" :key="index" to="" class="score-item flex-box">
                    <div class="score-item1">
                        <img :src="item.thumbnail">
                    </div>
                    <div class="score-item2">
                        <div class="score-t1">{{item.title}}</div>
                        <div class="score-t2">{{item.action}}</div>
                        <div class="score-t3">{{item.buy_time}}</div>
                    </div>
                    <div class="score-item3">{{item.type}}{{item.score}}</div>
                </router-link>
            </div>
            <NoMore :nomore="nomore" :loading="loading" @loadmore="loadmore"></NoMore>
        </div>
        <NoData v-else title="积分记录"></NoData>
    </div>
</template>

<script>
    import NoData from '@/components/NoData'
    import NoMore from '@/components/NoMore'
    export default {
        name: 'ScoreRecord',
        components: {
            NoData,
            NoMore
        },
        data(){
            return {
                scoreList: [],
                page: 1,
                pageSize: 6,
                total: 0,
                nomore: !1,
                loading: false
            }
        },
        mounted() {
            this.GetScoreList(this.page);
        },
        methods:{
            GetScoreList: function(page){
                this.$api.get('score/GetScoreList', {user_id:this.user_id,page:page,pageSize:this.pageSize})
                .then(res=>{
                    console.log("GetScoreList", res);
                    this.loading = false;
                    if(res.scoreList.length > 0){
                        let scoreList = page == 1 ? [] : this.scoreList;
                        const scoreListx = res.scoreList;
                        scoreList = scoreList.concat(scoreListx);
                        scoreListx.length && scoreListx.forEach(ele=>{
                            ele.buy_time = Tools.formatTime(ele.buy_time, '-', ':');
                        })
                        this.scoreList = scoreList;
                        this.page = scoreListx.length ? page : page - 1;
                        this.nomore = res.count <= this.pageSize * page ? !0 : !1;
                        this.total = res.count;
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
					this.GetScoreList(page + 1);
				} else {
					console.log("nodata");
				}
			},
        }
    }
</script>
<style scoped>
.score-box { margin-top: 10px; background: #fff; }

.score-item { position: relative; padding: 10px; justify-content: space-between; align-items: center; }
.score-item:after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 0; border-bottom: 1px solid #eee; }

.score-item1 { width: 60px; height: 60px; border-radius: 5px; overflow: hidden; }

.score-item2 { width: 50%; }

.score-t1 { color: #000; font-size: 14px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.score-t2 { color: #aaa; font-size: 14px; }
.score-t3 { color: #ccc; font-size: 12px; }


.score-item3 { width: calc(50% - 80px); text-align: right; color: #1aad19; font-size: 16px; font-weight: 600; }

.score-cr2 { color: #f00; }
</style>