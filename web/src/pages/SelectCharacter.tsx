import React from "react"
import { useHistory } from "react-router-dom"
import { FiUser, FiUserPlus } from "react-icons/fi"

import "../styles/pages/selectCharacter.css"
import test_usr_img from "../images/test_usr_img.jpg"

export default function SelectCharacter() {

    const history = useHistory()

    function handleCreateCharacterRedirect() {
        history.push("/create")
    }

    function handleCharacterDetailsRedirect(){
        history.push("/character")
    }

    return (
        <div className="character-selection">
            <button className="character-thumb" onClick={handleCharacterDetailsRedirect}>
                <div className="add-icon-wrapper">
                    <FiUser size={100} className="add-icon" />
                </div>
                <p>Jubileu</p>
            </button>
            <button className="character-thumb" onClick={handleCharacterDetailsRedirect}>
                <img src={test_usr_img} alt="Jubileu" />
                <p>Jubileu</p>
            </button>
            <button className="character-thumb" onClick={handleCharacterDetailsRedirect}>
                <img src={test_usr_img} alt="Jubileu" />
                <p>Jubileu</p>
            </button>
            <button className="character-thumb" onClick={handleCreateCharacterRedirect}>
                <div className="add-icon-wrapper">
                    <FiUserPlus size={100} className="add-icon" />
                </div>
                <p>Criar um novo personagem</p>
            </button>
        </div>

    )
}