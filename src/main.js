import Vue from 'vue';
import App from './App';
import router from './router';
import Vuex from 'vuex';
import Axios from 'axios'
import "babel-polyfill";
import 'vue-area-linkage/dist/index.css';
import common from './common'


Vue.prototype.$axios = Axios;
Axios.defaults.baseURL = 'https://app.bowu66.com/museum-cms/';
Axios.defaults.headers.post['Content-Type'] = 'application/json';
Vue.config.productionTip = false;


//定义全局变量
Vue.use(common);
Vue.use(Vuex);
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    next();
});
// store
const store = new Vuex.Store({
    state: {
        user: {},//登录用户账号,全局变量，如果要刷新还在，请保存至session缓存中
        audioPlay: (() => {
            let audioPlay = sessionStorage.getItem("audioPlay");
            return audioPlay ? audioPlay : "pause";
        })(),
        highAudioPlay: (() => {
            let highAudioPlay = sessionStorage.getItem("highAudioPlay");
            return highAudioPlay ? highAudioPlay : "pause";
        })()
    },
    getters: {},
    mutations: {
        setAudioPlay(state, audioPlay) {//state状态值，
            state.audioPlay = audioPlay;
            window.localStorage.setItem('audioPlay', audioPlay);//更新缓存
        },
        setHighAudioPlay(state, audioPlay) {//state状态值，upload用户个人信息
            state.highAudioPlay = audioPlay;
            window.localStorage.setItem('highAudioPlay', audioPlay);//更新缓存
        },
    }
});

new Vue({
    router,
    store: store,
    render: h => h(App)
}).$mount('#app');
