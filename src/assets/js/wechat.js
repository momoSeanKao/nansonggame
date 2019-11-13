const wx = require('weixin-js-sdk');
import qs from 'qs'
import {get, post} from "../../utils/request";
// 分享配置
const share = {
    title: "测试用的",
    desc: "这个是描述，还没想好",
    link: "",
    imgUrl: "http://app.bowu66.com/museum-cms/upload/sanxiaGame/fenxiang.jpeg"
};
// 微信鉴权设置
const wxOpt = {
    userid: "",
    debug: !1,
    appId: "",
    timestamp: "",
    nonceStr: "",
    signature: "",
    apis: ["hideMenuItems", "showMenuItems", "hideAllNonBaseMenuItem", "showAllNonBaseMenuItem", "translateVoice", "startRecord", "stopRecord", "onRecordEnd", "playVoice", "pauseVoice", "stopVoice", "uploadVoice", "downloadVoice", "chooseImage", "previewImage", "uploadImage", "downloadImage", "getNetworkType", "openLocation", "getLocation", "hideOptionMenu", "showOptionMenu", "closeWindow", "scanQRCode", "chooseWXPay", "openProductSpecificView", "addCard", "chooseCard", "openCard", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareQZone", "updateAppMessageShareData", "updateTimelineShareData",]
};
export default {
    init() {
        wx.config({
            debug: wxOpt.debug,
            appId: wxOpt.appId,
            timestamp: wxOpt.timestamp,
            nonceStr: wxOpt.nonceStr,
            signature: wxOpt.signature,
            jsApiList: wxOpt.apis
        })
    },

    getWxConfig() {
        let url;
        return new Promise((res, rej) => {
            post("/museum/getJsSgin", {url: window.location.href.split("#")[0]}).then((resp) => {
                // 调用vuex存入用户基本信息
                $.extend(wxOpt, resp);
                res({result: true})
            }).catch((err) => {
                console.log(err);
            })
        });
    },
    Handler(callback) {
        this.getWxConfig().then((tem) => {
            this.init();
            wx.ready(function () {
                wx.checkJsApi({
                    jsApiList: wxOpt.apis, // 需要检测的JS接口列表，所有JS接口列表见附录2,
                    success: function (res) {
                        // 以键值对的形式返回，可用的api值true，不可用为false
                        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                    }
                });
                callback && callback();
            })
        });
    },
};
