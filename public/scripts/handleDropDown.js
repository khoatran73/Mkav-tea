
$(".dropdown").click(function (e) {
    e.stopPropagation()
    let parent = e.target
    if (e.target.children.length === 0) {
        parent = e.target.parentNode
    }
    if (!parent.classList.contains("active"))
        parent.classList.add("active")
    else
        parent.classList.remove("active")
})

$(window).click(function () {
    if ($(".dropdown").hasClass("active"))
        $(".dropdown").removeClass("active")
})
