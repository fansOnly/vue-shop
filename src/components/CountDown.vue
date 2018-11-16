<template>
    <div>
        {{countdown}}
    </div>
</template>
<script>
    export default {
        name: 'CountDown',
        props:{
            timetamp: Number
        },
        data(){
            return {
                countdown: '',
            }
        },
        computed:{
            timetampx(){
                return Number(this.timetamp);
            }
        },
        watch:{
            'timetamp'(e){
                console.log(e);
                this.countdown = Tools.CountDown(e, 2);
            }
        },
        mounted() {
            setInterval(()=>{
                this.timetamp--
            }, 1000);
        },
    }
</script>