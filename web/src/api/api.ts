import axios from "axios"
import process from "process"

let api = axios.create({
    baseURL: `${process.env.BACKEND_URL}`,
})

export default api