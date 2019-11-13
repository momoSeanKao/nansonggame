<template>
    <div class="game_box">
        <!--游戏容器-->
        <div class="game_container">
            <!--游戏提示区-->
            <div class="game_tips_box">
                <!--步骤-->
                <div class="game-step">
                    <img src="https://app.bowu66.com/museum-cms/upload/nansongGame/img/step3.png" alt="">
                </div>
                <div class="box-shadow"></div>
                <!--游戏倒计时-->
                <div class="totalTime">{{totalTime}}S</div>
                <!--<div class="counts">剩余机会：{{counts}}次</div>-->
            </div>
            <!--中控台-->
            <div class="cart_control" :style="{'z-index':person2Show?'100':'1'}">
                <!--小车-->
                <div class="cart_box">
                    <img class="personType1"
                         src="https://app.bowu66.com/museum-cms/upload/nansongGame/coloured/person1.png" alt="">
                    <img style="display: none;" class="personType2"
                         src="https://app.bowu66.com/museum-cms/upload/nansongGame/coloured/person2.png" alt="">
                    <img style="display: none;" class="personType3"
                         src="https://app.bowu66.com/museum-cms/upload/nansongGame/coloured/person3.png" alt="">
                    <img style="display: none;" class="personType4"
                         src="https://app.bowu66.com/museum-cms/upload/nansongGame/coloured/person4.png" alt="">
                </div>
            </div>
            <!--游戏操作区-->
            <div class="game_operation_box">
                <div class="floor-bg">
                    <img src="https://app.bowu66.com/museum-cms/upload/nansongGame/coloured/floor-bg.png" alt="">
                </div>
                <div class="bucket_box" @click="downgrade"></div>
            </div>
        </div>
        <!--通过-->
        <pass :passWord="false" :passShow="passShow" :gotoShow="gotoShow"
              @gotoPage="gotoPage"></pass>
        <!--失败-->
        <refuse :refuseShow="refuseShow" @restart="restart" @defaultGame="defaultGame" :showDefault="true"></refuse>
        <!--规则-->
        <gameRule :stepRule="stepRule"
                  :stepTips="stepTips"
                  :stepLogo="stepLogo"
                  :stepTitle="stepTitle" ref="gameRule" @gameStart="gameStart"></gameRule>
        <!--游戏开始倒计时-->
        <countDownT ref="countDownChild"></countDownT>
    </div>
</template>
<script>
    var t1, t2;
    import countDownT from "../../common/countDown/countDown"
    import gameRule from "../../common/stepRule/stepRule"
    import pass from "../../common/pass/pass"
    import refuse from "../../common/refuse/refuse"

    export default {
        name: "coloured",
        data() {
            return {
                direction: "left",//车子方向(向左，向右)
                person2Show: false,
                downDirection: "bottom",//绳子方向(向下，向上)
                canPlay: false,//是否能开始游戏
                totalTime: 30,//游戏时长
                counts: 3000,//剩余次数
                certSpeed: 8,//卡车速度
                certtime: 25,//卡车更新时间
                downtime: 20,//下降上升时间
                downspeed: 5,//下降速度
                caddyPic: [
                    ("https://app.bowu66.com/museum-cms/upload/nansongGame/coloured/caddy_noColor.png"),
                    ("https://app.bowu66.com/museum-cms/upload/nansongGame/coloured/caddy_haveColor.png")
                ],
                gameRule: "蘸釉工人左右移动，请点击'蘸釉'按钮，使工人能将陶瓷放入染缸中上釉如上釉成功，则会出现上釉成功的团",//游戏规则
                stepRule: "<div style='padding-bottom: 1rem;'>在瓷坯表面施以釉浆。施釉可使烧成的瓷器表面光洁细腻，色彩缤纷。施釉的方法有<span class='organ-word'>蘸釉、荡釉、浇釉、刷釉、吹釉</span>等多种方法。</div>",
                stepTips: "我们的上釉工人会左右移动，请对准釉缸点击“蘸釉”按钮，完成上釉的步骤。",
                stepTitle: "【上釉】",
                stepLogo: "<div class='icon-box'>" +
                        // "<img src='" + ('https://app.bowu66.com/museum-cms/upload/nansongGame/diglett/stone4.png') + "' alt=''>" +
                        "<span style='line-height: 1.2rem;display: block;font-size: 16px;'>蘸釉</span>" +
                        "</div>" +
                        "<div class='hand-box'>" +
                        "<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAAEYCAYAAACHjumMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozMjk1NTMxMDY1QTAxMUU5OEFEOUIyMDJDMERCQzBGRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozMjk1NTMxMTY1QTAxMUU5OEFEOUIyMDJDMERCQzBGRCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjMyOTU1MzBFNjVBMDExRTk4QUQ5QjIwMkMwREJDMEZEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjMyOTU1MzBGNjVBMDExRTk4QUQ5QjIwMkMwREJDMEZEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+yvN1PAAARRBJREFUeNrsXQeAFOX1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' alt=''>" +
                        "</div>",
                // 通关
                gotoShow: true,
                passShow: false,
                // 失败
                refuseShow: false,
            }
        },
        computed: {
            normal: () => {
                let windowHeight = $("body").height();
                let windowWidth = $("body").width();
                let bucketScal = 140 / 126;

                return {
                    windowWidth: windowWidth,
                    windowHeight: windowHeight,
                    bucketWidth: bucketScal * 4
                }
            }
        },
        mounted() {//挂载结束状态
        },
        components: {//模板
            countDownT, gameRule, pass, refuse
        },
        methods: {//事件
            // 游戏开始
            gameStart() {
                let that = this;
                this.$refs.countDownChild.countDownT(() => {
                    this.countDown();
                    this.radomMove();
                    that.canPlay = true;
                });
            },
            // 重新开始游戏
            restart() {
                this.totalTime = 30;
                // this.counts = 3;
                this.refuseShow = false;
                this.gameStart()
            },
            defaultGame() {
                this.$router.push('/diglett');
            },
            // 游戏暂停
            stopGame() {
                this.canPlay = false;
                this.refuseShow = true;
                if (t1) {
                    window.clearInterval(t1);
                    t1 = null;
                }
                if (t2) {
                    window.clearInterval(t2);
                    t2 = null;
                }
                $(".cart_control").css({
                    left: "0"
                })
            },
            // 游戏时间倒计时
            countDown() {
                let that = this;
                t1 = window.setInterval(() => {
                    if (that.totalTime > 0) {
                        that.totalTime -= 1;
                    } else {
                        that.stopGame()
                    }
                }, 1000);
            },
            // 容器左右移动
            radomMove() {
                let that = this;
                if (t2) {
                    window.clearInterval(t2);
                    t2 = null;
                }
                t2 = window.setInterval(() => {
                    let left = parseFloat($(".cart_control").css("left").split("px")[0]);
                    if (that.direction == "left") {
                        if (left < (that.normal.windowWidth - ($(".cart_box>img").width() / 2))) {
                            $(".cart_control").css({
                                left: (left + that.certSpeed) + 'px'
                            })
                        } else {
                            that.direction = "right";
                        }
                    } else {
                        if (left > $(".cart_box>img").width() / 2) {
                            $(".cart_control").css({
                                left: (left - that.certSpeed) + 'px'
                            })
                        } else {
                            that.direction = "left";
                        }
                    }

                }, that.certtime);
            },
            // 下降
            downgrade() {
                if (t2) {
                    window.clearInterval(t2);
                    t2 = null;
                }
                let that = this;
                if (this.canPlay) {
                    this.canPlay = false;
                    // if (this.counts > 0) {
                    let fillBoxLeft = parseFloat($(".cart_control").css("left").split("px")[0]);
                    let bucketBoxLeft = parseFloat($(".bucket_box").css("left").split("px")[0]);
                    let bucketBoxWidth = $(".bucket_box").width();
                    if (Math.abs(bucketBoxLeft - fillBoxLeft) < 25) {
                        // 成功
                        $(".cart_control").css({
                            left: that.normal.windowWidth / 2
                        });
                        setTimeout(() => {
                            that.person2Show = true;
                            $(".personType1").hide();
                            $(".personType2").show();
                            $(".personType3").hide();
                            $(".personType4").hide();
                        }, 500);
                        setTimeout(() => {
                            that.person2Show = false;
                            $(".personType1").hide();
                            $(".personType2").hide();
                            $(".personType3").show();
                            $(".personType4").hide();
                        }, 1000);
                        setTimeout(() => {
                            window.clearInterval(t1);
                            that.passShow = true;
                        }, 1500);
                    } else {
                        that.person2Show = false;
                        setTimeout(() => {
                            $(".personType2").hide();
                            $(".personType3").hide();
                            $(".personType1").hide();
                            $(".personType4").show();
                        }, 500);
                        setTimeout(() => {
                            $(".personType1").show();
                            $(".personType2").hide();
                            $(".personType3").hide();
                            $(".personType4").hide();
                        }, 1000);
                        setTimeout(() => {
                            // that.counts -= 1;
                            that.radomMove();
                            that.canPlay = true;
                        }, 1500);
                    }
                    // } else {
                    //     this.refuseShow = true;
                    //     this.stopGame();
                    // }
                }
            },
            // 查看榜单
            gotoPage() {
                let that = this;
                let totalScore = parseInt(sessionStorage.getItem("totalScore"));
                sessionStorage.setItem('totalScore', totalScore + (that.totalTime > 39 ? (35 + that.$randomNum(1,5)) : that.totalTime));
                this.$router.push('/kiln');
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../../assets/css/common.less";
    @import "./coloured.less";
</style>