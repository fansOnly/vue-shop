import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);



import Home from "../views/Home.vue";
import Category from "../views/Category.vue";


const routes = [
    { path: '/', name: 'name', component: Home },
    { path: '/category', name: 'category', omponent: Category },
];

const router = new VueRouter({
    mode: 'history',
    routes
})


export default router;