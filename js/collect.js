require(['require.config'], () => {
    require(['template', 'header', 'footer'], (template) => {
        class Cart {
            constructor() {
                this.init();
                this.click();

            }

            init() {
                let cart = localStorage.getItem('cart');

                if (cart) {
                    // 渲染列表
                    cart = JSON.parse(cart);
                    this.cart = cart;
                    this.render(cart);
                } else {
                    // 提示购物车为空
                    alert('购物车为空，你太穷了');
                }
            }
            click() {
                this.container = $("#list-container");
                this.reduce = $(".reduceNum");
                var _this = this;
                this.container.on("click", ".reduceNum", function() {
                        let i = $(this).parent().parent().index();


                        if (_this.cart[i].num > 1) {
                            _this.cart[i].num--;
                            $(this).next().val(_this.cart[i].num);
                        } else {
                            _this.cart[i].num = 1;
                        }

                        localStorage.setItem('cart', JSON.stringify(_this.cart));
                        let cart = JSON.parse(localStorage.getItem('cart'));


                        _this.render(cart);
                    }),
                    this.container.on("click", ".addNum", function() {
                        let i = $(this).parent().parent().index();
                        _this.cart[i].num++;
                        $(this).next().val(_this.cart[i].num);


                        localStorage.setItem('cart', JSON.stringify(_this.cart));
                        let cart = JSON.parse(localStorage.getItem('cart'));
                        _this.render(cart);
                    }),
                    this.container.on("click", ".delete", function() {
                        let i = $(this).parent().parent().index();
                        console.log(_this.cart);
                        _this.cart.splice(i, 1);
                        localStorage.setItem('cart', JSON.stringify(_this.cart));
                        let cart = JSON.parse(localStorage.getItem('cart'));
                        _this.render(cart);

                    })


            }


            render(cart) {
                console.log(cart);
                // template('cart-template', {list: cart})
                $("#list-container").html(template('cart-template', { cart }));
                let num = 0;
                for (let i = 0; i < cart.length; i++) {
                    num += cart[i].price * cart[i].num;
                }
                $("#totalMoney").html(num + "元");
                $("#prePrice").html(num + "元");


            }

        }
        new Cart();
    })
})