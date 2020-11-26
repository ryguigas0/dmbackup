import React, { useState } from "react"

import { FiChevronDown, FiChevronUp, FiTrash } from 'react-icons/fi'

import "../styles/components/item.css"

interface itemProps {
    id: string,
    name: string,
    description?: string,
    deleteCallback: (id: string) => void
}

export default function Item({ id, name, description, deleteCallback }: itemProps) {
    let [expanded, setExpanded] = useState(false)

    function buttonFlip() {
        expanded ? setExpanded(false) : setExpanded(true)
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
            </div>
            <div className="item-description-wrapper">
                <p className="item-description">
                    {expanded ? description : ""}
                </p>
            </div>
        </div>
    )
}