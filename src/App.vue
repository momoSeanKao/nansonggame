<template>
	<div id="app">
		<!--<keep-alive>-->
		<router-view></router-view>
		<!--</keep-alive>-->
		<!--<div v-show="!isWeixin" style="position: fixed;width: 100%;height: 100%;left: 0;top: 0;z-index: 10000">请使用手机等移动设备打开</div>-->
		<audio id="second-game-bgm">
			<source src="https://app.bowu66.com/museum-cms/upload/nansongGame/secondSound/head-bgm.mp3"
					type="audio/mp3">
		</audio>
		<audio id="tooHighFire" preload="auto">
			<source src="https://app.bowu66.com/museum-cms/upload/nansongGame/kiln/fire-too-high.mp3"
					type="audio/mp3">
		</audio>
	</div>
</template>
<script>
    import {mapMutations, mapState, mapGetters} from 'vuex'
    import wechat from './assets/js/wechat'

    export default {
        name: "diglett",
        data() {
            return {
                isWeixin: true
            }
        },
        mounted() {//挂载结束状态
            let ua = navigator.userAgent.toLowerCase();
            let isWeixin = ua.indexOf('micromessenger') != -1;
            if (isWeixin) {
                this.isWeixin = true;
            } else {
                this.isWeixin = false;
            }
            let that = this;

            $(function () {
                pushHistory();
                window.addEventListener("popstate", (e) => {
                    console.log(location.href);
                    console.log(history);
                    let currentHref = location.href;
                    if (currentHref.indexOf("molding") > -1) {
                        that.$router.go(-2);
                    } else if (currentHref.indexOf("coloured") > -1) {
                        that.$router.go(-3);
                    } else if (currentHref.indexOf("kiln") > -1) {
                        that.$router.go(-4);
                    } else if (currentHref.indexOf("chart") > -1) {
                        that.$router.go(-5);
                    }
                }, false);

                function pushHistory() {
                    var state = {
                        title: "title",
                        url: "#"
                    };
                    window.history.pushState(state, "title", "#");
                }
            });
            wechat.Handler();

            // window.onpopstate = () => {
            //     let allowbacktype = sessionStorage.getItem("allowbacktype");
            //     if (!allowbacktype) {
            //         history.go(1)
            //     }
            // }
        },
        watch: {
            '$store.state.audioPlay'(val) {
                if (val == "play") {
                    this.bgInit($('#second-game-bgm')[0]);
                }
            },
            '$store.state.highAudioPlay'(val) {
                console.log(val);
                if (val == "play") {
                    this.bgInit($('#tooHighFire')[0]);
                }
                if (val == "pause") {
                    $('#tooHighFire')[0].pause();
                }
            },
        },
        computed: {},
        methods: {
            bgInit(music) {
                let state = 0;
                document.addEventListener('touchstart', () => {
                    if (state == 0) {
                        this.waitPlay(music);
                        state = 1;
                    }
                }, false);

                document.addEventListener("WeixinJSBridgeReady", () => {
                    music.play();
                }, false);
                this.waitPlay(music);
                //循环播放
                music.onended = function () {
                    music.load();
                    music.play();
                }
            },
            waitPlay(music) {
                setTimeout(() => {
                    music.play();
                }, 200)
            },
        }
    }
</script>

<style>
	@import "../static/css/main.css";
	/*@import "../static/css/color-dark.css";*/
	/*!*深色主题*!*/
	/*@import "../static/css/case1.css"; !*注解样式*!*/
</style>
