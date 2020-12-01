import React, { useState } from "react"
import { FiEdit, FiTrash2, FiX } from "react-icons/fi"

import "../styles/components/atribute.css"

interface AtributeProps {
    id: string,
    name: string,
    value: string,
    maxvalue?: number,
    deleteCallback: (id: string) => void,
    editCallback: (id: string, name: string, value: string, maxvalue: number | undefined) => void,
    cancelEditingCallback: () => boolean
}

export default function Atribute({ id, name, value, maxvalue, deleteCallback, editCallback, cancelEditingCallback }: AtributeProps) {
    const [editing, setEditing] = useState(false)

    function editingButtonChange() {
        editing ? setEditing(false) : setEditing(true)
    }

    return (
        <tr className="atribute">
            <td className="name">{name}</td>
            <td className="value">{value} / {maxvalue ? (maxvalue) : ("-")}</td>
            <td className="delete-button-column">
                <button onClick={() => deleteCallback(id)} className="button-wrapper">
                    <FiTrash2 fill="#000000" color="#ffffff" size={40} />
                </button>
                <button onClick={() => {
                    editingButtonChange()
                    if (!editing) {
                        editCallback(id, name, value, maxvalue)
                    } else {
                        setEditing(cancelEditingCallback())
                    }
                }} className="button-wrapper">
                    {editing ? (<FiX />) : (<FiEdit fill="#000000" color="#ffffff" size={40} />)}
                </button>
            </td>
        </tr>
    )
}