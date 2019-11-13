<template>
	<div class="game_box">
		<!--游戏背景，分上下-->
		<div class="game_container">
			<!--步骤-->
			<div class="game_tips_box">
				<div class="game-step">
					<img src="https://app.bowu66.com/museum-cms/upload/nansongGame/img/step2.png" alt="">
				</div>
			</div>
			<!--游戏操作区-->
			<div class="type-list-box">
				<div class="list-item" v-for="(item,i) in wayList">
					<div class="list-pic">
						<div class="catch-way-box">
							<img :src="item.url" alt="">
						</div>
						<div class="catch-larg" @click="opacityShow(i,$event)">
							<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA39pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkZTc4OGUwYS0yZjJkLTg5NGMtYjcyZi01OGZmMzdjODE3NmEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUQ0Njc1QTk2NUFDMTFFOTkwMzE4N0FCRDFCOUFCNDMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUQ0Njc1QTg2NUFDMTFFOTkwMzE4N0FCRDFCOUFCNDMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmEyOWJlZGExLTYzMzItNGU0NC04OGJjLWZkYjFjMzUwYzFjMiIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjcxNGZmM2ExLTM0NTUtMTU0MS1hZDkxLTcxMDM0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"
								 alt="">
						</div>
					</div>
					<div class="list-choose" @click.stop="chooseWay(i,$event)" :data-index="i" :data-name="item.name">
						<div class="list-checkbox">
							<img :src="item.choose?('https://app.bowu66.com/museum-cms/upload/nansongGame/molding/choosed.png'):('https://app.bowu66.com/museum-cms/upload/nansongGame/molding/outchoose.png')"
								 alt="">
						</div>
						<div class="choose-title">{{item.name}}</div>
					</div>
				</div>
			</div>
			<div class="submit-button"
				 @click="submitClick">
			</div>
		</div>
		<div class="way-dialog" v-show="wayDialog">
			<div class="way-dialog-content opacity-hide" @click.stop="opacityHide">
				<div class="got-it">我知道了</div>
				<div class="way-dialog-word">
					<div class="way-dialog-title">【{{wayList[bigIndex].name}}】</div>
					<div class="way-dialog-main">
						{{wayList[bigIndex].content}}
					</div>
					<div class="way-dialog-tips">
						<img :src="wayList[bigIndex].url" alt="">
					</div>
				</div>
			</div>
		</div>
		<!--<countDownT ref="countDownChild"></countDownT>-->
		<!--通过-->
		<pass :passShow="passShow" :gotoShow="gotoShow" @gotoPage="gotoPage" :passWord="false"></pass>
		<!--失败-->
		<refuse :showDefault="true" :refuseShow="refuseShow" @restart="restart" @defaultGame="defaultGame"></refuse>
		<!--规则-->
		<stepRule :stepRule="stepRule"
				  :stepTips="stepTips"
				  :stepLogo="stepLogo"
				  :stepTitle="stepTitle" ref="gameRule" @gameStart="hideRule"></stepRule>
		<audio id="click_sound_box">
			<source src="https://app.bowu66.com/museum-cms/upload/nansongGame/secondSound/second-click.mp3"
					type="audio/mp3">
		</audio>
		<div class="fail-show" v-show="failvil">
			<div class="fail-icon-box">
				<div>请选择正确的成型方法</div>
			</div>
			<div class="sure-click" @click="failShow"></div>
		</div>
		<div class="tip-pic-box" v-show="tipPicShow" @click="gameStart">
			<div>猜猜我是用哪种成型工艺制作的？</div>
			<img :src='moldingList[index].url' alt=''>
		</div>
	</div>
</template>

<script>
    var t1;
    var clickCount = 1;
    import countDownT from "../../common/countDown/countDown";
    import stepRule from "../../common/stepRule/stepRule";
    import pass from "../../common/pass/pass";
    import refuse from "../../common/refuse/refuse";

    export default {
        name: "diglett",
        data() {
            return {
                // 开场动画参数
                animationShow: true,//开场动画
                // 规则
                // stepRule: "<div>准备好配料后，需要通过<span class='organ-word'>手捏捏塑、泥条盘筑</span>等方法制作具有各种形状和尺寸的胚件。要注意不一样的瓷器采用的是不同的成型方法哦。" +
                // "</div>",
                stepRule: "<div>准备好坯料后，需要通过<span class='organ-word'>手捏、印模、拉坯</span>等方法制作具有各种形状和尺寸的坯件。要注意不一样的瓷器采用的是不同的成型方法哦。请根据屏幕出现的器物选择正确的成型方法。</div>",
                stepTips: "请根据屏幕出现的瓷器选择正确的成型方法。",
                stepTitle: "【成型】",
                stepLogo: "",
                tipPicShow: false,
                // 游戏参数
                canPlay: false,//是否可以开始游戏
                moldingList: [{
                    url: ("https://app.bowu66.com/museum-cms/upload/nansongGame/molding/molding1.png"),
                    name: "",
                    type: "手工捏塑法"
                }, {
                    url: ("https://app.bowu66.com/museum-cms/upload/nansongGame/molding/molding2.png"),
                    name: "",
                    type: "泥片围接法"
                }, {
                    url: ("https://app.bowu66.com/museum-cms/upload/nansongGame/molding/molding3.png"),
                    name: "",
                    type: "印模法"
                }, {
                    url: ("https://app.bowu66.com/museum-cms/upload/nansongGame/molding/molding4.png"),
                    name: "",
                    type: "轮制成型法"
                }],
                wayList: [{
                    url: ("https://app.bowu66.com/museum-cms/upload/nansongGame/molding/way1.png"),
                    name: "泥片围接法",
                    content: "将泥块加工成泥片，然后将泥片围接组合成需要的形状。",
                    choose: false
                }, {
                    url: ("https://app.bowu66.com/museum-cms/upload/nansongGame/molding/way2.png"),
                    name: "泥条盘筑法",
                    content: "将泥土搓成泥条，从器底盘从下往上将泥条盘筑成器，再用泥浆胶合成全器，最后抹平器壁盘筑时留下的泥缝。",
                    choose: false
                }, {
                    url: ("https://app.bowu66.com/museum-cms/upload/nansongGame/molding/way3.png"),
                    name: "手工捏塑法",
                    content: "用手随心所欲地对泥土进行创作，这是最原始最简单的成型方法。",
                    choose: false
                }, {
                    url: ("https://app.bowu66.com/museum-cms/upload/nansongGame/molding/way4.png"),
                    name: "印模法",
                    content: "将泥料嵌入特制的模子中成型的方法。主要用于制作陶瓷俑、动物和器物部件、纹饰等。",
                    choose: false
                }, {
                    url: ("https://app.bowu66.com/museum-cms/upload/nansongGame/molding/way5.png"),
                    name: "注浆法",
                    content: "把泥料灌入石膏等模子中，利用石膏模型的毛细管作用力将悬浮的浆料吸附于模具内壁而成型的方法。",
                    choose: false
                }, {
                    url: ("https://app.bowu66.com/museum-cms/upload/nansongGame/molding/way6.png"),
                    name: "轮制成型法",
                    content: "将泥料放置于轮盘，利用轮盘转动产生的离心力而成型的方法。主要用于圆体器型的制作。",
                    choose: false
                }],
                index: 0,
                chooseIndex: 0,
                bigIndex: 0,
                // 游戏完毕弹出框
                passShow: false,//通关弹出框
                gotoShow: true,
                refuseShow: false,//失败弹出框
                wayDialog: false,
                failvil: false,
                totalTime: 60,
            }
        },
        mounted() {//挂载结束状态
            let index = this.$getRandom(4, 0);
            this.index = index;
            this.stepLogo = "<div class='molding-pic-box'>" +
                "<img src='" + this.moldingList[index].url + "' alt=''>" +
                "<div class='molding-name'>" + this.moldingList[index].name + "</div>" +
                "</div>";
            let that = this;
            t1 = window.setInterval(() => {
                if (that.totalTime > 0) {
                    that.totalTime -= 1;
                } else {
                    if (t1) {
                        window.clearInterval(t1);
                        t1 = null;
                    }
                }
            }, 1000);
        },
        components: {//模板
            countDownT, stepRule, pass, refuse
        },
        methods: {//事件
            // 游戏开始
            gameStart() {
                this.tipPicShow = false;
                this.animationShow = false;
                let that = this;
                // this.$refs.countDownChild.countDownT(() => {
                // 开始倒计时
                // that.countDown();
                // 随机位置出现材料
                that.canPlay = true;
                // });
            },
            hideRule() {
                let that = this;
                this.animationShow = false;
                this.tipPicShow = true;
            },
            chooseWay(i, e) {
                this.chooseIndex = i;
                this.wayList.map((n, i) => {
                    return n.choose = false;
                });
                this.wayList[i].choose = true;
            },
            opacityHide() {
                let that = this;
                $('.way-dialog-content').removeClass("opacity-show").addClass("opacity-hide");
                setTimeout(() => {
                    this.wayDialog = false;
                }, 500);
            },
            opacityShow(i, e) {
                document.getElementById("click_sound_box").play();
                this.bigIndex = i;
                this.wayDialog = true;
                setTimeout(() => {
                    $('.way-dialog-content').removeClass("opacity-hide").addClass("opacity-show");
                }, 5);
            },
            gotoPage() {
                let totalScore = parseInt(sessionStorage.getItem("totalScore"));
                sessionStorage.setItem('totalScore', totalScore + (this.totalTime > 58 ? (50 + this.$randomNum(1, 5)) : this.totalTime));
                this.$router.push('/coloured');
            },
            submitClick() {
                if (this.wayList[this.chooseIndex].choose) {
                    // 展示图
                    // console.log(this.moldingList[this.index]);
                    // 选择
                    // console.log(this.wayList[this.chooseIndex]);
                    if (this.wayList[this.chooseIndex].name == this.moldingList[this.index].type) {
                        this.passShow = true;
                    } else {
                        this.failvil = true;
                    }
                } else {
                    this.failvil = true;
                }
            },
            failShow() {
                this.failvil = false;
            },
            restart() {
            },
            defaultGame() {
                this.$router.push('/diglett');
            }
        }
    }
</script>

<style scoped lang="less">
	@import "./molding.less";
	@import "../../../assets/css/common.less";
</style>