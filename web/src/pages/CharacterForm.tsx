import React, { ChangeEvent, FormEvent, useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { FiFilePlus } from "react-icons/fi"

import "../styles/pages/characterForm.css"
import default_usr from "../images/test_usr_img.jpg"
import api from "../api/api"

export default function CharacterForm() {

    const search = useLocation().search
    let id = new URLSearchParams(search).get('id')
    let name = new URLSearchParams(search).get('name') as string
    let description = new URLSearchParams(search).get('description') as string
    let avatar = new URLSearchParams(search).get('avatar') as string
    let avatar_url = `${api.defaults.baseURL}/images/${avatar}`

    const history = useHistory()

    const editing = id ? true : false
    const [newCharacterName, setNewCharacterName] = useState<string>(editing ? name : "")
    const [newCharacterDescription, setNewCharacterDescription] = useState<string>(editing ? description : "")
    const [newCharacterAvatar, setNewCharacterAvatar] = useState<File>()

    function handleCharacterSubmit(e: FormEvent) {
        e.preventDefault()
        if (!newCharacterAvatar || !newCharacterDescription || !newCharacterAvatar) {
            alert("Por favor coloque no mínimo um nome e uma descrição!")
            return
        }
        let data = new FormData()
        data.append("name", newCharacterName)
        data.append("description", newCharacterDescription)
        data.append("avatar", newCharacterAvatar || "none")

        if (!editing) {
            api.post("/character", data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    let { result, id } = response.data
                    if (result === 1) {
                        history.push(`/character/${id}`)
                    } else {
                        alert("Não foi possível criar um novo personagem")
                    }
                })
        } else {
            api.patch(`character/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    let { result, id } = response.data
                    if (result === 1) {
                        history.push(`/character/${id}`)
                    } else {
                        alert("Não foi editar o personagem")
                    }
                })
        }
    }

    function handleNewCharacterAvatar(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return

        let selectedImage = Array.from(e.target.files)[0]
        setNewCharacterAvatar(selectedImage)
    }

    return (
        <div className="create-character">
            <form className="create-character-form" action="">
                <fieldset className="character-image">
                    <div className="character-image-preview">
                        <img src={
                            newCharacterAvatar ? URL.createObjectURL(newCharacterAvatar) : (avatar ? avatar_url : default_usr)
                        } alt="character" className="character-img" />
                        <label htmlFor="avatar" className="edit-icon">
                            <FiFilePlus fill="#000000" size={40} />
                        </label>
                    </div>
                    <input type="file" className="character-img-input"
                        id="avatar" onChange={e => handleNewCharacterAvatar(e)} />
                </fieldset>
                <fieldset className="character-info">
                    <div className="character-name">
                        <label htmlFor="character-name-input">Nome</label>
                        <input type="text" value={newCharacterName}
                            onChange={e => setNewCharacterName(e.target.value)} id="character-name-input" />
                    </div>
                    <div className="character-description">
                        <label htmlFor="character-description">Descrição</label>
                        <textarea name="description" id="character-description-input"
                            value={newCharacterDescription} onChange={e => setNewCharacterDescription(e.target.value)}
                            cols={30} rows={10}></textarea>
                    </div>
                </fieldset>
                <button className="character-submit-button" onClick={handleCharacterSubmit}>
                    {editing ? "Editar peronsagem" : "Criar personagem"}
                </button>
            </form>
        </div>
    )
}