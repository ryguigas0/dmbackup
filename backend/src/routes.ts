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
        deleteUploadHelper(id)
        CharacterDao.deleteOne({ _id: id })
            .then(result => res.json({ result: result.ok })) /* 1 == ok */
    },
    updateCharacterInfo(req: Request, res: Response) {
        let { id } = req.params
        let updatedCharacter: characterInterface = req.body

        deleteUploadHelper(id)
        updatedCharacter["avatar_url"] = req.file.filename

        CharacterDao.findOneAndUpdate({ _id: id }, updatedCharacter, { new: true })
            .then(result => res.json({
                result: 1,
                id: result?._id
            }))
    },
    addCharacterAtribute(req: Request, res: Response) {
        let { id } = req.params
        let newAtribute = req.body
        CharacterDao.findByIdAndUpdate(id, { $push: { atributes: newAtribute } }, { new: true }).exec()
            .then(result => res.json({
                result: 1,
                character: result
            }))
    },
    deleteCharacterAtribute(req: Request, res: Response) {
        let { characterId, atrId } = req.params
        CharacterDao.findByIdAndUpdate(characterId, { $pull: { atributes: { _id: atrId } } }, { new: true }).exec()
            .then(result => res.json({
                result: 1,
                character: result
            }))
    },
    updateChracterAtribute(req: Request, res: Response) {
        let { characterId, atrId } = req.params
        let { name, value, maxvalue } = req.body
        CharacterDao.updateOne({ _id: characterId, 'atributes._id': atrId }, {
            $set: {
                'atributes.$.name': name ? name : "",
                'atributes.$.value': value ? value : "",
                'atributes.$.maxvalue': maxvalue ? maxvalue : undefined
            }
        }).then(result => res.json({
            result: result.ok
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
        let { characterId, itemId } = req.params
        CharacterDao.findByIdAndUpdate(characterId, { $pull: { inventory: { _id: itemId } } }, { new: true }).exec()
            .then(result => res.json({
                result: 1,
                character: result
            }))
    },
    updateChracterItem(req: Request, res: Response) {
        let { characterId, itemId } = req.params
        let { name, description } = req.body
        CharacterDao.updateOne({ _id: characterId, 'inventory._id': itemId }, {
            $set: {
                'inventory.$.name': name ? name : "",
                'inventory.$.description': description ? description : ""
            }
        }).then(result => res.json({
            result: result.ok
        }))
    },
}
