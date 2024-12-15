import { clientFetchByID } from "../services/client-fetch-by-id"

const input = document.getElementById("input")
const inputButton = document.querySelector(".button")
const clientName = document.querySelector(".user-info span")
const clientSince = document.querySelector(".user-info p")
const clientImage = document.querySelector(".profile-pic img")
const totalHaircuts = document.querySelector(".history-header p")
const appointments = document.querySelector(".history-appointments")

input.addEventListener("input", (event) => {
    if(event.target.value !== '') {
        inputButton.classList.add("button-active")
    } else {
        inputButton.classList.remove("button-active")
    }
})

inputButton.addEventListener('click', async () => {
    fetchClientByID(input.value)
})

input.addEventListener('keydown', async (event) => {
    if(event.key === 'Enter') {
        fetchClientByID(input.value)
    }
})

async function fetchClientByID() {
    //Call API to get client info
    const data = await clientFetchByID(input.value)

    if(data) {
        //Set client info
        clientName.textContent = data.name
        clientSince.textContent = `Cliente desde ${data.clientSince}`
        clientImage.setAttribute("src", data.picture)

        console.log(data.appointmentHistory)

        //Set appointment history
        totalHaircuts.textContent = `${data.appointmentHistory.length} ${data.appointmentHistory.length > 1 ? 'cortes' : 'corte'}`
        appointments.innerHTML = ""

        //Goes through every appointment
        data.appointmentHistory.map((appointment) => {
            
            //Date
            const date = document.createElement("span")
            date.textContent = appointment.date

            //Time
            const time = document.createElement("p")
            time.textContent = appointment.time

            //Icon
            const icon = document.createElement("img")
            icon.setAttribute("src", "./src/assets/icons/seal-check.svg")
            icon.setAttribute("alt", "Pin check green")

            //Title div
            const divTitle = document.createElement("div")
            divTitle.classList.add("appointment-item-title")
            divTitle.append(date)
            divTitle.append(time)

            //Image div
            const divImage = document.createElement("div")
            divImage.classList.add("appointment-item-icon")
            divImage.append(icon)

            //Appointment div
            const divAppointment = document.createElement("div")
            divAppointment.classList.add("appointment-item")
            divAppointment.append(divTitle)
            divAppointment.append(divImage)

            //Add appointment to container
            appointments.append(divAppointment)
        })
    }
}