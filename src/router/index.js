// require.ensure 是 Webpack 的特殊语法，用来设置 code-split point

const Test = resolve => {
    require.ensure(['@/views/yindex.vue'], () => {
        resolve(require('@/views/yindex.vue'));
    });
};

const Hot = resolve => {
    require.ensure(['@/views/artical/hot/hot.vue'], () => {
        resolve(require('@/views/artical/hot/hot.vue'));
    });
};

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

const ArticalContent = resolve => {
    require.ensure(['@/views/artical/artical.vue'], () => {
        resolve(require('@/views/artical/artical.vue'));
    });
};

const ChartIndice = resolve => {
    require.ensure(['@/views/chart/indice.vue'], () => {
        resolve(require('@/views/chart/indice.vue'));
    });
};
const ChartBond = resolve => {
    require.ensure(['@/views/chart/bond.vue'], () => {
        resolve(require('@/views/chart/bond.vue'));
    });
};
const ChartForex = resolve => {
    require.ensure(['@/views/chart/forex.vue'], () => {
        resolve(require('@/views/chart/forex.vue'));
    });
};
const ChartVirtualcurrency = resolve => {
    require.ensure(['@/views/chart/virtualcurrency.vue'], () => {
        resolve(require('@/views/chart/virtualcurrency.vue'));
    });
};

const commonParent = {
    template: `<router-view></router-view>`
};

const routes = [{
    path: '/',
    name: 'index',
    redirect: '/chart',
    component: commonParent,
    meta: { title: '财经信息收集系统', nameCn: '首页' }
}, {
    path: '/chart',
    name: 'chart',
    showNav: true,
    component: commonParent,
    redirect: '/chart/forex',
    meta: { title: '财经信息收集系统', nameCn: '行情数据' },
    children: [{
        path: 'forex',
        name: 'chart-forex',
        component: ChartForex,
        meta: { nameCn: '外汇', icon: 'el-icon-date', notShowNav: false }
    }, {
        path: 'indice',
        name: 'chart-indice',
        component: ChartIndice,
        meta: { nameCn: '股指期货', icon: 'el-icon-date', notShowNav: false }
    }, {
        path: 'bond',
        name: 'chart-bond',
        component: ChartBond,
        meta: { nameCn: '债券', icon: 'el-icon-date', notShowNav: false }
    }, {
        path: 'virtualcurrency',
        name: 'chart-virtualcurrency',
        component: ChartVirtualcurrency,
        meta: { nameCn: '数字货币', icon: 'el-icon-date', notShowNav: false }
    }]
}, {
    path: '/artical',
    name: 'artical',
    showNav: true,
    component: commonParent,
    redirect: '/artical/finance/people',
    meta: { title: '财经信息收集系统', nameCn: '资讯新闻' },
    children: [{
        path: 'hot',
        name: 'hot',
        component: Hot,
        meta: { nameCn: '热点', icon: 'el-icon-date', notShowNav: false }
    }, {
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
    }, {
        path: 'content/:id?',
        name: 'content',
        component: ArticalContent,
        meta: { notShowNav: true }
    }]
}, {
    path: '/test',
    name: 'test',
    component: Test,
    meta: { nameCn: '宏观', icon: 'el-icon-document', notShowNav: true }
}, {
    path: '*',
    component: resolve => {
        window.location.href = '/404';
    }
}];

export default routes;