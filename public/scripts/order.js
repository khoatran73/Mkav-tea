$(document).ready(function () {
    {
        const orderCenter = $("#order-center")
        let length = orderCenter.children().length

        for (let i = 1; i <= length; i++) {
            const chevron = $("#chevron-" + i)
            const category = $("#list-product-" + i)
            chevron.click(function () {
                if (chevron.attr("class").includes("fa-chevron-down")) {
                    setTimeout(() => {
                        chevron.removeClass("fa-chevron-down")
                        chevron.addClass("fa-chevron-up")
                    }, 100)
                } else {
                    setTimeout(() => {
                        chevron.removeClass("fa-chevron-up")
                        chevron.addClass("fa-chevron-down")
                    }, 50)
                }
                category.slideToggle()
            })

            const order = $("#order-" + i)

            order.click(function () {
                $('html,body').animate({
                    scrollTop: category.offset().top
                }, 'slow')
            })
        }
    }


    // Handle Scroll Top Icon
    {
        const toTop = document.querySelector("#scroll-top")

        if (window.scrollY === 0) {
            toTop.style.display = "none"
        }

        document.addEventListener("scroll", function () {
            if (window.scrollY === 0) {
                toTop.style.display = "none"
            } else {
                toTop.style.display = ""
            }

            toTop.addEventListener("click", function () {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            })
        })
    }

    // open and close Popup

    $("#close-popup").click(() => {
        $("#popup").css("display", "none")
        resetPopup()
    })

    $(".open-popup").click(function (e) {
        const id = e.target.dataset.id
        getProductInfo(id)
    })

    function getProductInfo(id) {
        $.ajax({
            url: "/payment/" + id,
            type: "GET",
            success: function (res) {
                if (res.code === 0) {
                    displayPopup("flex", res.product, res.toppings)
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
                }
            },
            error: function (err) {
            }
        })
    }

    $(".overlay").click(() => {
        $("#popup").css("display", "none")
        resetPopup()
    })

    function updateProductInfo() {
        const size = "Size " + $("input[name=size]:checked").val()
        const sugar = ", " + $("input[name=sugar]:checked").val() + " đường"
        const ice = ", " + $("input[name=ice]:checked").val() + " đá"
        let toppingArray = []
        let toppings = ""

        $.each($("input[name='topping']:checked"), function () {
            toppingArray.push($(this).val())
        })

        toppingArray.forEach((topping, index) => {
            toppings += ", Thêm " + topping
        })


        $("#product-info").html(`${size}${sugar}${ice}${toppings}`)
    }

    function displayPopup(display, product, toppings) {
        $("#popup").css("display", display)
        if (product)
            updatePopup(product, toppings)

        updateProductInfo()
        resetPopup()
    }

    function updatePopup(product, toppings) {
        const { id, image, name, price, oldPrice } = product
        $("#product-image").attr("src", image)
        $("#product-name").html(name)
        $("#product-price").html(price + ".000đ")
        $("#old-price").html(oldPrice + ".000đ")
        $("#product-money").html(price + ".000đ")
        $("#product-money").data("price", price)
        $("#product-money").data("id", id)
    }

    // Click Money button on Popup
    const cartArray = []

    $("#product-money").click(function () {
        const product_id = $(this).data("id")
        addCartOrderItem(product_id)

        $("#popup").css("display", "none")
    })

    // change product info
    {
        $("input[name=size]").change(() => {
            updateProductInfo()
        })

        $("input[name=ice]").change(() => {
            updateProductInfo()
        })

        $("input[name=sugar]").change(() => {
            updateProductInfo()
        })

        $("input[name=topping]").change(() => {
            updateProductInfo()

            updatePopupMoney(parseInt($("#product-amount").html()))
        })
    }

    function updatePopupMoney(amount) {
        let price = parseInt($("#product-money").data("price"))

        $.each($("input[name='topping']:checked"), function () {
            price += parseInt(this.dataset.price)
        })

        $("#product-money").html((price * amount).toString() + ".000đ")
    }

    // Click + button on Popup 
    $("#add-product").click(() => {
        const productAmount = $("#product-amount")
        let amount = parseInt(productAmount.html())
        amount += 1

        productAmount.html(amount.toString())
        updatePopupMoney(amount)
    })

    // Click - button on Popup 
    $("#reduce-product").click(() => {
        const productAmount = $("#product-amount")
        let amount = parseInt(productAmount.html())

        if (amount === 1)
            return

        amount -= 1

        productAmount.html(amount.toString())
        updatePopupMoney(amount)
    })

    function resetPopup() {
        $("#product-amount").html("1")

        $.each($("input[name='topping']:checked"), function () {
            $(this).prop('checked', false)
        })
    }

    function addCartOrderItem(product_id) {
        const cartOrder = $(".cart-order")
        const productName = $("#product-name").html()
        const productPrice = $("#product-money").data("price")
        const productAmount = $("#product-amount").html()
        let size = $('input[name="size"]:checked').val()
        let sugar = $('input[name="sugar"]:checked').val()
        let ice = $('input[name="ice"]:checked').val()
        let toppingArray = []
        let toppings = ""
        let price = parseInt(productPrice)

        $.each($("input[name='topping']:checked"), function () {
            toppingArray.push($(this).val())
            price += parseInt($(this).data("price"))
        })

        toppingArray.forEach((topping, index) => {
            toppings += ", Thêm " + topping
        })

        const totalPriceItem = price * parseInt(productAmount)

        let toppingArr = []

        $.each($("input[name='topping']:checked"), function () {
            const toppingObj = JSON.stringify({
                id: $(this).attr("id"),
                price: parseInt($(this).data("price"))
            })

            toppingArr.push(toppingObj)
        })

        const cartObj = {
            product_id: product_id,
            amount: parseInt($("#product-amount").html()),
            price: price,
            info: {
                size: $('input[name="size"]:checked').val(),
                ice: $('input[name="ice"]:checked').val(),
                sugar: $('input[name="sugar"]:checked').val(),
            },
            toppings: toppingArr
        }

        $.ajax({
            type: "POST",
            url: "/payment/add-cart",
            data: JSON.stringify(cartObj),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (res) {
            },
            error: function (err) {
            }
        })

        let cartOrderItem = `
            <div class="cart-order-item">
                <div class="cart-order-item-left">
                    <div class="name">${productName} (${size})</div>
                    <div class="customize">${sugar} đường, ${ice} đá${toppings}</div>
                    <div class="total" data-price=${totalPriceItem}>${price}.000đ x ${productAmount} = ${totalPriceItem}.000đ</div>
                </div>
                <div class="cart-order-item-right">
                    <div class="amount">${productAmount}</div>
                    <div class="remove-cart" data-id=${product_id}">Xóa</div>
                </div>
            </div>`

        cartOrder.append(cartOrderItem)

        updateCartTotalPrice()

        handleDeleteCart()
    }

    handleDeleteCart()

    function handleDeleteCart() {
        // click "xóa"
        $(".remove-cart").click(function () {
            const id = this.dataset.id
            const cartOrderItem = this.parentNode.parentNode

            $.ajax({
                type: "DELETE",
                url: "/payment/delete-cart/" + id,
                success: function (res) {
                    if (res.code === 0) {
                        cartOrderItem.remove()
                        updateCartTotalPrice()
                    }
                },
                error: function (err) {

                }
            })
        })

        // click "xóa tất cả"
        $("#remove-all-cart").click(function () {
            $.ajax({
                type: "DELETE",
                url: "/payment/delete-cart/",
                success: function (res) {
                    if (res.code === 0) {
                        $(".cart-order").empty()
                        updateCartTotalPrice()
                    }
                },
                error: function (err) {

                }
            })
        })
    }

    function updateCartTotalPrice() {
        let totalPrice = 0
        $(".total").each(index => {
            totalPrice += parseInt($(".total")[index].dataset.price)
        })
        $(".cart-count-item-2").html($(".cart-order").children().length.toString())
        $(".cart-count-item-4").html(totalPrice + ".000đ")
        $(".cart-count-item-4").parent().data("price", totalPrice)
    }

    // Display number of products category
    {
        for (let i = 1; i <= $("#order").children().length; i++) {
            const orderChildren = $("#order-" + i.toString())
            const span = orderChildren.children()

            span.html($("#list-product-" + i.toString()).children().length.toString())
        }
    }



})
