require(['require.config'], () => {
    require(['url', 'template', 'header', 'footer'], (url, template) => {
        class List {
            constructor() {
                    this.getData();
                }
                // 请求列表数据
            getData() {
                let _this = this;
                $.ajax({
                    url: url.rapBaseUrl + "list/get",
                    type: 'get',
                    dataType: "json",
                    success: data => {
                        if (data.res_code === 1) this.render(data.res_body.list);
                        this.data = data;
                    }


                })

            }
            click() {
                let _this = this;
                $("#like").on("click", function() {




                    $("#like").css("background", "url(/img/icon.png) -97px -43px no-repeat");
                    alert("收藏成功！");
                    let id = _this.data.res_body.list[$(this).index() - 1].id;
                    console.log(id);



                })
            }


            render(list) {
                $("#list-box").html(template('list-template', { list }));
                this.click();

            }

        }

        new List();
    })
})