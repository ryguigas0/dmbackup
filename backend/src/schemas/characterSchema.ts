import mongoose, { SchemaDefinition } from "mongoose"
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
    } as SchemaDefinition,
    {
        collection: "info"
    }
)
let CharacterDao = mongoose.model<characterInterface>("Character", characterSchema)
export default CharacterDao