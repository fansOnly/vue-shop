import Vue from 'vue';
import toastComponent from '@/components/Toast';

class Toast{
    constructor() {
        this.config = {
            text: '',
            show: false,
            duration: 1500
        };
        this.initDom(this.config);
    }
    
    initDom(option){
        const toastConstructor = Vue.extend(toastComponent);
        const toastDom = new toastConstructor({
            el: document.createElement("div"),
            data(){
                return option
            }
        })
        // toastDom.$mount('#app');
        document.body.appendChild(toastDom.$el);
    }


    show(option, cb){
        this.config.show = true;
        this.config.text = option.text;
        setTimeout(() => {
            this.config.show = false;
            if(typeof(cb) === "function"){
                cb();
            }
        },  option.duration ? option.duration : this.config.duration);
    }

    hide(cb){
        this.config.show = false;
        if(typeof(cb) === "function"){
            cb();
        }
    }
}

export default Toast;