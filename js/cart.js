require(['require.config'], () => {
    require(['template', 'header', 'footer'], (template, header) => {
        class Cart {
            constructor() {
                this.init();
                this.click();
                this.check();


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
                //点击减
                this.container.on("click", ".reduceNum", function() {
                        let i = $(this).parent().parent().index();


                        if (_this.cart[i].num > 1) {
                            _this.cart[i].num--;
                            $(this).parent().parent().find(".inputNum").val(_this.cart[i].num);

                            $(this).next().val(_this.cart[i].num);
                        } else {
                            _this.cart[i].num = 1;
                        }

                        localStorage.setItem('cart', JSON.stringify(_this.cart));
                        let cart = JSON.parse(localStorage.getItem('cart'));
                        header.calcCartNum();
                        _this.add();


                    }),
                    //点击加
                    this.container.on("click", ".addNum", function() {
                        let i = $(this).parent().parent().index();
                        _this.cart[i].num++;
                        $(this).parent().parent().find(".inputNum").val(_this.cart[i].num);

                        $(this).next().val(_this.cart.num);


                        localStorage.setItem('cart', JSON.stringify(_this.cart));
                        let cart = JSON.parse(localStorage.getItem('cart'));
                        header.calcCartNum();
                        _this.add();

                    }),
                    //删除物品
                    this.container.on("click", ".delete", function() {
                        let i = $(this).parent().parent().index();
                        console.log(_this.cart);
                        _this.cart.splice(i, 1);
                        localStorage.setItem('cart', JSON.stringify(_this.cart));
                        let cart = JSON.parse(localStorage.getItem('cart'));
                        header.calcCartNum();
                        _this.render(_this.cart)
                        _this.add();

                    })


            }
            check() {
                    this.check = $("#check");
                    let _this = this;
                    let num = 0;
                    $(".allCheck").on("change", function() {

                            console.log("1" + $('.allCheck').prop('checked'));
                            if ($('.allCheck').prop('checked') == false) {
                                $(".shop-list").find("input").prop('checked', false);

                            } else {
                                $(".shop-list").find("input").prop("checked", true);
                                num = 4;


                            }
                            _this.add();

                        }),
                        $(".shop-list").find("input").on("change", function() {
                            if ($(this).prop('checked') == true) {
                                num += 1;

                            } else if ($(this).prop('checked') == false) {
                                num -= 1;
                            }
                            _this.add();

                            console.log(num);
                            num == _this.cart.length ? $(".allCheck").prop("checked", true) : $(".allCheck").prop("checked", false);

                        })
                }
                //计算总价
            add() {
                this.totalMoney = 0;
                $("#list-container").children().each((i, item) => {
                    if ($(item).find('input').prop("checked")) {
                        this.totalMoney += Number($(item).find(".price").html().slice(1)) * Number($(item).find(".inputNum").val());
                    }
                    $("#totalMoney").html(this.totalMoney + "元");
                    $("#prePrice").html(this.totalMoney + "元");

                })
            }


            render(cart) {
                console.log(cart);
                // template('cart-template', {list: cart})
                $("#list-container").html(template('cart-template', { cart }));


            }

        }
        new Cart();
    })
})