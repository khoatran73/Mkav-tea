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
            console.log(res)
            if (res.code === 0) {
                swal("Good Job!", "Cập nhật thông tin thành công", "success")
                    .then(() => {
                        location.reload()
                    })
            }
        },
        error: function (err) {
            console.log(err)
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