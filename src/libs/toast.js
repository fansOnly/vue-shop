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


    show(option){
        this.config.show = true;
        this.config.text = option.text;
        if(option.duration){
            setTimeout(() => {this.config.show = false},  option.duration);
        }
    }

    hide(){
        this.config.show = false;
    }
}

export default Toast;