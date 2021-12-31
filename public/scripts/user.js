window.onload = function () {
    function hideEye() {
        const password = document.querySelector("#password")
        const passwordConfirm = document.querySelector("#password-confirm")

        const eye1 = document.querySelector("#eye-1")
        const eye2 = document.querySelector("#eye-2")

        if (eye1) {
            eye1.onclick = () => {
                if (password.type === "password") {
                    password.type = "text"
                    eye1.classList.remove("fa-eye")
                    eye1.classList.add("fa-eye-slash")
                } else {
                    password.type = "password"
                    eye1.classList.remove("fa-eye-slash")
                    eye1.classList.add("fa-eye")
                }
            }
        }

        if (eye2) {
            eye2.onclick = () => {
                if (passwordConfirm.type === "password") {
                    passwordConfirm.type = "text"
                    eye2.classList.remove("fa-eye")
                    eye2.classList.add("fa-eye-slash")
                } else {
                    passwordConfirm.type = "password"
                    eye2.classList.remove("fa-eye-slash")
                    eye2.classList.add("fa-eye")
                }
            }
        }
    }

    hideEye()

    function hideErrorText() {
        $("input").keydown(() => {
            $("#error-text").css("visibility", "hidden")
        })
    }

    hideErrorText()

    $("#register-form").submit(function (e) {
        e.preventDefault()

        const data = new FormData($("#register-form")[0])

        $.ajax({
            type: "POST",
            url: "/user/register",
            data: data,
            processData: false,
            contentType: false,
            success: function (res) {
                if (res.code === 0) {
                    swal("Good Job!", "Đăng ký tài khoản thành công!", "success")
                        .then(() => {
                            window.location.href = "/"
                        })
                } else {
                    $("#error-text").css("visibility", "visible")
                    $("#error-text").html(res.message)
                }
            },
            error: function (err) {

            }
        })
    })


    $("#login-form").submit(function (e) {
        e.preventDefault()

        const data = JSON.stringify({
            email: $("#email").val(),
            password: $("#password").val()
        })

        $.ajax({
            type: "POST",
            url: "/user/login",
            data: data,
            processData: false,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                if (res.code === 0) {
                    window.location.href = "/"
                } else {
                    $("#error-text").css("visibility", "visible")
                    $("#error-text").html(res.message)
                }
            },
            error: function (err) {

            }
        })
    })
}

