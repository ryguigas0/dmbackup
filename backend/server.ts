import express, { json } from "express"
import characterView from "./views/character"
import characters from "./db_testing/mock_characters"
import db from './db'


const app = express()
app
    .use(json())
    .get("/all", (req, res) => {
        db.openConnection(async (err, collection) => {
            if (err) {
                console.error(err)
                return
            }
            let data = await collection.find().toArray()
            res.json(data)
        })
    })
    .get("/add", (req, res) => {
        db.openConnection(async (err, collection) => {
            if (err) {
                console.error(err)
                return
            }
            collection.insertOne(characters[0],
                (err, result) => res.json(err ?
                    { error: err } :
                    characterView(result.insertedId, characters[0])
                ))
        })
    })
    .listen(3333, () => {
        console.log("http://localhost:3333/")
    })