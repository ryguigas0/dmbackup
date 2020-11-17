import { Request, Response } from "express"

import CharacterDao from "./schemas/characterSchema"
import characterView from "./views/characterView"
import characterInterface from "./interfaces/characterInterface"

export default {
    getAllCharacters(req: Request, res: Response) {
        CharacterDao.find().exec((err, characters) => {
            if (err) return console.error(err)
            res.json(characters)
        })

    },
    getCharacter(req: Request, res: Response) {
        let { id } = req.params
        CharacterDao.findById(id).exec((err, character) => {
            if (err) return console.error(err)
            res.json(character)
        })
    },
    addCharacter(req: Request, res: Response) {
        let character = req.body
        CharacterDao.create(character)
            .then(result => res.json(result.id))
            .catch(err => console.error(err))
    },
    deleteCharacter(req: Request, res: Response) {
        let { id } = req.params
        CharacterDao.deleteOne({ _id: id })
            .then(result => res.json(result.ok)) /* 1 == ok */
            .catch(err => console.error(err))
    },
    updateCharacter(req: Request, res: Response) {
        let { id } = req.params
        let updatedCharacter: characterInterface = req.body
        CharacterDao.replaceOne({ _id: id }, updatedCharacter)
            .then(() => res.json({
                result: 1,
                id: id
            }))
            .catch(err => console.error(err))
    }
}