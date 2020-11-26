import axios from "axios"

let api = axios.create({
    baseURL: `https://dmbackup-backend.glitch.me/`,
})

export default api
