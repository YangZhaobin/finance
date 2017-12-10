import 'babel-polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueLazyload from 'vue-lazyload';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import ElHeader from './components/header.vue';
import ElNav from './components/nav.vue';
import App from './App.vue';

import routes from './router/index';
import axios from 'axios';
import '@css/base.less';

Vue.prototype.axios = axios;
Vue.use(VueRouter);
Vue.use(VueLazyload);
Vue.use(ElementUI);
Vue.component(ElHeader.name, ElHeader);
Vue.component(ElNav.name, ElNav);

const router = new VueRouter({
    mode: 'history',
    routes
});

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});