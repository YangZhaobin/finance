// require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
const Finance = resolve => {
    require.ensure(['@/views/artical/finance/finance.vue'], () => {
        resolve(require('@/views/artical/finance/finance.vue'));
    });
};

const Hongguan = resolve => {
    require.ensure(['@/views/artical/hongguan/hongguan.vue'], () => {
        resolve(require('@/views/artical/hongguan/hongguan.vue'));
    });
};

const Industry = resolve => {
    require.ensure(['@/views/artical/industry/industry.vue'], () => {
        resolve(require('@/views/artical/industry/industry.vue'));
    });
};

const International = resolve => {
    require.ensure(['@/views/artical/international/international.vue'], () => {
        resolve(require('@/views/artical/international/international.vue'));
    });
};

const commonParent = {
    template: `<router-view></router-view>`
};

const routes = [{
    path: '/',
    name: 'index',
    redirect: '/artical',
    component: commonParent,
    meta: { title: '财经信息收集系统', nameCn: '首页' }
}, {
    path: '/artical',
    name: 'artical',
    component: commonParent,
    redirect: '/artical/finance/people',
    meta: { title: '财经信息收集系统', nameCn: '财经信息' },
    children: [{
        path: 'finance/:from?',
        name: 'finance',
        component: Finance,
        meta: { nameCn: '金融', icon: 'el-icon-date', notShowNav: false }
    }, {
        path: 'hongguan/:from?',
        name: 'hongguan',
        component: Hongguan,
        meta: { nameCn: '宏观', icon: 'el-icon-document', notShowNav: false }
    }, {
        path: 'industry/:from?',
        name: 'industry',
        component: Industry,
        meta: { nameCn: '行业', icon: 'el-icon-message', notShowNav: false }
    }, {
        path: 'international/:from?',
        name: 'international',
        component: International,
        meta: { nameCn: '国际', icon: 'el-icon-info', notShowNav: false }
    }]
}, {
    path: '*',
    component: resolve => {
        window.location.href = '/404';
    }
}];

export default routes;