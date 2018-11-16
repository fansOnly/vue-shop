<template>
    <div style="display:inline;">
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
                timetampx: this.timetamp
            }
        },
        computed:{
            // countdown(){
                // return Tools.CountDown(this.timetampx, 2);
            // },
        },
        watch:{
            'timetampx'(e){
                this.countdown = Tools.CountDown(e, 2);
            }
        },
        mounted() {
            setInterval(()=>{
                this.timetampx--
            }, 1000);
        },
    }
</script>