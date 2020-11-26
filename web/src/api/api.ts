import axios from "axios"
import process from "process"

let api = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
})

export default api
