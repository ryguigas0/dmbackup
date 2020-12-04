import path from "path"
import fs from "fs"
import CharacterDao from "../schemas/characterSchema"

export default function (id: string) {
    CharacterDao.findOne({ _id: id }, "avatar").then(result => {
        let filename: string = result?.avatar as string
        if (filename) {
            fs.unlink(path.resolve("uploads", filename), err => {
                if (err) console.log(err)
            })
        }
    }).catch(err => console.error(err))
}