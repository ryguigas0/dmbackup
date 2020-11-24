import axios from "axios"

let api = axios.create({
    baseURL: "http://localhost:3333/",
})

export default api