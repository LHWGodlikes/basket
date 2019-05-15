define(['jquery', 'cookie'], $ => {
    function Header() {
        this.container = $("#header-container");
        this.load().then(() => {
            this.isLogin();
            this.calcCartNum();
        });

    }

    // Object.assign(Header.prototype, {

    // });

    // 对象合并
    $.extend(Header.prototype, {
        // ES6对象增强写法
        load() {
            // header.html加载到container里
            // this.container.load('/html/module/header.html #header-bottom'); // 选择加载文件中的某一部分
            return new Promise(resolve => {
                this.container.load('/html/module/header.html', () => {
                    // load异步执行结束
                    resolve();
                });
            })
        },
        calcCartNum() {
            let cart = localStorage.getItem('cart');
            let num = 0;
            if (cart) {
                // 计算总数量
                cart = JSON.parse(cart);



                // 以总数量为例
                num = cart.reduce((n, shop) => {
                    n += shop.num;
                    return n;
                }, 0);

            }
            $("#car-num").html(num);
        },


        isLogin() {
            this.loginBtn = $("#login-btn");
            this.afterLogin = $("#after-login");
            this.nameSpan = $("#name");
            this.logout = $("#exit");
            let username = $.cookie("username");
            if (username) {
                console.log("1");
                this.loginBtn.hide();
                this.afterLogin.show();
                this.nameSpan.html(username + "&nbsp;");
            }
            this.logout.on("click", () => {
                console.log("11");
                // 退出登录
                if (confirm("确定要退出吗？")) {
                    $.removeCookie("username", { path: '/' });
                    this.loginBtn.show();
                    this.afterLogin.hide();
                }
            })
        }

    })

    return new Header();
});