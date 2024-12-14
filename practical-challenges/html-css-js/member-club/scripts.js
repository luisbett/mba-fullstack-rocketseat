const input = document.getElementById("input")
const inputButton = document.querySelector(".button")

input.addEventListener("input", (event) => {
    if(event.target.value !== '') {
        inputButton.classList.add("button-active")
    } else {
        inputButton.classList.remove("button-active")
    }
})