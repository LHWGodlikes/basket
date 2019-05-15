require(['require.config'], () => {
    require(['url', 'jquery', 'cookie'], (url, $) => {
        class Login {
            constructor() {
                this.usernameInput = $("#username");
                this.passwordInput = $("#password");
                this.btn = $("#login");

                this.bindEvents();
            }

            bindEvents() {
                this.btn.on("click", () => {

                    let username = this.usernameInput.val(),
                        password = this.passwordInput.val();

                    $.ajax({
                        url: url.phpBaseUrl + "user/login.php",
                        type: "post",
                        data: { username, password },

                        success: data => {
                            console.log(data);
                            if (data.res_code === 1) {
                                this.loginSucc(username);
                            } else {
                                alert(data.res_message);
                            }
                        },
                        dataType: 'json'
                    })

                })
            }

            loginSucc(username) {
                // 存cookie

                $.cookie('username', username, { path: "/" });
                alert('登录成功，即将跳转首页');
                location.href = "/";


            }
        }
        new Login();
    })
})