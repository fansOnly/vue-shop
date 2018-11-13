<template>
    <transition name=''>
        <div class="toast" v-if="show" :class="show ? 'fadein' : 'fadeout'">
            {{text}}
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'Toast'
    }
</script>
<style scoped>
.toast {
    position: fixed;
    left: 50%;
    top:50%;
    background: rgba(0,0,0,.4);
    padding: 10px;
    border-radius: 5px;
    font-size: 12px;
    text-align: justify;
    transform: translate(-50%,-50%);
    color:#fff;
    word-wrap:break-word;
    z-index: 99999;
}
.fadein {
    animation: animate_in 0.25s;
  }
  .fadeout {
    animation: animate_out 0.25s;
    opacity: 0;
  }
  @keyframes animate_in {
    0% {
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
  @keyframes animate_out {
    0% {
      opacity: 1;
    }
    100%{
      opacity: 0;
    }
  }
</style>