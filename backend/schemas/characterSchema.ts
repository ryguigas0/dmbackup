import mongoose from "mongoose"

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
        }]
    }
)
let CharacterDao = mongoose.model("Character", characterSchema, "info")
export default CharacterDao