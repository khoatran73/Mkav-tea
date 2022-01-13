$(".ship-finish").click(function () {
    const id = $(this).data("id")
    const data = JSON.stringify({ status: 0 })

    $.ajax({
        type: "PUT",
        url: "/shipper/update-status/" + id,
        data: data,
        processData: false,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (res) {
            console.log(res)
            if (res.code === 0) {
                location.reload()
            }
        },
        error: function (err) {
        }
    })
})