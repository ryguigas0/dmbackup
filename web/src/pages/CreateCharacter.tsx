import React, { FormEvent } from "react"

import "../styles/pages/createCharacter.css"

import default_usr from "../images/test_usr_img.jpg"
import edit_icon from "../images/edit_icon.jpg"
import { useHistory } from "react-router-dom"

export default function CreateCharacter() {

    const history = useHistory()

    function handleCharacterSubmit(e: FormEvent) {
        e.preventDefault()
        history.push("/character")
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
                        <input type="text" id="character-name-input" />
                    </div>
                    <div className="character-description">
                        <label htmlFor="character-description   ">Descrição</label>
                        <textarea name="description" id="character-description-input" cols={30} rows={10}></textarea>
                    </div>
                </fieldset>
                <button className="character-submit-button" onClick={handleCharacterSubmit}>
                    Criar personagem
                </button>
            </form>
        </div>
    )
}