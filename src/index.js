import 'babel-polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueLazyload from 'vue-lazyload';
import store from './vuex/store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import ElHeader from './components/header.vue';
import ElNav from './components/nav.vue';
import App from './App.vue';

import routes from './router/index';
import axios from './http';
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

store.dispatch('getUserInfo');

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});