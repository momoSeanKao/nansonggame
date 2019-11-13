<template>
    <div class="mask_box" v-show="countDownShow">
        <div class="count_down">{{countDownt}}</div>
        <audio id="three-second-bgm">
            <source src="https://app.bowu66.com/museum-cms/upload/nansongGame/secondSound/threeSecond.mp3" type="audio/mp3">
        </audio>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                countDownt: 3,
                countDownShow: false
            }
        },
        components: {//模板

        },
        methods: {//事件
            countDownT(callBack) {
                document.getElementById("three-second-bgm").play();
                this.countDownShow = true;
                this.countDownt = 3;
                let gameStart = setInterval(() => {
                    if (this.countDownt > 1) {
                        this.countDownt -= 1;
                    } else {
                        window.clearInterval(gameStart);
                        this.countDownShow = false;
                        document.getElementById("three-second-bgm").pause();
                        callBack && callBack();
                    }
                }, 1000);
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../../assets/css/common.less";
</style>
