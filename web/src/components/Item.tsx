import React, { useState } from "react"

import { FiChevronDown, FiChevronUp, FiEdit, FiTrash2, FiX } from 'react-icons/fi'

import "../styles/components/item.css"

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
                        expanded ? <FiChevronDown size={40} fill="#0077B6" color="#ffffff" className="expand-button" /> :
                            <FiChevronUp size={40} fill="#0077B6" color="#ffffff" className="expand-button" />
                    }
                </button>
                <button onClick={() => deleteCallback(id)} className="button-wrapper">
                    <FiTrash2 fill="#000000" color="#ffffff" size={40} />
                </button>
                <button onClick={() => {
                    editingButtonChange()
                    if (!editing) {
                        editCallback(id, name, description)
                    } else {
                        cancelEditingCallback()
                    }
                }} className="button-wrapper">
                    {editing ? <FiX /> : (<FiEdit fill="#000000" color="#ffffff" size={40} />)}
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