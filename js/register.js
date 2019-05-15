require(['require.config'], () => {
    require(['url', 'header'], (url) => {
        class Register {
            constructor() {
                this.usernameInput = $("#username");
                this.passwordInput = $("#password");
                this.passwordInputOk = $("#passwordOk");
                this.btn = $("#register");
                this.bindEvents();
            }

            bindEvents() {
                this.btn.on("click", () => {
                    console.log(1);
                    // 取用户名和密码提交后台
                    let username = this.usernameInput.val(),
                        password = this.passwordInput.val(),
                        passwordOk = this.passwordInputOk.val();
                    if (password == passwordOk) {
                        $.ajax({
                            url: url.phpBaseUrl + "user/register.php",
                            type: "post",
                            data: { username, password },
                            success: data => {
                                if (data.res_code === 1) {
                                    alert(data.res_message + ", 即将跳转登录页");
                                    location.href = 'login.html';
                                } else {
                                    alert(data.res_message);
                                }
                            },
                            dataType: 'json'
                        })
                    } else {
                        alert("两次输入的密码不一致，请重新输入！");
                    }

                })
            }
        }
        new Register();
    })
})