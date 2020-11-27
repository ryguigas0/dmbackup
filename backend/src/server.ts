import express, { Request, Response, NextFunction, ErrorRequestHandler } from "express"
import multer from "multer"
import morgan from "morgan"
import path from "path"
import { json, urlencoded } from "express"
import cors from "cors"
import routes from "./routes"
import multerConfig from "./config/multer"
import db from "./config/db"

db()
const app = express()
app
    /* Middlewares */
    .use(json())
    .use(urlencoded({ extended: true }))
    .use(cors())
    .use(morgan("tiny"))
    /* Error handler */
    .use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
        console.error(err)
        res.status(500).json({
            result: 0
        })
    })

    /* Access to character images */
    .use("/images", express.static(path.join(__dirname, "..", "uploads")))
    /* Access data */
    .get("/characters", routes.getAllCharacters)
    .get("/character/:id", routes.getCharacter)
    /* Add data */
    .post("/character", multer(multerConfig as multer.Options).single("avatar"), routes.addCharacter)
    .post("/character/:id/atributes", routes.addCharacterAtribute)
    .post("/character/:id/inventory", routes.addCharacterItem)
    /* Delete data */
    .delete("/character/:id", routes.deleteCharacter)
    .delete("/character/:characterId/inventory/:itemId", routes.deleteCharacterItem)
    .delete("/character/:characterId/atributes/:atrId", routes.deleteCharacterAtribute)
    /* Update data */
    .patch("/character/:id", multer(multerConfig as multer.Options).single("avatar"), routes.updateCharacterInfo)
    .patch("/character/:characterId/inventory/:itemId", routes.updateChracterItem)
    .patch("/character/:characterId/atributes/:atrId", routes.updateChracterAtribute)

    .listen(`${process.env.PORT}`, () => {
        console.log("Rodando no port: " + `${process.env.PORT}`)
    })