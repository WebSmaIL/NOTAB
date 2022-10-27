function disableCookie() {
    const cookies = document.getElementById('cookies');
    const cookiesButton = document.getElementById('cookiesButton');

    const animateDisable = (block) => {
        let animation = setInterval(() => {
            let currentPosition = Number(block.style.bottom.split("px")[0]);
            if (currentPosition <= -100) {
                clearInterval(animation);
                block.style.display = "none";
                return;
            }
            block.style.bottom = currentPosition - 10 + "px";
        }, 10);
        return animation;
    }
    cookiesButton.addEventListener("click", () => {
        animateDisable(cookies);
    })
    return 0;
}

function validation() {
    const form = document.querySelector('.getInTouch__form');
    const fields = form.querySelectorAll(".field");

    form.addEventListener("submit", (event) => {
        fields.forEach((field) => {
            if (field.classList.contains("invalid")) {
                field.classList.remove("invalid");
            }
        })

        let isValid = true
        event.preventDefault();
        fields.forEach((field) => {
            if (!field.value) {
                isValid = false;
                field.classList.add("invalid");
            }
        })

        if (isValid) {
            alert("Форма отправилась");
        }
    })
    return 0;
}

disableCookie();
validation();

