<template>
    <div>
        <div v-for="(item, index) in addressList" :key="index" class="address">
            <div class="item flex-box">
                <div class="item-name">{{item.name}}</div>
                <div class="item-phone">{{item.phone}}</div>
                <div class="item-tag">{{item.title}}</div>
            </div>
            <div class="item">{{item.area}} {{item.address}}</div>
            <div class="item itemx flex-box">
                <div class="setd flex-box">
                    <div v-if="item.state == 2">
                        <span class="orange1">默认地址</span>
                    </div>
                    <div v-else @click="setDefault(index)"><span class="c3">设为默认</span>
                    </div>
                </div>
                <div class="option flex-box">
                    <router-link :to="{name:'EditAddress', params: {id: item.id}}" class="optionx"><span class="iconfont icon-edit"></span>编辑</router-link>
                    <div class="optionx" @click="delAddress(index)"><span class="iconfont icon-delete"></span>删除</div>
                </div>
            </div>
        </div>

        <router-link :to="{name: 'AddAddress'}" class="addAddress">新增收货地址</router-link>
    </div>
</template>

<script>
    export default {
        name: 'Addressx',
        data() {
            return {
                addressList: []
            }
        },
        mounted() {
            this.GetAddress();
        },
        methods: {
            GetAddress(user_id) {
                this.$api.get('user/GetAddress', {
                        user_id
                    })
                    .then(res => {
                        console.log("GetAddress", res);
                        this.addressList = res.addressList;
                    })
            },
            setDefault(index, user_id) {
                let addressList = this.addressList;
                const id = addressList[index].id;
                this.$api.post('user/SetDefaultAddress', {
                        id: id,
                        user_id
                    })
                    .then(res => {
                        console.log("SetDefaultAddress", res);
                        for (var i = 0; i < addressList.length; i++) {
                            addressList[i].state = 1;
                        }
                        addressList[index].state = 2;
                        addressList.sort((a, b) => b.state - a.state);
                    })
            },
            delAddress(index, user_id) {
                let addressList = this.addressList;
                const id = addressList[index].id;
                this.$api.post('user/DeleteAddress', {
                        id: id,
                        user_id
                    })
                    .then(res => {
                        console.log("DeleteAddress", res);
                        addressList.splice(index, 1);
                    })
            }
        }
    }
</script>

<style scoped>
    page {
        padding-bottom: 70px;
    }

    .address {
        position: relative;
        margin-top: 10px;
        padding-top: 5px;
        background: #fff;
    }

    .address:before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: 0;
        border-top: 1px solid #eee;
    }

    .address:after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 0;
        border-bottom: 1px solid #eee;
    }

    .item {
        position: relative;
        padding: 5px 10px 0;
        align-items: center;
    }

    .itemx {
        height: 45px;
        margin-top: 5px;
        padding: 0 10px;
        line-height: 45px;
        justify-content: space-between;
    }

    .itemx:before {
        content: "";
        position: absolute;
        left: 10px;
        right: 0;
        top: 0;
        height: 0;
        border-top: 1px solid #eee;
    }

    .item-name {
        width: 80px;
    }

    .item-tag {
        height: 15px;
        margin-left: 15px;
        padding: 0 10px;
        border: 1px solid #FF9500;
        color: #FF9500;
        font-size: 11px;
        line-height: 15px;
    }

    .optionx {
        margin-left: 5px;
        color: #999;
    }

    .radio {
        position: relative;
        top: 2px;
        margin-left: 0;
        font-size: 14px;
    }

    .icon-edit,
    .icon-delete {
        font-size: 20px;
        color: #999;
    }

    .addAddress {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: 50px;
        background: #FF9500;
        color: #fff;
        font-size: 16px;
        text-align: center;
        line-height: 50px;
        z-index: 88;
    }
</style>