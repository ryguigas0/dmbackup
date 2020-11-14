import React from "react"

import "../styles/components/atribute.css"

interface AtributeProps {
    name: string,
    value: string,
    maxvalue?: number
}

export default function Atribute({ name, value, maxvalue }: AtributeProps) {
    return (
        <tr className="atribute">
            <td className="name">{name}</td>
            <td className="value">{value}</td>
            <td className="maxvalue">{maxvalue? (maxvalue) : ("-")}</td>
        </tr>
    )
}