import { clientFetchByID } from "../services/client-fetch-by-id"

const input = document.getElementById("input")
const inputButton = document.querySelector(".button")
const clientName = document.querySelector(".user-info span")
const clientSince = document.querySelector(".user-info p")
const clientImage = document.querySelector(".profile-pic img")
const totalHaircuts = document.querySelector(".history-header p")
const appointments = document.querySelector(".history-appointments")
const haircutsLeft = document.querySelector(".progress-content span strong")
const haircutsProgress = document.querySelector(".progress-bar progress")
const haircutsOfLeft = document.querySelector(".progress-bar p")
const tagNumber = document.querySelector(".tag span")
const slots = document.querySelector(".slots")

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

        //Set progress info
        haircutsLeft.textContent = data.loyaltyCard.cutsRemaining
        haircutsProgress.setAttribute("max", data.loyaltyCard.cutsNeeded)
        haircutsProgress.setAttribute("value", data.loyaltyCard.totalCuts)
        haircutsOfLeft.textContent = `${data.loyaltyCard.totalCuts} de ${data.loyaltyCard.cutsNeeded}`

        //Set card info
        tagNumber.textContent = `ID: ${data.id}`
        
        //Set slots
        slots.innerHTML = ""

        //Goes through every haircut already done
        for(let i = 0; i < data.loyaltyCard.totalCuts; i++) {
            
            //Create div wrapper
            const divSlot = document.createElement("div")
            divSlot.classList.add("slot-card")
            
            const iconSlot = document.createElement("img")
            iconSlot.setAttribute("src", "./src/assets/pin-check.png")
            iconSlot.setAttribute("alt", "Pin check logo")

            divSlot.append(iconSlot)

            slots.append(divSlot)
        }

        //Goes through every haircut left
        for(let i = 0; i < data.loyaltyCard.cutsRemaining; i++) {
            
            //Check if it is the last div
            if(data.loyaltyCard.cutsRemaining === i + 1) {
                //Create div wrapper
                const divSlot = document.createElement("div")
                divSlot.classList.add("slot-card")
                divSlot.classList.add("slot-gift")

                const iconSlot = document.createElement("img")
                iconSlot.setAttribute("src", "./src/assets/icons/gift-solid.svg")
                iconSlot.setAttribute("alt", "Pin gift logo")

                divSlot.append(iconSlot)

                slots.append(divSlot)
            } else {
                //Create div wrapper
                const divSlot = document.createElement("div")
                divSlot.classList.add("slot-card")

                slots.append(divSlot)
            }
        }
    }
}