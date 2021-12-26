window.onload = function () {
    const header = document.querySelector("#header")
    const html = document.querySelector("html")

    document.addEventListener("scroll", function () {
        header.classList.add("header-fixed")
        let scrollY = html.scrollTop
        if (scrollY === 0) {
            if (header.classList.contains("header-fixed")) {
                header.classList.remove("header-fixed")
            }
        }
    })

    $("#login-btn").click(function () {
        window.location.href = "/user/login"
    })

    $("#register-btn").click(function () {
        window.location.href = "/user/register"
    })

    $("#logout-btn").click(function () {
        swal({
            title: "Đăng xuất ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    window.location.href = "/user/logout"
                } 
            })
    })
}