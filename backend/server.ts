import express, { json, urlencoded } from "express"
import routes from "./routes"
import db from "./config/db"

db()
const app = express()
app
    .use(json())
    .use(urlencoded({ extended: true }))
    .use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
    .get("/characters", routes.getAllCharacters)
    .post("/character", routes.addCharacter)
    .get("/character/:id", routes.getCharacter)
    .delete("/character/:id", routes.deleteCharacter)
    .patch("/character/:id", routes.updateCharacter)
    .listen(3333, () => {
        console.log("http://localhost:3333/")
    })