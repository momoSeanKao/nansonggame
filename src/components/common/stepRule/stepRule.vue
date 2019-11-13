<template>
    <div :class="[!gameRuleShow?'anim-opacity2':'','mask_box','game_rule']">
        <div class="game_rule_box">
            <div class="game_start_icon">
                <!--<span @click="startGame">我知道了</span>-->
                <img style="width: 2rem;" @click="startGame" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP4AAABeCAYAAAADiqm/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEMjdCOEM0OTlENUExMUU5OEZGMTg1NEZCQzc5MjY0QSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEMjdCOEM0QTlENUExMUU5OEZGMTg1NEZCQzc5MjY0QSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkQyN0I4QzQ3OUQ1QTExRTk4RkYxODU0RkJDNzkyNjRBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkQyN0I4QzQ4OUQ1QTExRTk4RkYxODU0RkJDNzkyNjRBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YntBNgAAFn5JREFUeNrsXWtwZEUV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" alt="">
            </div>
            <div class="step-box">
                <div class="game_rule_title" v-html="stepTitle"></div>
                <div class="game_rule_content" v-html="stepRule">

                </div>
                <div class="content-tips" v-text="stepTips"></div>
            </div>
            <div class="startGame-icon" @click="startGame" v-html="stepLogo">

            </div>
        </div>
    </div>
</template>
<script>
    //html:游戏规则
    //@gameStart:游戏开始
    export default {
        name: "gameRule",
        data() {
            return {
                gameRuleShow: true
            }
        },
        props: ["html", "stepTitle", "stepRule", "stepTips", "stepLogo"],
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
            startGame(callBack) {
                let that = this;
                that.gameRuleShow = false;
                setTimeout(() => {
                    $(".game_rule").hide();
                    that.$emit('gameStart');
                }, 800);
            }
        }
    }
</script>
<style scoped lang="less">
    @import "../../../assets/css/common.less";
    @import "./stepRule.less";
</style>