<template>
        <div>
            <div class="cart-box flex-box">
                <a-radio-group  class="cart-left" :options="addressids" v-model="checkedAddress" @change="handlecheckedAddressChange" />
                <div class="cart-right" style="width: 100%;">
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
                            <div v-else @click="setDefault(item.id,index)"><span class="c3">设为默认</span>
                            </div>
                        </div>
                        <div class="option flex-box">
                            <router-link :to="{name:'editaddress', params: {id: item.id}}" class="optionx"><span class="iconfont icon-edit"></span>编辑</router-link>
                            <div class="optionx" @click="delAddress(item.id,index)"><span class="iconfont icon-delete"></span>删除</div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    
            <router-link :to="{name: 'addaddress'}" class="addAddress">新增收货地址</router-link>
        </div>
    </template>
    
    <script>
        import { Radio } from 'ant-design-vue'
        export default {
            name: 'selectaddress',
            components: {
                'a-radio-group': Radio.Group
            },
            data() {
                return {
                    addressList: [],
                    addressids: [],
                    checkedAddress: null
                }
            },
            mounted() {
                this.user_id = 1;
                this.GetAddress();
            },
            methods: {
                GetAddress: function () {
                    this.$api.get('user/GetAddress', {
                            user_id: this.user_id
                        })
                        .then(res => {
                            console.log("GetAddress", res);
                            this.addressList = res.addressList;
                            this.addressids = Tools.pluck(res.addressList, 'id').map(id=>id.toString());
                        })
                },
                handlecheckedAddressChange(e) {
                    console.log('radio checked', e.target.value);
                    localStorage.setItem("addressId", e.target.value);
                },
                setDefault(id, index) {
                    let addressList = this.addressList;
                    for (var i = 0; i < addressList.length; i++) {
                        addressList[i].state = 1;
                    }
                    addressList[index].state = 2;
                    addressList.sort((a, b) => b.state - a.state);
                    this.$api.post('user/SetDefaultAddress', {
                            id: id,
                            user_id: this.user_id
                        })
                        .then(res => {
                            console.log("SetDefaultAddress", res);
                            this.addressList = addressList;
                        })
                },
                delAddress(id, index) {
                    this.$api.post('user/DeleteAddress', {
                            id: id
                        })
                        .then(res => {
                            console.log("DeleteAddress", res);
                            this.addressList = this.addressList.splice(index, 1);
                        })
                },
            }
        }
    </script>
    
    <style scoped>
        page {
            padding-bottom: 70px;
        }

        .cart-section {
		margin-top: 10px;
		padding: 0 0 10px 10px;
		background: #fff;
    }
    .cart-left{
        width: 30px;
        padding-left: 7px;
        overflow: hidden;
    }
    .ant-radio-wrapper{
        margin-top: 10px;
    }

    
    .a-radio {
		display: block;
		height: 100px;
		margin-left: 0;
		line-height: 100px;
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