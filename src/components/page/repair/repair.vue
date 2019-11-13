<template>
	<div class="game_box repair-box">
		<!--选择瓷器-->
		<div class="select-game-box" v-if="chooseFragVisible">
			<h3 class="repair-title">请选择您想修复的瓷器</h3>
			<div class="select-repair-box">
				<div :class="{active : chooseFragIndex === index }"
					 :key="item"
					 @click="chooseFrag(index)"
					 class="repair-item" v-for="(item,index) in selectList">
					<img :src="item">
				</div>
			</div>
			<div @touchend="chooseGameStart()" class="game-start-btn">
				<img src="https://app.bowu66.com/museum-cms/upload/nansongGame/select/btn.png">
			</div>
		</div>
		<!--游戏提示区-->
		<div class="game_tips_box">
			<!--游戏倒计时-->
			<div :style="{
                    width:normal.returnTimesWidth+'px',
                    height:normal.returnTimesWidth+'px',
                    left:normal.windowHeight*0.02+'px',
                    'background-color':'none',
                    'border':'none',
                    'line-height':normal.returnTimesWidth+'px'}"
				 class="totalTime">
				<section class="zzsc-container">
					<figure data-behavior="pie-chart" id="pie"></figure>
				</section>
			</div>
			<div :style="{
                width:(normal.windowWidth-normal.returnTimesWidth-normal.windowHeight*0.02-15)+'px',
                height:normal.windowHeight*0.14+'px'}"
				 class="china-list-box">
				<div class="chip-list">
					<div :data-index="item.index"
						 @touchend="end"
						 @touchmove="move"
						 @touchstart="down"
						 v-for="(item) in chinaInfo[chooseIndex].img">
						<img :src="item.url">
					</div>
				</div>
			</div>
		</div>
		<div class="desk-bg">
			<div class="person-bg"></div>
			<img class="desk-img" src="https://app.bowu66.com/museum-cms/upload/nansongGame/repair/desk.png">
			<img alt="" class="prop-bg" src="https://app.bowu66.com/museum-cms/upload/nansongGame/repair/item.png">
			<!--线框调整-->
			<!--瓷器展示-->
			<div :class="'solid'+ chooseIndex +'-box'">
				<img :class="'solid'+ chooseIndex +'-img'" :src="chinaList[chooseIndex].url"
					 :style="{opacity: porcelainBgVisible ? 1 : 0}">
				<div class="solid-porcelain-box">
					<img :class="'porcelain'+chooseIndex +'-img' + item.index"
						 :key="item.index"
						 :src="item.url"
						 v-for="(item) in chinaInfo[chooseIndex].img">
				</div>
				<img :class="'complete' + (chooseIndex + 1)"
					 :src="chinaList[chooseIndex].completeUrl">
			</div>
		</div>

		<!--通过-->
		<pass :gotoShow="gotoShow" :passShow="passShow" passWord="恭喜您完成所有挑战"></pass>
		<!--失败-->
		<refuse :refuseShow="refuseShow" :showDefault="false" @restart="restart"></refuse>
		<!--规则-->
		<gameRule :html="gameRule" @gameStart="gameStart" ref="gameRule"></gameRule>
		<!--游戏开始倒计时-->
		<countDownT ref="countDownChild"></countDownT>
		<audio id="end_sound_box">
			<source src="https://app.bowu66.com/museum-cms/upload/nansongGame/thirdSound/third-end.mp3"
					type="audio/mp3">
		</audio>
		<audio id="third-game-bgm">
			<source src="https://app.bowu66.com/museum-cms/upload/nansongGame/thirdSound/third-bgm.mp3"
					type="audio/mp3">
		</audio>
		<!--保存实物-->
		<div class="game-complete" @click="saveChinaClick">
			<img src="https://app.bowu66.com/museum-cms/upload/nansongGame/repair/complete.png">
		</div>
		<div class="saveChinaWord ">点击器物，保存您修复的瓷器图片</div>
		<div class="true-china" v-show="posterShow">
			<!--<img :src="chinaList[chooseIndex].trueUrl" alt="">-->
			<div id="sharePicBox" ref="imageWrapper" class="posterContent">

				<img class="posterJpg selectImg"  width="100%" :src="chinaList[chooseIndex].posterUrl" id="posterImg" >
			</div>

		</div>
	</div>

	<!--</div>-->
</template>
<script>
    import countDownT from "../../common/countDown/countDown"
    import gameRule from "../../common/gameRule/gameRule"
    import pass from "../../common/pass/pass"
    import refuse from "../../common/refuse/refuse"
    import {chinaList, chinaInfo, selectList} from './chinaInfo'
    import './pie-loader'
    import html2canvas from '../chart/html2canvas.min';

    export default {
        name: "coloured",
        data() {
            return {
                chooseFragIndex: 0,
                chooseFragVisible: false,
                canPlay: true,//是否能开始游戏
                totalTime: 30,//游戏时长
                chooseIndex: Math.random() * 4 | 0,// 随机选中要拼接的陶瓷 Math.random() * 4 | 0
                gameCooldownTimer: null, // 游戏倒计时定时器
                copyImg: null, // 复制出来的img
                canmove: false, // 是否允许移动
                selectImgList: [], // 标题栏可拖拽 碎片组
                selectImgIndex: 0, // 已选择的图片index
                completeCount: 0, // 已完成的碎片数量
                selectList,
                chinaList,
                chinaInfo,
                // 储存位置信息
                position: {},
                gameRule: "<p style='font-size:16px; line-height:0.8rem;padding:0 0.4rem;color:#5d3c16;font-weight: bold;" +
                    " '>在20世纪,南宋官窑郊坛下和修内司两处窑址陆续被发现。遗址出土了大量的官窑瓷器碎片。然而器型种类繁多, 碎片的数量巨大, 为瓷器修复带来了巨大的挑战。 瓷器修复是个漫长而繁琐的过程, 我们的修复师急需你的帮助。 赶快把破碎的瓷片拼对起来吧!<p></p>", //游戏规则
                // 通关
                gotoShow: false,
                passShow: false,
				posterShow:false,
                // 失败
                refuseShow: false,
                porcelainBgVisible: false,
				downloadUrl: null,
				downloadShow: false,
            }
        },
        computed: {
            normal: () => {
                let $body = $("body");
                let windowHeight = $body.height();
                let windowWidth = $body.width();
                return {
                    windowWidth: windowWidth,
                    windowHeight: windowHeight,
                    returnTimesWidth: windowHeight * 0.10
                }
            },
        },
        components: {
            countDownT, gameRule, pass, refuse
        },
        mounted() {
            this.$nextTick(() => {
                setTimeout(() => {
                    this.chooseFragVisible = true
                }, 1000)
            })
        },
        methods: {
            // 游戏开始前选择碎片
            chooseFrag(index) {
                this.chooseFragIndex = index;
            },

            // 选择碎片完成后开始
            chooseGameStart() {
                console.log('点击了')
                // 倒计时60秒
                this.$refs.countDownChild.countDownT(() => {
                    this.$bgInit($('#third-game-bgm')[0]);
                    //开始倒计时
                    $("#pie").empty();
                    $("#pie").svgPie({
                        percentage: this.totalTime,
                        totalSecond: 30,
                        easin: "linear",
                        dimension: this.normal.returnTimesWidth
                    });
                    this.canPlay = true;
                    this.countDown();
                });
                this.gameInit(this.chooseFragIndex);
                this.chooseFragVisible = false;
            },

            // 游戏初始化
            gameInit(chooseIndex) {
                // 可以指定碎片素材 不指定则随机
                this.chooseIndex = chooseIndex;
                this.completeCount = 0;
                // 重置瓷器虚线背景图为显示
                this.porcelainBgVisible = true;

                // 碎片图片随机
                this.chinaInfo[this.chooseIndex].img.sort(() => Math.random() > 0.5);
                this.chinaInfo[this.chooseIndex].img.sort(() => Math.random() > 0.5);
                // 可选择碎片全部显示
                $('.chip-list>div').show();
                // 清除所有复制的图片
                this.chinaInfo[this.chooseIndex].img.forEach((n, i) => {
                    $(`.newImg${i}`).remove();
                });

                // 1秒等待图片缓冲时间
                setTimeout(() => {
                    this.position = {};
                    this.chinaInfo[this.chooseIndex].img.map(n => {
                        this.position[n.index] = this.calc(`.porcelain${this.chooseIndex}-img${n.index}`);
                    });
                    this.canPlay = true;
                }, 3000);
            },
            // 计算当前图片的 xy 坐标  用于判断是否位于范围内
            calc(name) {
                let rect = document.querySelector(name).getBoundingClientRect();
                return {
                    startX: rect.x,
                    startY: rect.y,
                    endX: rect.x + rect.width,
                    endY: rect.y + rect.height,
                }
            },
            // 游戏开始 并且初始化所有数值
            gameStart() {
                // 倒计时60秒
                // this.$refs.countDownChild.countDownT(() => {
                //开始倒计时
                // $("#pie").empty();
                // $("#pie").svgPie({
                //     percentage: this.totalTime,
                //     totalSecond: 30,
                //     easin: "linear",
                //     dimension: this.normal.returnTimesWidth
                // });
                // this.canPlay = true;
                // this.countDown();
                // });
            },
            // 重新开始
            restart() {
                this.totalTime = 30;
                this.refuseShow = false;
                $(`.solid${this.chooseIndex}-box img`).removeClass('active');
                // 显示选择瓷器页面达到重新开始的目的
                this.chooseFragVisible = true;
                this.gameInit(this.chooseFragIndex);
            },
            // 游戏时间倒计时
            countDown() {
                let that = this;
                this.gameCooldownTimer = window.setInterval(() => {
                    if (that.totalTime > 0) {
                        that.totalTime -= 1;
                    } else {
                        that.canPlay = false;
                        that.refuseShow = true;
                        that.$pause($('#third-game-bgm')[0]);
                        window.clearInterval(this.gameCooldownTimer);
                    }
                }, 1000);
            },
            // 按下
            down(e) {
                if (this.canPlay) {
                    // 此index为自定义数据的index
                    let index = Number(e.target.dataset.index);
                    let imgObj = this.chinaInfo[this.chooseIndex].img.find(n => n.index === index);
                    this.selectImgIndex = index;
                    this.canmove = false;
                    let width = '';
                    if (this.chooseIndex === 0) {
                        width = '30%'
                    }
                    if (this.chooseIndex === 1) {
                        width = '15%'
                    }
                    if (this.chooseIndex === 2) {
                        width = '20%'
                    }
                    if (this.chooseIndex === 3) {
                        width = '25%'
                    }

                    if (!this.copyImg) {
                        this.copyImg = $(`<img class="newImg${index}" src="${imgObj.url}"
                        style="position: absolute;left:${e.touches[0].pageX}px;top:${e.touches[0].pageY}px;
                        z-index: 100;
                        transform: translate(-50%,-50%);
                        width: ${width}"/>`);

                        $(e.target).hide();

                        this.copyImg.appendTo($(".repair-box"));
                        this.canmove = true;
                    }

                    e.preventDefault();
                }
            },
            // 拖拽
            move(e) {
                if (this.canPlay) {
                    if (this.copyImg) {
                        this.copyImg.css({
                            left: e.touches[0].pageX + "px",
                            top: e.touches[0].pageY + "px",
                        });
                        this.canmove = false;
                    }
                    e.preventDefault();
                }
            },

            // 检查当前坐标是不是在范围内
            checkPositionInArea(e) {
                let x = e.changedTouches[0].pageX;
                let y = e.changedTouches[0].pageY;
                let pos = this.position[this.selectImgIndex];
                return x > pos.startX && x < pos.endX && y > pos.startY && y < pos.endY
            },

            // 检测全部碎片是否添加完毕
            checkGameEnd() {
                if (this.chinaInfo[this.chooseIndex].img.length === this.completeCount) {
                    console.log("成功");
                    // 清除倒计时定时器
                    window.clearInterval(this.gameCooldownTimer);
                    // 显示成功后的图形
                    $(`.complete${this.chooseIndex + 1}, .game-complete`).addClass('active');
                    $(".saveChinaWord").show();
                    $(`.solid${this.chooseIndex}-img`).css('opacity', '0');
                    this.porcelainBgVisible = false;
                    // stopInter
                    $("#pie").stopInter();
                    this.$pause($('#third-game-bgm')[0]);
                }
            },

            //释放
            end(e) {
                if (this.canPlay) {
                    document.getElementById("end_sound_box").play();
                    let index = this.selectImgIndex;
                    let inArea = this.checkPositionInArea(e);
                    $(".newImg" + index).remove();
                    this.copyImg = null;

                    if (inArea) {
                        // 如果在范围内 并且显示相应的瓷器
                        $(`.porcelain${this.chooseIndex}-img${index}`).addClass('active');
                        this.completeCount++;
                        this.checkGameEnd();
                    } else {
                        $(e.target).show();
                    }
                    console.log("释放");
                }
            },
            saveChinaClick() {
				this.posterShow = true;
				/*$(".true-china").show();
                $(".true-china>img").css({
                    "pointerEvents": "auto"
                });*/
            },


        }
    }
</script>

<style lang="less" scoped>
	@import "../../../assets/css/common.less";
	@import "./repair.less";
</style>
