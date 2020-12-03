import mongoose from "mongoose";

export default interface characterInterface extends mongoose.Document {
    _id: string,
    name: string,
    description: string,
    atributes: Array<{
        _id: string
        name: string,
        value: string | number,
        maxvalue?: number
    }>,
    inventory: Array<{
        _id: string
        name: string,
        description?: string
    }>,
    avatar: string
}