<template>
    <div>
        <form class="search-box">
            <div class="search-wrap">
                <div class="search-area" :style="{ width: width}" @click="showSearch">
                    <span class="iconfont icon-search"></span>
                    <span class="search-text" :style="{visibility: visibility}">Search</span>
                </div>
                <input type="text" :class="['search_input', { search_input_focus: autofocus }]" v-model="input"
                    placeholder="Search" :autofocus="autofocus" @focus="inputFocus" @input="inputTyping" />
                <span v-if="showClose" class="iconfont icon-iclose" @click="clearInput"></span>
            </div>
            <span class="btn-cancel" :style="{marginRight: marginRight}" @click="hideSearch">取消</span>
        </form>
    </div>
</template>


<script>
    export default {
        name: 'Search',
        data() {
            return {
                input: '',
                autofocus: false,
                width: 'auto',
                marginRight: '-40px',
                visibility: 'visible',
                showClose: false
            }
        },
        methods: {
            showSearch: function () {
                this.width = '80px';
                this.marginRight = 0;
                this.autofocus = true;
                this.visibility = 'hidden';
            },
            hideSearch: function () {
                this.width = 'auto';
                this.marginRight = '-40px';
                this.autofocus = false;
                this.visibility = 'visible';
                this.showClose = false;
            },
            inputFocus: function () {
                if (this.input.length > 0) {
                    this.showClose = true;
                }
            },
            inputTyping: function () {
                if (this.input.length > 0) {
                    this.showClose = true;
                }
            },
            clearInput: function () {
                this.input = '';
            }
        },
        // directives: {
        // 	focus: {
        // 		inserted: function (el, value) {
        // 			if (value) {
        // 				el.focus();
        // 			}
        // 		}
        // 	}
        // },
    }
</script>
<style scoped>
    .search-box {
        display: -webkit-box;
        display: flex;
        align-items: center;
        width: 100%;
        text-align: center;
        padding: 10px;
        background: #eee;
        overflow: hidden;
    }

    .search-wrap {
        position: relative;
        width: 100%;
        background: #fff;
        border-radius: 3px;
        height: 32px;
        line-height: 32px;
        overflow: hidden;
    }

    .search-area {
        display: -webkit-box;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 0;
        right: 0;
        height: 32px;
        line-height: 32px;
        background: #fff;
        border-radius: 3px;
        transition: width .3s, opacity .5s;
        z-index: 1;
    }

    .search-text {
        margin-left: 5px;
        color: #ddd;
    }

    .search_input {
        position: absolute;
        display: block;
        width: 100%;
        height: 32px;
        line-height: 32px;
        border: 0;
        background: transparent;
        border-radius: 3px;
        text-align: left;
        opacity: 0;
        outline: none;
    }

    .search_input_focus {
        opacity: 1;
        z-index: 2;
        padding: 0 10px 0 27px;
    }

    .icon-search::before {
        font-size: 16px;
        color: #ddd;
    }

    .icon-iclose {
        position: absolute;
        right: 5px;
        top: 50%;
        z-index: 3;
        font-size: 30px;
        transform: translateY(-50%);
    }

    .btn-cancel {
        width: 40px;
        height: 32px;
        line-height: 32px;
        padding-left: 7px;
        border-radius: 3px;
        color: #333;
        text-align: right;
        transition: margin-right .3s, opacity .3s;
    }
</style>