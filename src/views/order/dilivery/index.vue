<template>
    <div class="shipper-container">
        <div class="shipper-status">最新状态: {{ status }}</div>
        <div class="shipper-list">
            <div :class="['shipper-item', index === 0 ? 'last' : '']" v-for="(item, index) in shipper" :key="index">
                <div class="shipper-time">{{ item.AcceptTime }}</div>
                <div class="shipper-content">{{ item.AcceptStation }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Dilivery',
        data(){
            return {
                shipper: [],
                status: ''
            }
        },
        mounted() {
            this.order_id = this.$route.params.order_id;
            this.getShipperInfo();
        },
        methods:{
            getShipperInfo() {
                this.$api.get('order/GetShipperInfo', {order_id: this.order_id})
                .then(res => {
                    console.log('GetShipperInfo', res);
                    this.shipper = res.Traces;
                    this.status = this.stateInfo(res.State);
                })
            },
            stateInfo(state) {
                let info = '';
                switch (state) {
                    case '0':
                        info = '无轨迹';
                        break;
                    case '1':
                        info = '已揽收';
                        break;
                    case '2':
                        info = '在途中';
                        break;
                    case '3':
                        info = '签收';
                        break;
                    case '4':
                        info = '问题件';
                        break;
                }
                return info;
            }
        }
    }
</script>
<style scoped>
.shipper-container {
    position: relative;
    background: #fff;
    padding: 10px;
}

.shipper-list {
    padding: 10px 0;
}

.shipper-item {
    border-bottom: 1px solid #eee;
    padding: 5px 0;
    display: flex;
    font-size: 12px;
    color: #ccc;
}

.shipper-item.last {
    color: #000;
}

.shipper-time {
    width: 80px;
    flex-shrink: 0;
    text-align: center;
}</style>
