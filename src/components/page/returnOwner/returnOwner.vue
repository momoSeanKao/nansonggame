<template>
	<div class="returnOwner">
		<div class="bg_mask"></div>
		<!--底图-->
		<div class="game-title"
			 :style="{left:(bgPicSize.left-49)+'px',height:(bgPicSize.titleHeight*0.8)+'px'}">
			<img src="https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/game-title.png" alt="">
		</div>
		<div class="bgpic_box"
			 :style="{width:bgPicSize.picWidth+'px',height:bgPicSize.picHeight+'px',top:bgPicSize.top+'px',left:bgPicSize.left+'px',transform:bgPicSize.transform}">
			<img :src="picArr[currentIndex].url" alt="">
		</div>
		<!--提示区域-->
		<div class="tip_mask"
			 v-bind:style="{left:picArr[currentIndex].x+'%',top:picArr[currentIndex].y+'%'}"></div>
		<!--7个图表拖拽-->
		<div class="gameControll_box">
			<div class="icon_round icon7"
				 :style="{width: icon_roundWidth.iconWidth+'px',height:icon_roundWidth.iconHeight+'px',left:bgPicSize.picWidth+bgPicSize.left-80+'px',top:'3%'}">
				<img @touchstart="down" @touchmove="move" @touchend="end"
					 class="iconImg"
					 src="https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/icon5.png" alt="">
			</div>
			<div class="icon_round icon2"
				 :style="{width: icon_roundWidth.iconWidth+'px',height:icon_roundWidth.iconHeight+'px',left:bgPicSize.picWidth+bgPicSize.left-50+'px',top:'15%'}">
				<img @touchstart="down" @touchmove="move" @touchend="end"
					 class="iconImg"
					 src="https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/icon6.png" alt="">
			</div>
			<div class="icon_round icon1"
				 :style="{width: icon_roundWidth.iconWidth+'px',height:icon_roundWidth.iconHeight+'px',left:bgPicSize.picWidth+bgPicSize.left-30+'px',top:'29%'}">
				<img @touchstart="down" @touchmove="move" @touchend="end"
					 class="iconImg"
					 src="https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/icon7.png" alt="">
			</div>
			<div class="icon_round icon3"
				 :style="{width: icon_roundWidth.iconWidth+'px',height:icon_roundWidth.iconHeight+'px',left:bgPicSize.picWidth+bgPicSize.left-35+'px',top:'44%'}">
				<img @touchstart="down" @touchmove="move" @touchend="end"
					 class="iconImg"
					 src="https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/icon1.png">
			</div>
			<div class="icon_round icon5"
				 :style="{width: icon_roundWidth.iconWidth+'px',height:icon_roundWidth.iconHeight+'px',left:bgPicSize.picWidth+bgPicSize.left-39+'px',top:'58%'}">
				<img @touchstart="down" @touchmove="move" @touchend="end"
					 class="iconImg"
					 src="https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/icon3.png" alt="">
			</div>
			<div class="icon_round icon4"
				 :style="{width: icon_roundWidth.iconWidth+'px',height:icon_roundWidth.iconHeight+'px',left:bgPicSize.picWidth+bgPicSize.left-44+'px',top:'72%'}">
				<img @touchstart="down" @touchmove="move" @touchend="end"
					 class="iconImg"
					 src="https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/icon2.png" alt="">
			</div>
			<div class="icon_round icon6"
				 :style="{width: icon_roundWidth.iconWidth+'px',height:icon_roundWidth.iconHeight+'px',left:bgPicSize.picWidth+bgPicSize.left-60+'px',top:'85%'}">
				<img @touchstart="down" @touchmove="move" @touchend="end"
					 class="iconImg"
					 src="https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/icon4.png" alt="">
			</div>


		</div>
		<div class="other-control">
			<div class="changePic_box prev_pic" @click="prev"
				 :style="{width:icon_roundWidth.changePageIconWidth+'px' }">
				<img v-if="currentIndex!=0"
					 src="https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/up_active.png" alt="">
				<img v-if="currentIndex==0"
					 src="https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/up_disabled.png" alt="">
			</div>
			<div class="changePic_box next_pic" @click="nextpic"
				 :style="{width:icon_roundWidth.changePageIconWidth+'px' }">
				<img v-if="currentIndex!=6"
					 src="https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/down_active.png" alt="">
				<img v-if="currentIndex==6"
					 src="https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/down_disabled.png" alt="">
			</div>
			<!--quiz_icon-->
			<div class="quiz_icon" @click="changeShowRule" :style="{width:icon_roundWidth.controlIconWidth+'px' }">
				<img src="https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/quiz_icon.png" alt="">
			</div>
			<!--音乐-->
			<div class="music_icon"
				 :style="{width:icon_roundWidth.controlIconWidth+'px' ,top:icon_roundWidth.controlIconTop+'px'}"
				 @click="musicPlay">
				<img :src="music?('https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/music_icon.png'):('https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/close-music.png')"
					 alt="">
			</div>
		</div>
		<!--游戏开始-->
		<div class="game_start_icon" v-show="startIconShow" @click="gameStart"
			 :style="{width:icon_roundWidth.startIcon+'px' }">
			<img src="https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/game_start.png" alt="">
		</div>
		<!--提示-->
		<div class="tip_icon" v-show="!startIconShow" @click="tipGame" :style="{width:icon_roundWidth.startIcon+'px' }">
			<img src="https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/tip_icon.png" alt="">
		</div>
		<!--提示弹出框-->
		<div class="tips-mask-box" v-show="tipShow" @click="tipsMaskShow">
			<img class="dialogue-pic"
				 src="https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/dialogue.png" alt="">
			<div class="game-tips dialogue-pic">

				<div class="game-content " style="margin-top:40%; ">{{picArr[currentIndex].tipText}}</div>
			</div>
			<!--<div class="tips-item">
				<img :src="picArr[currentIndex].tipUrl" alt="">
			</div>-->
		</div>
		<div class="rule-box" v-show="showRule" @click="changeShowRule">
			<img class="dialogue-pic"
				 src="https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/dialogue.png" alt="">
			<div class="game-tips">
				<div class="return-game-title">游戏说明</div>
				<div class="game-content">
					<!--本游戏旨在考考您对各个年代陶瓷使用场景的辨识能力。拖拽某个陶瓷至您认为图片正确的位置。您一旦开始，后面还可以通过"提示"键获得有关信息记忆。-->
					你对各个时代陶瓷产品的特点及其功用了解吗？请根据时代及使用场景特征，拖拽某个陶瓷至正确的位置，完成挑战。
				</div>
			</div>
		</div>
		<!--成功弹出框-->
		<!--成功动画-->
		<div class="bingo-box " v-show="bingoShow">
			<img class="" style="display: none;"
				 src="https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/bingo.png" alt="">
		</div>
		<dialogResult :successShow="successShow"
					  :title="dialogTitle"
					  :correctPic="correctPic"
					  :content="dialogContent"
					  @closeDialog="closeDialog"></dialogResult>
		<!--最后成功画面-->
		<div class="finally-success" v-show="finallySuccess" @click="hideFinallySuccess">
			<div class="shine-bg-mask">
				<div class="shine-bg"></div>
				<div class="finall-success-icon"></div>
				<img @click="gameStart"
					 style="width: 2rem;position: absolute;left: 50%;top: 4.5rem;z-index: 100;    transform: translateX(-50%);"
					 src="https://app.bowu66.com/museum-cms/upload/nansongGame/img/fail-play-again.png"
					 alt="">
			</div>
		</div>
		<!--音效-->
		<audio id="bg_sound_box">
			<source src="https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/sound/bg.mp3"
					type="audio/mp3">
		</audio>
		<audio id="click_sound_box">
			<source src="https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/sound/click_sound.mp3"
					type="audio/mp3">
		</audio>
	</div>
</template>

<script>
    import dialogResult from "./dialogResult.vue";

    export default {
        name: "returnOwner",
        data() {
            return {
                finallySuccess: false,
                showRule: false,
                music: true,
                eventSure: false,
                currElement: null,
                isPortraitcreen: true,//竖屏true 横屏false
                position: {x: 0, y: 0},
                nx: '', ny: '', dx: '', dy: '', xPum: '', yPum: '',
                currentPic: ("https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/bgpic1.png"),
                currentIndex: 0,//当前选中
                picArr: [{
                    url: ("https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/bgpic7.png"),
                    tipUrl: ("https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/tip7.png"),
					tipText:"我的出现结束了人类“茹毛饮血”的生活，是人类文明发展史上的一个里程碑。",
                    x: "23",
                    y: "66",
                    iconCount: 7,
                    title: "彩陶十字形圆点纹壶",
                    content: "陶器，是用黏土经捏制成形后烧制而成的器具。陶器历史悠久，在新石器时代早期就已初见简单粗糙的陶器。陶器的发明是人类最早利用化学变化改变天然性质的开端，是人类社会由旧石器时代发展到新石器时代的标志之一。同时，陶器的发明也大大改善了人类的生活条件，它成为人类日常生活中不可缺少的生活用具。",
                    correctUrl: "https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/icon7.png"
                }, {
                    url: ("https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/bgpic6.png"),
                    tipUrl: ("https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/tip6.png"),
					tipText:"我浓艳瑰丽的釉色是大唐盛世繁华的印证，我是联系往生者和生人的情感纽带。",
                    x: "37",
                    y: "53",
                    iconCount: 6,
                    title: "三彩女立俑 ",
                    content: "唐三彩是一种施以多种彩釉的陶制品，釉色以黄、绿、白三色为主，所以人们习惯称之为“唐三彩”。唐代厚葬成风，明器的需要量激增，因此唐三彩主要见于做随葬的明器，生活用器较少。明器中有人物俑、动物、家具、车马、亭台楼阁等等，死者生前所享用的事物无不具备。",
                    correctUrl: "https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/icon6.png"
                }, {
                    url: ("https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/bgpic1.png"),
                    tipUrl: ("https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/tip1.png"),
					tipText:"黑色的皮肤让我比别的茶碗更能凸显茶汤的乳白，我又深又厚的腹部是为了保持茶汤温度，想要在斗茶比试中获胜，可是少不了我的助力。",
                    x: "42",
                    y: "55",
                    iconCount: 1,
                    title: "建窑兔毫纹黑釉盏",
                    content: "宋代饮茶、斗茶风气的兴盛。宋人将茶叶制成半发酵膏饼，饮用时先把膏饼碾成细末放在茶盏里，再沏以初沸的开水，茶汤表面会浮起一层白沫，斗茶比的就是这层白沫的颜色和茶盏内壁沾染的水痕。而黑碗能凸显茶汤的乳白，正因为斗茶这种风俗的需要，黑釉盏在宋代得到了极大的发展，其中最受欢迎的是福建建窑生产的黑釉茶具。建窑是宋代著名的瓷窑之一，以烧造黑釉瓷器著称。建窑茶具中鹧鸪斑、金银兔毫、油滴等釉变是黑色茶具中的精品。",
                    correctUrl: "https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/icon1.png"
                }, {
                    url: ("https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/bgpic2.png"),
                    tipUrl: "https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/tip2.png",
					tipText:"我出生高贵，独得官家恩宠！端庄凝重的造型，青莹如玉的釉色和自然奇特的纹饰可都是宫里官家的心头之好呢~",
                    x: "45",
                    y: "50",
                    iconCount: 2,
                    title: "官窑青瓷簋式炉",
                    content: "南宋官窑是南宋时期宫廷专设的御用瓷窑，它秉承皇室旨意，不惜工本，专为宫廷烧制工艺精美的御用青瓷。官窑瓷器在南宋宫廷礼仪、陈列及日常生活中居于重要地位，是南宋历代帝王的珍爱之物。",
                    correctUrl: "https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/icon2.png"
                }, {
                    url: ("https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/bgpic3.png"),
                    tipUrl: ("https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/tip3.png"),
					tipText:"我的造型是不是和现代的高脚杯非常相似，高高的圈足，让我比其他杯子更便于抓握，在策马狂奔中用我饮一口烈酒该是如何快意豪迈之事。",
                    x: "40",
                    y: "40",
                    iconCount: 3,
                    title: "元枢府窑高足杯",
                    content: "高足杯，盛行于元代，是元代最具代表性的器物之一。在造型上，除了口外撇，腹弧收，下承高圈足等普遍特征外，大多数高圈足上都饰有竹节纹。蒙古人喝酒一向豪迈，这样的设计给他们的生活带来了极大的便利，高足设计便于五指抓握，即使骑在马背上，也可以大口豪饮。此外，修长的把柄便于他们系于腰间或挂于马背，因而高足杯也被称为“马上杯”。",
                    correctUrl: "https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/icon3.png"
                }, {
                    url: ("https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/bgpic4.png"),
                    tipUrl: ("https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/tip4.png"),
					tipText:"明代开始流行散茶冲泡，像我这样的茶壶应运而生。我大大的肚子可以让茶叶在热水中充分舒展。我长长的嘴为您斟上一杯幽香四溢的清茶。",
                    x: "37",
                    y: "50",
                    iconCount: 4,
                    title: "青花花鸟纹执壶",
                    content: "青花瓷是一种高温釉下彩瓷器，以含氧化钴的钴矿为彩料，在素瓷胎上描绘纹饰，再罩上一层透明釉，经高温还原焰一次烧成。成熟的青花瓷诞生于元代，至明青花瓷成为瓷器的主流，并于明末清初达到巅峰，清康雍乾时期继续发展。",
                    correctUrl: "https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/icon4.png"
                }, {
                    url: ("https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/bgpic5.png"),
                    tipUrl: ("https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/tip5.png"),
					tipText:"我可是一名十足的“混血儿”，身上的花纹可是融合了东西方的艺术风格。",
                    x: "26",
                    y: "38",
                    iconCount: 5,
                    title: "广彩大碗",
                    content: "中国的陶瓷和丝绸一样，在古代输出品中占据着极其重要的地位，在与世界各国的互相交流中，起着桥梁和纽带的作用。广彩广彩是广州织金彩瓷的简称，是我国清代外销瓷的主要品种之一。广彩为了适应外销需要，将景德镇所烧的素瓷坯运到广州，根据西方人的需求和爱好，加以彩绘。因其大量用于外销，广彩纹饰上更多地融合了东西方的艺术风格，图案装饰性强，丰富紧凑。",
                    correctUrl: "https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/icon5.png"
                },],
                dialogTitle: "",
                dialogContent: "",
                correctPic: "",
                successShow: false,//成功提示
                bingoShow: false,
                startIconShow: true,//是否显示"开始游戏"图表
                // 提示
                tipShow: false
            }
        },
        mounted() {//挂载结束状态
            // 禁用app.vue中的背景音乐
            this.$store.commit("setAudioPlay", 'pause');
            this.changeOrientation($(".returnOwner"));
            this.$bgInit($('#bg_sound_box')[0]);
            this.gameStart();

        },
        components: {//模板
            dialogResult
        },
        computed: {
            icon_roundWidth: () => {
                let windowHeight = $("body").height();
                let windowWidth = $("body").width();
                if (windowHeight < windowWidth) {
                    console.log("横屏");
                    return {
                        iconWidth: $("body").width() * 0.055,
                        iconHeight: $("body").width() * 0.055,
                        controlIconWidth: $("body").width() * 0.1,
                        startIcon: $("body").width() * 0.15,
                        controlIconTop: $("body").width() * 0.1,
                        changePageIconWidth: $("body").width() * 0.06,
                    }
                } else {
                    console.log("竖屏");
                    return {
                        iconWidth: $("body").height() * 0.063,
                        iconHeight: $("body").height() * 0.063,
                        controlIconWidth: $("body").height() * 0.12,
                        startIcon: $("body").width() * 0.25,
                        controlIconTop: $("body").height() * 0.12,
                        changePageIconWidth: $("body").height() * 0.06,
                    }
                }
            },
            bgPicSize: () => {
                let windowHeight = $("body").height();
                let windowWidth = $("body").width();
                let scal = 1560 / 1080;
                let picWidth, picHeight, left, titleHeight;
                if (windowHeight < windowWidth) {//横屏
                    titleHeight = windowHeight;
                    // alert("横屏tip_mask");
                    if ((windowWidth * 0.75 / scal < windowHeight)) {
                        // 正常大小，可以放下
                        // alert("正常大小，可以放下");
                        picWidth = windowWidth * 0.75;
                        picHeight = windowWidth * 0.75 / scal;
                    } else {
                        // 缩小也放不下
                        // alert("缩小也放不下");
                        picWidth = windowHeight * scal;
                        picHeight = windowHeight;
                    }
                    left = ((windowWidth - windowWidth * 0.75) / 2 - windowWidth * 0.01);
                } else {//竖屏
                    titleHeight = windowWidth;
                    // alert("竖屏");
                    if ((windowHeight * 0.75 / scal < windowWidth)) {
                        // alert("正常大小，可以放下");
                        picWidth = windowHeight * 0.77;
                        picHeight = windowHeight * 0.77 / scal;
                    } else {
                        // alert("缩小也放不下");
                        picWidth = windowWidth * scal;
                        picHeight = windowWidth;
                    }
                    left = ((windowHeight - windowHeight * 0.75) / 2 - windowHeight * 0.01);
                }
                return {
                    top: "50%",
                    picWidth: picWidth,
                    picHeight: picHeight,
                    transform: "translateY(-50%)",
                    left: left,
                    titleHeight: titleHeight
                }
            }
        },
        methods: {//事件
            // 保持横屏
            changeOrientation($print) {
                var width = document.documentElement.clientWidth;
                var height = document.documentElement.clientHeight;
                this.isPortraitcreen = false;
                if (width < height) {
                    this.isPortraitcreen = true;
                    // 竖屏
                    $print.width(height);
                    $print.height(width);
                    $print.css('top', (height - width) / 2);
                    $print.css('left', 0 - (height - width) / 2);
                    $print.css('transform', 'rotate(90deg)');
                    $print.css('transform-origin', '50% 50%');
                }

                var evt = "onorientationchange" in window ? "orientationchange" : "resize";
                let that = this;
                window.addEventListener(evt, function () {
                    setTimeout(function () {
                        var width = document.documentElement.clientWidth;
                        var height = document.documentElement.clientHeight;
                        if (width > height) {
                            // 横屏
                            that.isPortraitcreen = false;
                            $print.width(width);
                            $print.height(height);
                            $print.css('top', 0);
                            $print.css('left', 0);
                            $print.css('transform', 'none');
                            $print.css('transform-origin', '50% 50%');
                        } else {
                            // 竖屏
                            that.isPortraitcreen = true;
                            $print.width(height);
                            $print.height(width);
                            $print.css('top', (height - width) / 2);
                            $print.css('left', 0 - (height - width) / 2);
                            $print.css('transform', 'rotate(90deg)');
                            $print.css('transform-origin', '50% 50%');
                        }

                    }, 300);

                }, false);
            },
            // 游戏开始
            gameStart() {
                // document.getElementById("click_sound_box").play();
                this.eventSure = true;
                this.currentIndex = 0;
                this.startIconShow = false;
                this.clearPosition();
                if (!this.showRule) {
                    $(".game-tips").hide();
                    let that = this;
                    setTimeout(() => {
                        $(".game-tips").show();
                    }, 300)
                }
                this.showRule = !this.showRule;
            },
            // 游戏提示
            tipGame() {
                this.tipShow = true;
            },
            tipsMaskShow() {
                this.tipShow = false;
            },
            // 拖拽事件
            down(event) {
                if (this.eventSure) {
                    let odiv = event.target;
                    if (odiv != this.currElement) {
                        $(".iconImg").each((i, n) => {
                            $(n).css({
                                left: 0,
                                top: 0,
                                "border-radius": "50%",
                                width: "100%",
                                height: "100%"
                            })
                        })
                    }
                    this.currElement = odiv;
                    let touch;
                    if (event.touches) {
                        touch = event.touches[0];
                    } else {
                        touch = event;
                    }

                    this.position.x = touch.clientX;
                    this.position.y = touch.clientY;

                    this.dx = odiv.offsetLeft;
                    this.dy = odiv.offsetTop;
                }
            },
            move(event) {
                if (this.eventSure) {
                    this.successShow = false;
                    this.bingoShow = false;
                    $(".bingo-box img").hide(300, () => {
                        $(".bingo-box img").removeClass("bingo-box-animation");
                    });
//                    $(".bingo-box").removeClass("bingo-box-animation");
                    let odiv = event.target;
                    var touch;
                    if (event.touches) {
                        touch = event.touches[0];
                    } else {
                        touch = event;
                    }

                    if (this.isPortraitcreen) {//竖屏
                        this.ny = touch.clientX - this.position.x;
                        this.nx = touch.clientY - this.position.y;
                        this.yPum = this.dy - this.ny;
                    } else {//横屏
                        this.nx = touch.clientX - this.position.x;
                        this.ny = touch.clientY - this.position.y;
                        this.yPum = this.dy + this.ny;
                    }
                    this.xPum = this.dx + this.nx;
                    odiv.style.left = this.xPum + "px";
                    odiv.style.top = this.yPum + "px";
                    //阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
                    document.addEventListener("touchmove", function (e) {
                        if (e.cancelable) {
                            // 判断默认行为是否已经被禁用
                            if (!e.defaultPrevented) {
                                e.preventDefault();
                            }
                        }
                    }, false);
                }

            },
            closeDialog() {
                let that = this;
                if (this.currentIndex == 6) {
                    this.finallySuccess = true;
                    this.bingoShow = false;
                }
                setTimeout(() => {
                    this.successShow = false;
                    this.bingoShow = false;
                    $(".bingo-box img").hide(300, () => {
                        $(".bingo-box img").removeClass("bingo-box-animation");
                    });
//                $(".bingo-box").removeClass("bingo-box-animation");
                    this.nextpic();

                }, 500);

            },
            //鼠标释放时候的函数
            end(e) {
                if (this.eventSure) {
                    //提示分区位置
                    let tipx = $(".tip_mask").offset().left;
                    let tipy = $(".tip_mask").offset().top;
                    // 原图标位置
                    let index = $(e.target).parent().attr("class").split("icon_round icon")[1];
                    let iconx = $(".icon" + index).offset().left;
                    let icony = $(".icon" + index).offset().top;
                    // 图片位置
                    let bgx = e.target.offsetLeft;
                    let bgy = e.target.offsetTop;
                    let that = this;
                    if ((index - 1) != this.currentIndex) {
                        this.initPosition(index);
                    } else {
                        if (this.isPortraitcreen) {//竖屏
                            if ((Math.abs(tipx + bgy - iconx) < 21) && (Math.abs(bgx + icony - tipy) < 21)) {
                                $(".icon" + index).find("img").css({
                                    "border-radius": 0,
                                    height: "1rem",
                                    width: "1rem",
                                    left: tipy - icony - 2,
                                    top: iconx - tipx - 5
                                });
                                that.bingoShow = true;
                                $(".bingo-box img").show(300, () => {
                                    $(".bingo-box img").addClass("bingo-box-animation");
                                });
                                setTimeout(() => {
                                    that.successShow = true;
                                }, 1000);
                                this.eventSure = false;

                            } else {
                                this.initPosition(index);
                            }
                        } else {//横屏
                            if ((Math.abs(icony + bgy - tipy) < 21) && (Math.abs(bgx + iconx - tipx) < 21)) {
                                $(".icon" + index).find("img").css({
                                    "border-radius": 0,
                                    height: "1rem",
                                    width: "1rem",
                                    left: tipx - iconx - 15,
                                    top: tipy - icony - 15
                                });
                                that.bingoShow = true;
                                $(".bingo-box img").show(300, () => {
                                    $(".bingo-box img").addClass("bingo-box-animation");
                                });
                                this.eventSure = false;
                            } else {
                                this.initPosition(index);
                            }
                        }
                        this.dialogTitle = this.picArr[index - 1].title;
                        this.dialogContent = this.picArr[index - 1].content;
                        this.correctPic = this.picArr[index - 1].correctUrl;
                    }
                }
            },
            initPosition(index) {
                $(".icon" + index).find("img").css({
                    "border-radius": "50%",
                    left: 0,
                    top: 0
                })
            },
            // 上一张
            prev() {
                if (!this.startIconShow) {
                    if (this.currentIndex > 0) {
                        document.getElementById("click_sound_box").play();


                        let newVal = this.currentIndex - 1;
                        this.$set(this, "currentIndex", newVal);
                        this.clearPosition();
                        console.log(this.currentIndex);
                    }
                }
            },
            // 下一张
            nextpic() {
                if (!this.startIconShow) {
                    if (this.currentIndex < 6) {
                        document.getElementById("click_sound_box").play();
                        let newVal = this.currentIndex + 1;
                        this.$set(this, "currentIndex", newVal);
                        this.clearPosition();
                    }
                }
            },
            hideFinallySuccess() {
                this.finallySuccess = false;
            },
            clearPosition() {
                this.successShow = false;
                this.eventSure = true;
                $(".iconImg").each((i, n) => {
                    $(n).css({
                        left: 0,
                        top: 0,
                        "border-radius": "50%",
                        width: "100%",
                        height: "100%"
                    })
                })
            },
            // 游戏规则点击
            changeShowRule() {
                document.getElementById("click_sound_box").play();
                if (!this.showRule) {
                    $(".game-tips").hide();
                    let that = this;
                    setTimeout(() => {
                        $(".game-tips").show();
                    }, 300)
                }
                this.showRule = !this.showRule;

            },
            // 背景音乐
            musicPlay() {
                if (this.music) {
                    $('#bg_sound_box')[0].pause();
                } else {
                    $('#bg_sound_box')[0].play();
                }
                this.music = !this.music;
            }
        }
    }
</script>

<style scoped lang="less">
	@import "./returnOwner.less";
</style>
