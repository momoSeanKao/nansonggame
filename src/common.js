import axios from 'axios'

const method = {
    '$phone': /Android|webOS|iPhone|iPod|BlackBerry/i.test(window.navigator.userAgent),
    // 接口调用
    // 数组去重
    '$getRandom'(to, from) {
        return Math.floor(Math.random() * to + from);
    },
    // 日期格式化
    /**
     *
     * @param time
     * @param pattern  "YYYY-MM-DD hh:mm:ss"
     * @returns {*}
     */
    '$format'(time, pattern = 'YYYY-MM-DD hh:mm:ss') {
        if (time && pattern) {
            try {
                let date = new Date(time.replace('T', ' ').replace('Z', ' ').replace(/-/g, '/'));
                let opt = {
                    'Y+': date.getFullYear(),
                    'M+': date.getMonth() + 1,
                    'D+': date.getDate(),
                    'h+': date.getHours(),
                    'm+': date.getMinutes(),
                    's+': date.getSeconds()
                };
                for (let k in opt) {

                    pattern = pattern.replace(new RegExp(k, 'g'), opt[k] < 10 ? '0' + opt[k] : opt[k]);
                }
                return pattern;
            } catch (e) {
                return e
            }
        }
    },
    nowDate() {
        let normalDate = new Date();
        let Y = normalDate.getFullYear();
        let M = (normalDate.getMonth() + 1) > 9 ? (normalDate.getMonth() + 1) : ("0" + (normalDate.getMonth() + 1));
        let D = normalDate.getDate() > 9 ? normalDate.getDate() : ("0" + normalDate.getDate());
        return Y + "-" + M + "-" + D;
    },
    $bgInit(music) {
        let state = 0;
        document.addEventListener('touchstart', () => {
            if (state == 0) {
                this.$waitPlay(music);
                state = 1;
            }
        }, false);

        document.addEventListener("WeixinJSBridgeReady", () => {
            music.play();
        }, false);
        this.$waitPlay(music);
        //循环播放
        music.onended = function () {
            music.load();
            music.play();
        }
    },
    $waitPlay(music) {
        setTimeout(() => {
            music.play();
        }, 100)
    },
    $pause(music) {
        music.pause();
    },
    // 随机数字
    $randomNum(minNum, maxNum) {
        switch (arguments.length) {
            case 1:
                return parseInt(Math.random() * minNum + 1, 10);
                break;
            case 2:
                return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                break;
            default:
                return 0;
                break;
        }
    },

};
export default (vue) => {
    for (let key in method) {
        if (method.hasOwnProperty(key)) {
            vue.prototype[key] = method[key]
        }
    }
}