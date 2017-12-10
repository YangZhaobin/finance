// require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
const Yndex = resolve => {
    require.ensure(['../views/yindex.vue'], () => {
        resolve(require('../views/yindex.vue'));
    });
};

const Hongguan = resolve => {
    require.ensure(['../views/artical/people/hongguan.vue'], () => {
        resolve(require('../views/artical/people/hongguan.vue'));
    });
};

const Finance = resolve => {
    require.ensure(['../views/artical/people/finance.vue'], () => {
        resolve(require('../views/artical/people/finance.vue'));
    });
};

const Industry = resolve => {
    require.ensure(['../views/artical/people/industry.vue'], () => {
        resolve(require('../views/artical/people/industry.vue'));
    });
};

const International = resolve => {
    require.ensure(['../views/artical/people/international.vue'], () => {
        resolve(require('../views/artical/people/international.vue'));
    });
};

const Comment = resolve => {
    require.ensure(['../views/artical/people/comment.vue'], () => {
        resolve(require('../views/artical/people/comment.vue'));
    });
};

const commonParent = {
    template: `<router-view></router-view>`
};

const routes = [{
    path: '/',
    name: 'index',
    redirect: '/artical',
    // component: commonParent,
    meta: { title: '财经信息收集系统', nameCn: '首页' }
}, {
    path: '/artical',
    name: 'artical',
    component: commonParent,
    redirect: '/artical/job',
    meta: { title: '财经信息收集系统', nameCn: '财经信息' },
    children: [{
        path: 'job',
        name: 'hongguan',
        component: Hongguan,
        meta: { nameCn: '人民网', icon: 'el-icon-date', notShowNav: false }
    }, {
        path: 'tencent',
        name: 'finance',
        component: Yndex,
        meta: { nameCn: '腾讯新闻', icon: 'el-icon-document', notShowNav: false }
    }, {
        path: 'sina',
        name: 'industry',
        component: Yndex,
        meta: { nameCn: '新浪网', icon: 'el-icon-message', notShowNav: false }
    }, {
        path: 'netease',
        name: 'comment',
        component: Yndex,
        meta: { nameCn: '网易新闻', icon: 'el-icon-info', notShowNav: false }
    }]
}, {
    path: '*',
    component: resolve => {
        window.location.href = '/404';
    }
}];

export default routes;