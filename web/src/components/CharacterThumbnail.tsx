import React from "react"
import { FiTrash } from "react-icons/fi"

import "../styles/components/characterThumbnail.css"

interface props {
    id: string
    name: string,
    avatar_url: string,
    onclickCallback: (id: string) => void,
    deleteButtonCallback: (id: string) => void
}

export default function CharacterThumbnail({ id, name, onclickCallback, deleteButtonCallback, avatar_url }: props) {
    return (
        <div className="character-thumb-wrapper">
            <button className="delete-icon-wrapper" onClick={() => deleteButtonCallback(id)}>
                <FiTrash size={50} fill="#000000" color="#ffffff" className="image" />
            </button>
            <div className="character-thumb" onClick={() => {
                onclickCallback(id)
            }}>
                <div className="image-wrapper">
                    <img src={avatar_url} alt={name} className="character-img"/>
                </div>
                <p>{name}</p>
            </div>
        </div>
    )
}