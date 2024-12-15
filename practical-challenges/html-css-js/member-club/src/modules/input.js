import { clientFetchByID } from "../services/client-fetch-by-id"

const input = document.getElementById("input")
const inputButton = document.querySelector(".button")

input.addEventListener("input", (event) => {
    if(event.target.value !== '') {
        inputButton.classList.add("button-active")
    } else {
        inputButton.classList.remove("button-active")
    }
})

inputButton.addEventListener('click', async () => {
    const data = await clientFetchByID(input.value)
    console.log(data)
})

input.addEventListener('keydown', async (event) => {
    if(event.key === 'Enter') {
        const data = await clientFetchByID(input.value)
        console.log(data)
    }
})