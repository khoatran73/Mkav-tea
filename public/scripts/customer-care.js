$("#add-form").submit(e => {
    e.preventDefault()

    const data = new FormData($("#add-form")[0])

    $.ajax({
        type: "POST",
        url: "http://localhost:3000/customer-care/add-product",
        data: data,
        processData: false,
        contentType: false,
        success: function (res) {
            if (res.code === 0) {
                swal("Good Job!", "Thêm Sản phẩm thành công!", "success")
                    .then(() => {
                        $('#add-modal').modal('hide')
                        location.reload()
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

$("#edit-form").submit(e => {
    e.preventDefault()

    const data = new FormData($("#edit-form")[0])
    const id = $("#edit-save-btn").data("id")

    $.ajax({
        type: "PUT",
        url: "http://localhost:3000/customer-care/edit-product/?id=" + id,
        data: data,
        processData: false,
        contentType: false,
        success: function (res) {
            if (res.code === 0) {
                swal("Good Job!", "Sửa Sản phẩm thành công!", "success")
                    .then(() => {
                        $('#edit-modal').modal('hide')
                        location.reload()
                    })
            } else {
                $("#edit-error-text").css("visibility", "visible")
                $("#edit-error-text").html(res.message)
            }
        },
        error: function (err) {

        }
    })
})

{
    $(".edit-product").click(e => {
        const id = e.target.dataset.id

        $.ajax({
            url: "http://localhost:3000/customer-care/" + id,
            type: "GET",
            success: function (res) {
                $('#edit-modal').modal('show')
                updateEditModal(res.product)
            },
            error: function (err) {
            }
        })
    })

    function updateEditModal(product) {
        $("#edit-name").val(product.name)

        $("#edit-old-price").val(product.oldPrice)

        $("#edit-price").val(product.price)

        $("#edit-type").val(product.type.toString()).change()

        $("#edit-save-btn").data("id", product.id)
    }
}

{
    $(".delete-product").click(e => {
        swal({
            title: "DELETE",
            text: `Xóa Sản phẩm này ?`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    deleteProduct(e)
                } else {
                    swal("Sản phẩm đã được giữ lại", {
                        icon: "success",
                    })
                }
            })
    })
}

function deleteProduct(e) {
    const id = e.target.dataset.id
    const parent = e.target.parentNode.parentNode

    $.ajax({
        url: "http://localhost:3000/customer-care/delete-product/?id=" + id,
        type: "DELETE",
        success: function (res) {
            if (res.code === 0) {
                swal("Good Job!", "Xóa Sản phẩm thành công!", "success")
                    .then(() => {
                        parent.remove()
                        updateIndex()
                    })
            }
        },
        error: function (err) {
            
        }
    })

    function updateIndex() {
        for (let i = 0; i < $("#table-body").children().length; i++) {
            $("#table-body").children()[i].children[0].innerHTML = i + 1//++i.toString()
        }
    }
}

{
    const typeHelper = {
        1: "Trà Sữa",
        2: "Fresh Fruit Tea",
        3: "Macchiato",
        4: "Sữa Chua Dẻo",
        5: "Topping",
    }

    document.querySelectorAll(".type").forEach(type => {
        const typeInner = parseInt(type.innerHTML.trim())
        if (typeHelper[typeInner])
            type.innerHTML = typeHelper[typeInner]
    })
}