export default interface characterInterface {
    name: string,
    description: string,
    atributes: Array<{
        name: string,
        value: string | number,
        maxvalue?: number
    }>,
    inventory: Array<{
        name: string,
        description?: string
    }>
}