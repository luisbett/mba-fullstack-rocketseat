import { apiConfig } from "./api-config"

export async function clientFetchByID(id) {
    try {
        const response = await fetch(`${apiConfig.baseURL}/clients/${id}`)
        
        const data = await response.json()

        return data
    } catch (error) {
        console.log(error)
        alert('It was not possible to fetch data from client id ' + id)
    }
}