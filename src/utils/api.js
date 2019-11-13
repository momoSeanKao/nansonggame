const app = process.env.NODE_ENV === "'development'" ? "127.0.0.1:3000/": "https://pmsjfx.womenhz.com/";
let arr = [{
    url: "/sign/captcha",//二维码
}, {
    url: "/sign/in",//登陆
}, {
    url: "/authentication/logout",//登出
}, {
    url: "/goods/search"//列表&搜索
}, {
    url: "/goods/batchDelete"//批量删除
}, {
    url: "/goods/delete"//删除
}, {
    url: "/goods/update"//编辑
}, {
    url: "/goods/create"//新增
}, {
    url: "/image/upload"//图片上传
}];
let obj = {};
arr.map(function (el, i) {
    obj[el.url] = {
        target: app + el.url,
        changeOrigin: true,
        pathRewrite: {
            ["^" + el.url]: ""
        }
    }
});
module.exports = {
    obj: obj
};
