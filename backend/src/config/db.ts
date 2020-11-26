import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

export default function () {
    mongoose.connect(process.env.MONGO_DB_URI as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })

    const db = mongoose.connection

    db.on("error", err => console.error(err))
    db.once("open", () => console.log("Connected to db"))
    return
}