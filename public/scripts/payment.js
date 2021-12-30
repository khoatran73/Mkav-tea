$("#pay").click(function () {
    $.ajax({
        url: "http://localhost:3000/payment/get-phone-address-user",
        type: "GET",
        success: function (res) {
            if (res.code === 0) {
                payment()
            } else if (res.code === 2) {
                swal({
                    title: "Error",
                    text: res.message,
                    icon: "warning",
                    buttons: true,
                    dangerMode: false,
                })
                    .then((willChangeDir) => {
                        if (willChangeDir) {
                            window.location.href = "/user/login"
                        }
                    })
            } else if (res.code === 1) {
                swal({
                    title: "Error",
                    text: "Vui lòng cập nhật SĐT và Địa chỉ",
                    icon: "error",
                    buttons: true,
                    dangerMode: false,
                })
                    .then((willUpdate) => {
                        if (willUpdate) {
                            $("#edit-modal").css("display", "flex")
                            if (res.address) {
                                $("#address").val(res.address)
                            } else if (res.phone) {
                                $("#phone").val(res.phone)
                            }
                        }
                    })
            }
        },
        error: function (err) {
        }
    })
})

$("#edit-form").submit(function (e) {
    e.preventDefault()

    const phone = $("#phone").val()
    const address = $("#address").val()

    const data = JSON.stringify({
        phone, address
    })


    $.ajax({
        type: "PUT",
        url: "http://localhost:3000/payment/update-phone-address-user",
        data: data,
        processData: false,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (res) {
            console.log(res)
            if (res.code === 0) {
                swal("Good Job!", "Cập nhật thông tin thành công", "success")
                    .then(() => {
                        $("#edit-modal").css("display", "none")
                        payment()
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

function payment() {
    $.ajax({
        url: "http://localhost:3000/payment/add-order",
        type: "GET",
        success: function (res) {
            if (res.code === 0) {
                swal("Good Job!", "Đặt hàng thành công!", "success")
                    .then(() => {
                        location.reload()
                    })
            } else {
                swal("", res.message, "warning")
            }
        },
        error: function (err) {
        }
    })
}

$("#close-btn").click(function () {
    $("#edit-modal").css("display", "none")
})

$("#overlay").click(function () {
    $("#edit-modal").css("display", "none")
})