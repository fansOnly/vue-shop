<template>
    <div>
        <p @click="login">登录</p>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data(){
            return {}
        },
        mounted() {
        },
        methods:{
            login(){
                let sha256 = require("js-sha256").sha256;
                const user_id = 1;
                const time = new Date().getTime();
                const tag = 'snowe-vue-test';
                let hash = sha256(user_id + time + tag);
                localStorage.setItem("token", hash);
                Toast.show({
                    text: 'success',
                },()=>{this.$router.push(this.$route.query.redirect)});
            }
        }
    }
</script>