import { Request, Response } from "express"

import CharacterDao from "./schemas/characterSchema"
import characterView from "./views/characterView"
import characterInterface from "./interfaces/characterInterface"

export default {
    getAllCharacters(req: Request, res: Response) {
        CharacterDao.find().exec().then(characters => res.json(characters))
    },
    getCharacter(req: Request, res: Response) {
        let { id } = req.params
        CharacterDao.findById(id).exec().then(character => {
            res.json(character)
        })
    },
    addCharacter(req: Request, res: Response) {
        let character = req.body
        CharacterDao.create(character)
            .then(result => res.json(characterView(result.id, character)))
    },
    deleteCharacter(req: Request, res: Response) {
        let { id } = req.params
        CharacterDao.deleteOne({ _id: id })
            .then(result => res.json(result.ok)) /* 1 == ok */
    },
    updateCharacter(req: Request, res: Response) {
        let { id } = req.params
        let updatedCharacter: characterInterface = req.body
        CharacterDao.findOneAndUpdate({ _id: id }, updatedCharacter, { new: true })
            .then(result => res.json({
                result: 1,
                id: result?._id
            }))
    },
    addCharacterAtribute(req: Request, res: Response) {
        let { id } = req.params
        let newAtribute = req.body
        CharacterDao.findByIdAndUpdate({ _id: id }, { $push: { atributes: newAtribute } }, { new: true }).exec()
            .then(result => res.json({
                result: 1,
                character: result
            }))
    },
    addCharacterItem(req: Request, res: Response) {
        let { id } = req.params
        let newItem = req.body
        CharacterDao.findByIdAndUpdate({ _id: id }, { $push: { inventory: newItem } }, { new: true }).exec()
            .then(result => res.json({
                result: 1,
                character: result
            }))
    }
}