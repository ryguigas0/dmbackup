import express from "express"
import multer from "multer"
import path from "path"
import crypto from "crypto"

export default {
    dest: path.resolve(__dirname, "..", "..", "uploads"),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, "..", "..", "uploads"))
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) {
                    cb(new Error(err.message), "");
                }
                const filename = `${hash.toString("hex")}-${file.originalname}`
                cb(null, filename)
            })
        }
    }),
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req: express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png'
        ]

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error("Invalid file type"))
        }
    }
}