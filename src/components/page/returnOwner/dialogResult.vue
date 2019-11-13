<template>
    <div class="dialog_result_box" v-show="successShow">
        <div class="dialog_success">
            <div class="dialog-bg"
                 :style="{background: 'url('+diaUrl+')','background-size': 'contain',width: dialogFix.dialogWidth+'px',height:dialogFix.dialogHeight+'px'}">
                <div class="close-box" @click="closeDialog">
                    <img src="https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/close.png" alt="">
                </div>
                <div class="exhibit-intro-box">
                    <div class="exhibit-title">
                        <img :src="correctPic" alt="" style="width: 1rem;">
                        <span v-html="title"></span>
                    </div>
                    <div class="exhibit-content" v-html="content">
                        宋代饮茶、斗茶风气的兴盛。宋人将茶叶制成半发酵膏饼，饮用时先把膏饼碾成细末放在茶盏里，再沏以初沸的开水，茶汤表面会浮起一层白沫，斗茶比的就是这层白沫的颜色和茶盏内壁沾染的水痕。而黑碗能凸显茶汤的乳白，正因为斗茶这种风俗的需要，黑釉盏在宋代得到了极大的发展，其中最受欢迎的是福建建窑生产的黑釉茶具。
                        建窑是宋代著名的瓷窑之一，以烧造黑釉瓷器著称。建窑茶具中鹧鸪斑、金银兔毫、油滴等釉变是黑色茶具中的精品。
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "success",
        data() {
            return {
                diaUrl: ("https://app.bowu66.com/museum-cms/upload/nansongGame/returnOwner/dialogue.png")
            }
        },
        props: ["successShow", "title", "content", "correctPic"],
        computed: {
            dialogFix: () => {
                let windowHeight = $("body").height();
                let windowWidth = $("body").width();
                let scal = 1140 / 720, dialogHeight, dialogWidth;
                if (windowHeight < windowWidth) {
                    console.log("横屏");
                    dialogHeight = windowHeight * 0.8;
                    dialogWidth = scal * dialogHeight;
                } else {
                    dialogHeight = windowWidth * 0.8;
                    dialogWidth = scal * dialogHeight;
                    console.log("竖屏");
                }
                return {
                    dialogHeight: dialogHeight,
                    dialogWidth: dialogWidth
                }
            },
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
            closeDialog() {
                this.$emit("closeDialog");
            }
        }
    }
</script>

<style scoped>
    .dialog_result_box {
        position: absolute;
        z-index: 10;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.7);
        color: #fff;
    }

    .dialog-bg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
    }

    .close-box {
        position: absolute;
        right: 0;
        top: 25px;
        width: 50px;
        height: 50px;
    }

    .close-box img {
        width: 100%;
    }

    .exhibit-intro-box {
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -30%);
        width: 70%;
    }

    .exhibit-title {
        text-align: center;
        padding: 20px;
    }

    .exhibit-content {
        padding: 10px;
        font-size: 12px;
    }
</style>