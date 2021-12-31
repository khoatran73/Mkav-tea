$("#save-profile-btn").click(function (e) {
    const name = $("input[name=name]").val()
    const phone = $("input[name=phone]").val()
    const address = $("input[name=address]").val()

    const data = JSON.stringify({
        name, phone, address
    })

    $.ajax({
        type: "PUT",
        url: "http://localhost:3000/user/edit-customer/",
        data: data,
        processData: false,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (res) {
            if (res.code === 0) {
                swal("Good Job!", "Cập nhật thông tin thành công", "success")
                    .then(() => {
                        location.reload()
                    })
            }
        },
        error: function (err) {
        }
    })

})

$("input[name=name]").keyup(function () {
    const errorMessage = document.createElement("div")
    errorMessage.classList.add("error-message")
    errorMessage.innerHTML = `Họ tên không được`

    if (!$(this).val()) {
        $(this).parent().addClass("error-input")
    } else {
        $(this).parent().removeClass("error-input")
    }
})

$("#user-image").change(function () {
    const data = new FormData($("#image-form")[0])

    $.ajax({
        type: "PUT",
        url: "http://localhost:3000/user/edit-user-image/",
        data: data,
        processData: false,
        contentType: false,
        success: function (res) {
            if (res.code === 0) {
                location.reload()
            }
        },
        error: function (err) {

        }
    })
})

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=')

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1])
        }
    }
    return false
}

{
    const tab = getUrlParameter("tab")
    updateTab(tab)
}

function updateTab(tab) {
    $(".tab").css("display", "none")
    $("#" + tab).css("display", "block")

    $(".profile-main__left--item").removeClass("active")

    $("." + tab).addClass("active")
}

$(".profile").click(function () {
    const url = new URL(window.location)
    url.searchParams.set('tab', 'profile')
    window.history.pushState({}, '', url)
    updateTab("profile")
})

$(".order").click(function () {
    const url = new URL(window.location)
    url.searchParams.set('tab', 'order')
    window.history.pushState({}, '', url)
    updateTab("order")
})

$(".history").click(function () {
    const url = new URL(window.location)
    url.searchParams.set('tab', 'history')
    window.history.pushState({}, '', url)
    updateTab("history")
})

$(".logout").click(function () {
    window.location.href = "/user/logout"
})

{
    const statusHelper = {
        0: "Đã giao hàng",
        1: "Đang xử lí",
        2: "Đang giao hàng",
        3: "Bị từ chối"
    }

    document.querySelectorAll(".status").forEach(status => {
        const statusInner = parseInt(status.innerHTML.trim())

        if (statusInner === 0) {
            status.classList.add("text-success")
            $(".update").addClass("text-success")
        } else if (statusInner === 1) {
            status.classList.add("text-warning")
        } else if (statusInner === 2) {
            status.classList.add("text-info")
            $(".update").addClass("text-info")
        } else if (statusInner === 3) {
            status.classList.add("text-danger")
            $(".update").addClass("text-danger")
        }


        if (statusHelper[statusInner])
            status.innerHTML = statusHelper[statusInner]
    })
}

{
    document.querySelectorAll(".date-modifier").forEach(date => {
        date.innerHTML = date.innerHTML.trim().replace("GMT+0700 (Indochina Time)", "")
    })
}