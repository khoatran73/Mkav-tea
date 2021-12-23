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

    $("#close-popup").click(() => displayPopup("none"))

    $(".open-popup").click(() => displayPopup("flex"))

    $(".overlay").click(() => displayPopup("none"))

    function displayPopup(display) {
        $("#popup").css("display", display)
    }

    // Click + button on Popup 
    $("#add-product").click(() => {
        let productAmount = $("#product-amount")
        let amount = parseInt(productAmount.html())
        amount += 1
        productAmount.html(amount.toString())
    })

    // Click - button on Popup 
    $("#reduce-product").click(() => {
        let productAmount = $("#product-amount")
        let amount = parseInt(productAmount.html())

        if (amount === 1)
            return

        amount -= 1
        productAmount.html(amount.toString())
    })


    // Click Money button on Popup
    $("#product-money").click(() => {
        displayPopup("none")
        addCartOrderItem()
        $("#product-amount").html("1")
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

        $.each($("input[name='topping']:checked"), function() {
            toppingArray.push($(this).val())
        })

        toppingArray.forEach((topping, index)=> {
            toppings += "Thêm " + topping
            if (index < toppingArray.length - 1) {
                toppings += ", "
            }
        })

        console.log(toppings)

        let cartOrderItem = `
            <div class="cart-order-item">
                <div class="cart-order-item-left">
                    <div class="name">${productName} (${size})</div>
                    <div class="customize">${sugar} đường, ${ice} đá, ${toppings}</div>
                    <div class="total">${productPrice} x ${productAmount} = ${parseInt(productPrice) * parseInt(productAmount)}.000đ</div>
                </div>
                <div class="cart-order-item-right">
                    <i class="fas fa-minus-circle"></i>
                    <div class="amount">${productAmount}</div>
                    <i class="fas fa-plus-circle"></i>
                </div>
            </div>`

        cartOrder.append(cartOrderItem)

        $(".cart-count-item-2").html(cartOrder.children().length.toString())
    }

    // Display number of products category

    for (let i = 1; i <= $("#order").children().length; i++) {
        const orderChildren = $("#order-" + i.toString())
        const span = orderChildren.children()

        span.html($("#list-product-" + i.toString()).children().length.toString())
    }
})
