window.onload = function () {
    let password = document.querySelector("#password")
    let passwordConfirm = document.querySelector("#password-confirm")

    let eye1 = document.querySelector("#eye-1")
    let eye2 = document.querySelector("#eye-2")

    if (eye1) {
        eye1.onclick = () => {
            if (password.type === "password") {
                password.type = "text"
                eye1.classList.remove("fa-eye")
                eye1.classList.add("fa-eye-slash")
            } else {
                password.type = "password"
                eye1.classList.remove("fa-eye-slash")
                eye1.classList.add("fa-eye")
            }
        }
    }

    if (eye2) {
        eye2.onclick = () => {
            if (passwordConfirm.type === "password") {
                passwordConfirm.type = "text"
                eye2.classList.remove("fa-eye")
                eye2.classList.add("fa-eye-slash")
            } else {
                passwordConfirm.type = "password"
                eye2.classList.remove("fa-eye-slash")
                eye2.classList.add("fa-eye")
            }
        }
    }
}

