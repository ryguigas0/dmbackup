import path from "path"
import fs from "fs"

export default function (filename: string) {
    fs.unlink(path.resolve("uploads", filename), err => {
        if (err) console.log(err)
        else {
            console.log("File was deleted!")
        }
    })
}