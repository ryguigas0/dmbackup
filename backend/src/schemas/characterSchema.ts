import mongoose from "mongoose"
import characterInterface from "../interfaces/characterInterface"

let characterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        atributes: [{
            name: {
                type: String,
                required: true
            },
            value: {
                type: String,
                required: true
            },
            maxvalue: Number
        }],
        inventory: [{
            name: {
                type: String,
                required: true
            },
            description: String
        }],
        avatar: {
            type: String,
        }
    }
)
let CharacterDao = mongoose.model<characterInterface>("Character", characterSchema, "info")
export default CharacterDao