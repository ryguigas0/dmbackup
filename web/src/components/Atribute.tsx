import React, { useState } from "react"
import { FiTrash, FiX } from "react-icons/fi"

import "../styles/components/atribute.css"
import edit_icon from "../images/edit_icon.jpg"

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
            <td className="value">{value}</td>
            <td className="maxvalue">{maxvalue ? (maxvalue) : ("-")}</td>
            <td className="delete-button-column">
                <button onClick={() => deleteCallback(id)} className="button-wrapper">
                    <FiTrash size={22} className="delete-button" />
                </button>
                <button onClick={() => {
                    editingButtonChange()
                    if (!editing) {
                        editCallback(id, name, value, maxvalue)
                    } else {
                        setEditing(cancelEditingCallback())
                    }
                }} className="button-wrapper">
                    {editing ? (<FiX />) : (<img src={edit_icon} alt="edit" />)}
                </button>
            </td>
        </tr>
    )
}