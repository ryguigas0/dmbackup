import React, { useState } from "react"

import { FiChevronDown, FiChevronUp, FiTrash, FiX } from 'react-icons/fi'

import "../styles/components/item.css"
import edit_icon from "../images/edit_icon.jpg"

interface itemProps {
    id: string,
    name: string,
    description?: string,
    deleteCallback: (id: string) => void,
    editCallback: (id: string, name: string, description: string | undefined) => void,
    cancelEditingCallback: () => void
}

export default function Item({ id, name, description, deleteCallback, editCallback, cancelEditingCallback }: itemProps) {
    let [expanded, setExpanded] = useState(false)
    const [editing, setEditing] = useState(false)

    function buttonFlip() {
        expanded ? setExpanded(false) : setExpanded(true)
    }

    function editingButtonChange() {
        editing ? setEditing(false) : setEditing(true)
    }

    return (
        <div className="item">
            <div className="item-name">
                {name}
                <button onClick={buttonFlip} className="button-wrapper">
                    {
                        expanded ? <FiChevronDown size={22} className="expand-button" /> :
                            <FiChevronUp size={22} className="expand-button" />
                    }
                </button>
                <button onClick={() => deleteCallback(id)} className="button-wrapper">
                    <FiTrash size={22} className="delete-button" />
                </button>
                <button onClick={() => {
                    editingButtonChange()
                    if (!editing) {
                        editCallback(id, name, description)
                    } else {
                        cancelEditingCallback()
                    }
                }} className="button-wrapper">
                    {editing ? <FiX /> : <img src={edit_icon} alt="edit" />}
                </button>
            </div>
            <div className="item-description-wrapper">
                <p className="item-description">
                    {expanded ? description : ""}
                </p>
            </div>
        </div>
    )
}