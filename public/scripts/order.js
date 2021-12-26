$(document).ready(function () {
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

    // Handle Scroll Top Icon
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


    // open and close Popup

    $("#close-popup").click(() => displayPopup("none", {}))

    $(".open-popup").click((e) => {
        const productParent = e.target.parentNode.parentNode
        const src = productParent.children[0].children[0].src
        const productName = productParent.children[1].children[0].innerHTML
        const productPrice = productParent.children[1].children[1].dataset.price
        const oldPrice = productParent.children[1].children[1].children[0].dataset.price

        const product = {
            src, productName, productPrice, oldPrice
        }


        displayPopup("flex", product)
    })


    $(".overlay").click(() => displayPopup("none"))

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

    function displayPopup(display, product) {
        $("#popup").css("display", display)
        if (product)
            updatePopup(product)
        updateProductInfo()
    }

    function updatePopup(product) {
        const { src, productName, productPrice, oldPrice } = product
        $("#product-image").attr("src", src)
        $("#product-name").html(productName)
        $("#product-price").html(productPrice + ".000đ")
        $("#old-price").html(oldPrice + ".000đ")
        $("#product-money").html(productPrice + ".000đ")
        $("#product-money").data("price", productPrice)
    }

    // change product info
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


    // Click Money button on Popup
    $("#product-money").click(() => {
        displayPopup("none")
        addCartOrderItem()
        resetPopup()

        function resetPopup() {
            $("#product-amount").html("1")

            $.each($("input[name='topping']:checked"), function () {
                console.log($(this))
                $(this).prop('checked', false)
            })
        }

    })

    function addCartOrderItem() {
        const cartOrder = $(".cart-order")
        const productName = $("#product-name").html()
        const productPrice = $("#product-price").html()
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

        let cartOrderItem = `
            <div class="cart-order-item">
                <div class="cart-order-item-left">
                    <div class="name">${productName} (${size})</div>
                    <div class="customize">${sugar} đường, ${ice} đá${toppings}</div>
                    <div class="total" data-price=${totalPriceItem}>${price}.000đ x ${productAmount} = ${totalPriceItem}.000đ</div>
                </div>
                <div class="cart-order-item-right">
                    <div class="amount">${productAmount}</div>
                    <div class="remove-cart">Xóa</div>
                </div>
            </div>`

        cartOrder.append(cartOrderItem)

        updateCartTotalPrice()

        $(".remove-cart").click(function () {
            this.parentNode.parentNode.remove()
            updateCartTotalPrice()
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

    // click "xóa tất cả"
    $("#remove-all-cart").click(function () {
        $(".cart-order").empty()
        updateCartTotalPrice()
    })

})
