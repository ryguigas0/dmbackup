import express, { json, urlencoded, Request, Response, NextFunction, ErrorRequestHandler } from "express"
import routes from "./routes"
import db from "./config/db"

db()
const app = express()
app
    .use(json())
    .use(urlencoded({ extended: true }))
    .use((req: Request, res: Response, next: NextFunction) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, PUT")
        next();
    })
    .use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
        console.error(err)
        res.status(500).json({
            result: 0
        })
    })
    .get("/characters", routes.getAllCharacters)
    .get("/character/:id", routes.getCharacter)
    .post("/character", routes.addCharacter)
    .delete("/character/:id", routes.deleteCharacter)
    .delete("/character/:id/inventory/:itemId", routes.deleteCharacterItem)
    .delete("/character/:id/atributes/:atrId", routes.deleteCharacterAtribute)
    .patch("/character/:id", routes.updateCharacter)
    .put("/character/:id/atributes", routes.addCharacterAtribute)
    .put("/character/:id/inventory", routes.addCharacterItem)
    .listen(3333, () => {
        console.log("http://localhost:3333/")
    })