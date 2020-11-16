import db from "./db"
import characterView from "./views/character"
import { ObjectId } from "mongodb"

import { Request, Response } from "express"

export default {
    getAllCharacters(req: Request, res: Response) {
        db.openConnection(async collection => {
            res.json(await collection.find().toArray())
        })
    },
    getCharacter(req: Request, res: Response) {
        let { id } = req.params
        db.openConnection(async collection => {
            res.json(await collection.findOne({ _id: { $eq: new ObjectId(id) } }))
        })
    },
    addCharacter(req: Request, res: Response) {
        let character = req.body
        db.openConnection(async collection => {
            collection.insertOne(character,
                (err, result) => res.json(err ?
                    { error: err } :
                    characterView(result.insertedId, character)
                ))
        })
    },
    deleteCharacter(req: Request, res: Response) {
        let { id } = req.params
        db.openConnection(collection => {
            collection.deleteOne({ _id: { $eq: new ObjectId(id) } },
                (err, result) => res.json(err ? { error: err } : { result: result.result.ok }))
        })
    }
}