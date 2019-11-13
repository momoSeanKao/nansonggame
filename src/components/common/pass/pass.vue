<template>
    <div class="mask_box" v-show="passShow">
        <div class="game_pass_box">
            <!--<div class="game_pass_title" v-html="passWord"></div>-->
            <!--<div class="game_start_icon" v-show="gotoShow">-->
            <!--<span class="btn btn-warning" @click="gotoPage" v-html="nextStepWord">挑战下一关</span>-->
            <!--</div>-->
            <div class="complete-icon">
                <img src="https://app.bowu66.com/museum-cms/upload/nansongGame/img/complete-icon.png" alt="">
            </div>
            <div class="next-step" @click="gotoPage">
                <img src="https://app.bowu66.com/museum-cms/upload/nansongGame/img/next-step.png" alt="" v-show="!passWord">
                <img src="https://app.bowu66.com/museum-cms/upload/nansongGame/img/check-chart.png" alt="" v-show="passWord">
            </div>
        </div>
    </div>
</template>

<script>
    //gotoPage:页面跳转
    //passShow:显示与否
    //gotoShow:按钮现实与否
    //passWord:通关文案
    export default {
        name: "pass",
        data() {
            return {}
        },
        props: {
            "passShow": {}, "gotoShow": {}, "passWord": {
                default: false
            }, nextStepWord: {
                default: "挑战下一关"
            }
        },
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
            gotoPage() {
                this.$emit("gotoPage");
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../../assets/css/common.less";
    @import "./pass.less";
</style>