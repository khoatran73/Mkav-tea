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
}