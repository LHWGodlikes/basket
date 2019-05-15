require.config({
    baseUrl: "/",
    paths: {
        "jquery": "lib/jquery/jquery-3.2.1",
        "header": "js/module/header",
        "footer": "js/module/footer",
        "url": "js/module/url",
        "template": "lib/art-template/template-web",
        "cookie": "lib/jquery-plugins/jquery.cookie",
        "zoom": "lib/jquery-plugins/jquery.elevateZoom-3.0.8.min",
        "swiper": "lib/swiper/js/swiper",
        "fly": "lib/jquery-plugins/jquery.fly"
    },
    // 垫片， 给不满足AMD规范的插件又要依赖于别的模块
    shim: {
        "cookie": {
            deps: ['jquery']
        },
        "zoom": {
            deps: ['jquery']
        },
        "fly": {
            deps: ['jquery']
        }
    }
})