import express, { json, urlencoded } from "express"
import routes from "./routes"

const app = express()
app
    .use(json())
    .use(urlencoded())
    .get("/characters", routes.getAllCharacters)
    .get("/character/:id", routes.getCharacter)
    .delete("/character/:id", routes.deleteCharacter)
    .post("/character", routes.addCharacter)
    .listen(3333, () => {
        console.log("http://localhost:3333/")
    })