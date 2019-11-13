import Vue from 'vue';
import Router from 'vue-router';
import wechat from '../assets/js/wechat';

Vue.use(Router);
const router = new Router({
    routes: [{
        path: '/',
        component: resolve => require(['../components/page/diglett/diglett.vue'], resolve),
        meta: {
            title: '打地鼠',
            allowBack: false
        },
    }, {
        path: '/diglett',
        component: resolve => require(['../components/page/diglett/diglett.vue'], resolve),
        meta: {
            title: '打地鼠',
            allowBack: false
        },
    }, {
        path: '/molding',
        component: resolve => require(['../components/page/molding/molding.vue'], resolve),
        meta: {
            title: '成型',
            allowBack: false
        },
    }, {
        path: '/returnOwner',
        component: resolve => require(['../components/page/returnOwner/returnOwner.vue'], resolve),
        meta: {
            title: '物归原主',
            allowBack: false
        },
    }, {
        path: '/coloured',
        component: resolve => require(['../components/page/coloured/coloured.vue'], resolve),
        meta: {
            title: '上釉',
            allowBack: false
        },
    }, {
        path: '/kiln',
        component: resolve => require(['../components/page/kiln/kiln.vue'], resolve),
        meta: {
            title: '烧成',
            allowBack: false
        },
    }, {
        path: '/repair',
        component: resolve => require(['../components/page/repair/repair.vue'], resolve),
        meta: {
            title: '瓷器修复',
            allowBack: false
        },
    }, {
        path: '/chart',
        component: resolve => require(['../components/page/chart/chart.vue'], resolve),
        meta: {
            title: '查看榜单',
            allowBack: false
        },
    }, {
        path: '/index',
        component: resolve => require(['../components/page/index/index.vue'], resolve),
        meta: {
            title: '授权',
            allowBack: false
        },
    },]
});

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    next();
    // let allowBack = true    //    给个默认值true
    // if (to.meta.allowBack !== undefined) {
    //     allowBack = to.meta.allowBack
    // }
    // if (!allowBack) {
    //     history.pushState(null, null, location.href)
    // }
    // sessionStorage.setItem("allowbacktype", allowBack);
    // history.pushState(null, null, null)
});
export default router