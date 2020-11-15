import characterInterface from "../interfaces/character"

export default (id: any, { name, description, inventory, atributes }: characterInterface) => {
    return { id, name, description, inventory, atributes }
}