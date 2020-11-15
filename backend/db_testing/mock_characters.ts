import character from "../interfaces/character"
let character1: character = {
    name: "Testerson",
    description: "Testerson é um personagem teste",
    atributes: [
        {
            name: "Força",
            value: 10
        },
        {
            name: "Estresse",
            value: 20,
            maxvalue: 200
        }
    ],
    inventory: [
        {
            name: "Espadona maneirassa",
            description: "Mega espadona maneirassa mesmo, cara ela é bem top"
        },
        {
            name: "Topimpasso",
        },
    ]
}

let character2: character = {
    name: "Testerson2",
    description: "Testerson2 é um personagem teste",
    atributes: [
        {
            name: "Força",
            value: 40
        },
        {
            name: "Estresse",
            value: 190,
            maxvalue: 200
        }
    ],
    inventory: [
        {
            name: "Espadona supimpassa",
            description: "Mega espadona supimpassa mesmo, cara ela é bem top"
        },
        {
            name: "Toperson",
        },
    ]
}

export default [character1, character2]