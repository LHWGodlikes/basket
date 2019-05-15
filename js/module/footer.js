define(['jquery'], $ => {
    function Footer() {
        this.container = $("#footer-container");
        this.load().then(() => {
            // this.search();
        });

    }

    // 对象合并
    $.extend(Footer.prototype, {
        // ES6对象增强写法
        load() {
            // header.html加载到container里
            // this.container.load('/html/module/header.html #header-bottom'); // 选择加载文件中的某一部分
            return new Promise(resolve => {
                this.container.load('/html/module/footer.html', () => {
                    // load异步执行结束
                    resolve();
                });
            })
        },

        // search() {
        //     // 搜索框功能
        //     // container内部所有的.search-form
        //     // let form = this.container.find(".search-form");

        //     $("#search-input").on('keyup', function() {
        //         let keyWords = $(this).val();
        //         // 带上关键字请求jsonp接口
        //         $.getJSON('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?&wd=' + keyWords, data => {
        //             console.log(data);
        //         })
        //     })
        // }
    })

    return new Footer();
});