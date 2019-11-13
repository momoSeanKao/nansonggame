<template>
    <div class="mask_box" v-show="refuseShow">
        <div>
            <!--<div class="box-title">提示</div>-->
            <!--<div class="box-content">挑战失败~</div>-->
            <!--<div class="box-button">-->
            <!--<div>-->
            <!--<span class="btn btn-warning" @click="restart">重新挑战</span>-->
            <!--<span class="btn btn-currency" @click="defaultGame">不玩啦</span>-->
            <!--</div>-->
            <!--</div>-->
            <div class="fail-icon-box">
                <img src="https://app.bowu66.com/museum-cms/upload/nansongGame/img/fail-icon.png" alt="">
            </div>
            <div class="fail-click">
                <span @click="restart" :class="[showDefault?'':'singleButton']">
                    <img src="https://app.bowu66.com/museum-cms/upload/nansongGame/img/fail-play-again.png" alt="">
                </span>
                <span @click="defaultGame" style="text-align: left;" v-show="showDefault">
                    <img src="https://app.bowu66.com/museum-cms/upload/nansongGame/img/fail-restart.png" alt="">
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    //refuseShow:现实与否
    //@restart:重新玩耍
    //@defaultGame:不玩了
    export default {
        name: "pass",
        data() {
            return {}
        },
        props: ["refuseShow","showDefault"],
        activated() {

        },
        beforeCreate() {//创建前状态

        },
        created() {//创建完毕状态

        },
        beforeMount() {//挂载前状态

        },
        mounted() {//挂载结束状态

        },
        components: {//模板

        },
        methods: {//事件
            restart() {
                this.$emit("restart");
            },
            defaultGame() {
                this.$emit("defaultGame");
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../../assets/css/common.less";
    @import "./refuse.less";
</style>