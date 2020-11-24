import React from "react"
import { FiTrash, FiUser } from "react-icons/fi"

import "../styles/components/characterThumbnail.css"

interface props {
    id: string
    name: string,
    onclickCallback: (id: string) => void,
    deleteButtonCallback: (id: string) => void
}

export default function CharacterThumbnail({ id, name, onclickCallback, deleteButtonCallback }: props) {
    return (
        <div className="character-thumb-wrapper">
            <button className="delete-icon-wrapper" onClick={() => deleteButtonCallback(id)}>
                <FiTrash size={22} className="image" />
            </button>
            <div className="character-thumb" onClick={() => {
                onclickCallback(id)
            }}>
                <div className="image-wrapper">
                    <FiUser size={100} className="image" />
                </div>
                <p>{name}</p>
            </div>
        </div>
    )
}