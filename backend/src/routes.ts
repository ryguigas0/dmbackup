import { Request, Response } from "express"

import CharacterDao from "./schemas/characterSchema"
import characterInterface from "./interfaces/characterInterface"

import deleteUploadHelper from "./helpers/deleteUpload"

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
        character["avatar_url"] = req.file.filename
        CharacterDao.create(character)
            .then(result => res.json({
                result: 1,
                id: result._id
            }))
    },
    deleteCharacter(req: Request, res: Response) {
        let { id } = req.params
        CharacterDao.findOne({ _id: id }, "avatar_url").then(result => deleteUploadHelper(result?.avatar_url as string))
        CharacterDao.deleteOne({ _id: id })
            .then(result => res.json({ result: result.ok })) /* 1 == ok */
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
    deleteCharacterAtribute(req: Request, res: Response) {
        let { id, atrId } = req.params
        CharacterDao.findByIdAndUpdate(id, { $pull: { atributes: { _id: atrId } } }, { new: true }).exec()
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
    },
    deleteCharacterItem(req: Request, res: Response) {
        let { id, itemId } = req.params
        CharacterDao.findByIdAndUpdate(id, { $pull: { inventory: { _id: itemId } } }, { new: true }).exec()
            .then(result => res.json({
                result: 1,
                character: result
            }))
    }
}
