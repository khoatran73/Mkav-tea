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

$("#logout").click(function () {
    window.location.href = "/user/logout"
})

$(".ship").click(function () {
    const id = $(this).data("id")
    const data = JSON.stringify({ status: 2 })

    $.ajax({
        type: "PUT",
        url: "/salesman/update-status/" + id,
        data: data,
        processData: false,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (res) {
            if (res.code === 0) {
                location.reload()
            }
        },
        error: function (err) {
        }
    })
})


{
    document.querySelectorAll(".date-modifier").forEach(date => {
        date.innerHTML = date.innerHTML.trim().replace("GMT+0700 (Indochina Time)", "")
    })
}