<template>
	<div>
		<div class="charge-record-wrap" v-if="CharegList.length > 0">
			<div class="charge-record-list" v-for="(item, index) in CharegList" :key="index">
				<div class="charge-record-item">
					<div class="date">{{ item.create_time }}</div>
					<div class="price">+<span class="money">{{ item.total_fee }}</span></div>
				</div>
			</div>
			<NoMore :nomore="nomore" :loading="loading" @loadmore="loadmore"></NoMore>
		</div>
		<NoData v-else title="充值记录"></NoData>
	</div>
</template>

<script>
	import NoData from '@/components/NoData'
	import NoMore from '@/components/NoMore'
	export default {
		name: 'ChargeRecord',
		components:{
			NoData,
			NoMore
		},
		data() {
			return {
				CharegList: [],
				total: 0,
				pageSize: 15,
				page: 1,
				nomore: !1,
			}
		},
		mounted() {
			this.GetCharegList(this.page);
		},
		methods: {
			GetCharegList(page) {
				this.$api.get('recharge/index', {page: page,user_id: this.user_id, pageSize: this.pageSize})
				.then(res => {
					console.log("GetCharegList", res);
					if(res.rechargeList.length > 0){
						let CharegList = page == 1 ? [] : this.CharegList;
						const CharegListx = res.rechargeList;
						CharegListx.length && CharegListx.forEach(ele=>{
							ele.create_time = Tools.formatTime(ele.create_time, '.');
						})
						CharegList = CharegList.concat(CharegListx);
						this.CharegList = CharegList;
						this.page = CharegListx.length ? page : page - 1;
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
					this.GetCharegList(page + 1);
				} else {
					console.log("nodata");
				}
			},
		}
	}
</script>
<style scoped>
.charge-record-wrap {
    padding: 20rpx;
    background: #fff;
}

.charge-record-list {
    position: relative;
}

.charge-record-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10rpx 0;
    border-bottom: 1px solid #f5f5f5;
}

.price { font-size: 20px; color: #ff495f; font-weight: 600; }
.money { color: #ff495f; font-size: 16px; font-weight: 600; }

.date { color: #bbb; font-size: 14px; }
</style>