import React from "react"
import { FiTrash } from "react-icons/fi"

import "../styles/components/characterThumbnail.css"
import default_usr from "../images/default_usr_img.jpg"
import api from "../api/api"

interface props {
    id: string
    name: string,
    avatar: string,
    onclickCallback: (id: string) => void,
    deleteButtonCallback: (id: string) => void
}

export default function CharacterThumbnail({ id, name, onclickCallback, deleteButtonCallback, avatar }: props) {
    return (
        <div className="character-thumb-wrapper">
            <button className="delete-icon-wrapper" onClick={() => deleteButtonCallback(id)}>
                <FiTrash size={50} fill="#000000" color="#ffffff" className="image" />
            </button>
            <div className="character-thumb" onClick={() => {
                onclickCallback(id)
            }}>
                <div className="image-wrapper">
                    <img src={avatar === "none" ? default_usr : `${api.defaults.baseURL}/images/${avatar}`} alt={name} className="character-img" />
                </div>
                <p>{name}</p>
            </div>
        </div>
    )
}