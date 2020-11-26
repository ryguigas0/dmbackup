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
    .use(json())
    .use(urlencoded({ extended: true }))
    .use(cors({
        origin: "http://localhost:3333",
        optionsSuccessStatus: 200
    }))
    .use((req: Request, res: Response, next: NextFunction) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, PUT")
        next();
    })
    .use(morgan("tiny"))
    .use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
        console.error(err)
        res.status(500).json({
            result: 0
        })
    })
    .use("/images", express.static(path.join(__dirname, "..", "uploads")))
    .get("/characters", routes.getAllCharacters)
    .get("/character/:id", routes.getCharacter)
    .post("/character", multer(multerConfig as multer.Options).single("avatar"), routes.addCharacter)
    .delete("/character/:id", routes.deleteCharacter)
    .delete("/character/:id/inventory/:itemId", routes.deleteCharacterItem)
    .delete("/character/:id/atributes/:atrId", routes.deleteCharacterAtribute)
    .patch("/character/:id", routes.updateCharacter)
    .put("/character/:id/atributes", routes.addCharacterAtribute)
    .put("/character/:id/inventory", routes.addCharacterItem)
    .listen(`${process.env.PORT}`, () => {
        console.log("Rodando no port: " + `${process.env.PORT}`)
    })