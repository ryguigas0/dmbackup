import React from "react"
import { FiTrash } from "react-icons/fi"

import "../styles/components/atribute.css"

interface AtributeProps {
    id: string,
    name: string,
    value: string,
    maxvalue?: number,
    deleteCallback: (id: string) => void
}

export default function Atribute({ id, name, value, maxvalue, deleteCallback }: AtributeProps) {
    return (
        <tr className="atribute">
            <td className="name">{name}</td>
            <td className="value">{value}</td>
            <td className="maxvalue">{maxvalue ? (maxvalue) : ("-")}</td>
            <td className="delete-button-column">
                <button onClick={() => deleteCallback(id)} className="button-wrapper">
                    <FiTrash size={22} className="delete-button" />
                </button>
            </td>
        </tr>
    )
}