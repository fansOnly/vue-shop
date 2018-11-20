<template>
    <div>
        <p @click="login">登录</p>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'
    export default {
        name: 'Login',
        data(){
            return {}
        },
        computed: {
            ...mapGetters({
                user: 'user/GetUser'
            })
        },
        mounted() {
            if(localStorage.getItem('token')){
                this.$router.push('/');
            }
        },
        methods:{
            ...mapActions({
                SetUser: 'user/SetUser'
            }),
            async login(){
                // ...TODO登录逻辑
                // ...TODO登录成功
                this.user_id = 1;
                Toast.show({
                    text: 'success',
                },this.GetuserInfo());
            },
            GetuserInfo(){
                this.$api.get('User/GetuserInfo', {user_id: this.user_id})
                .then(res=>{
                    console.log("GetuserInfo", res);
                    this.SetUser({user: res.user});
                    // localStorage.setItem("user", JSON.stringify(res.user));
                    // token加密
                    let sha256 = require("js-sha256").sha256;
                    const time = new Date().getTime();
                    const tag = 'snowe-vue-test';
                    let hash = sha256(this.user_id + time + tag);
                    localStorage.setItem("token", hash);
                    this.$router.push(this.$route.query.redirect);
                })
            }
        }
    }
</script>