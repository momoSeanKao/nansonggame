<template>
    <div></div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex'

    export default {
        name: "index",
        data() {
            return {}
        },
        props: [],
        activated() {

        },
        beforeCreate() {//创建前状态

        },
        created() {//创建完毕状态

        },
        beforeMount() {//挂载前状态
            const redirectUrl = encodeURIComponent('https://app.bowu66.com/museum-cms/oauth/second');
            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7c5c9b0cd5d720ae" + "&redirect_uri=" + redirectUrl + "&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
        },
        mounted() {//挂载结束状态

        },
        components: {//模板

        },
        methods: {//事件

        }
    }
</script>

<style scoped>

</style>