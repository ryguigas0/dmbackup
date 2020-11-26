import React, { FormEvent, useState } from "react"
import { useHistory } from "react-router-dom"

import "../styles/pages/createCharacter.css"
import default_usr from "../images/test_usr_img.jpg"
import edit_icon from "../images/edit_icon.jpg"
import api from "../api/api"

export default function CreateCharacter() {

    const history = useHistory()

    const [newCharacterName, setNewCharacterName] = useState<string>("")
    const [newCharacterDescription, setNewCharacterDescription] = useState<string>("")

    function handleCharacterSubmit(e: FormEvent) {
        e.preventDefault()
        let data = {
            name: newCharacterName,
            description: newCharacterDescription
        }
        api.post("/character", data)
            .then(response => {
                let { result, id } = response.data
                if (result === 1) {
                    history.push(`/character/${id}`)
                } else {
                    alert("Não foi possível criar um novo personagem")
                }
            })
    }


    return (
        <div className="createCharacter">
            <form className="create-character-form" action="">
                <fieldset className="character-image">
                    <div className="character-image-preview">
                        <img src={default_usr} alt="usr_default" className="character-img" />
                        <label htmlFor="character-img-input" className="edit-icon">
                            <img src={edit_icon} alt="" />
                        </label>
                    </div>
                    <input type="file" className="character-img-input" id="character-img-input" />
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
                    Criar personagem
                </button>
            </form>
        </div>
    )
}