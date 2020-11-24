import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { FiUserPlus } from "react-icons/fi"

import "../styles/pages/selectCharacter.css"
/* import test_usr_img from "../images/test_usr_img.jpg" */
import api from "../api/api"
import CharacterThumbnail from "../components/CharacterThumbnail"

interface characterInterface {
    _id: string,
    name: string
}

export default function SelectCharacter() {
    const history = useHistory()

    const [characterList, setCharacterList] = useState<characterInterface[]>([])

    if (characterList === undefined || characterList.length === 0) {
        api.get("/characters")
            .then(result => setCharacterList((result.data as characterInterface[])))
            .catch(err => console.error(err))
    }

    function handleCreateCharacterRedirect() {
        history.push("/create")
    }

    function handleCharacterDetailsRedirect(id: string) {
        history.push(`/character/${id}`)
    }

    function handleCharacterDelete(id: string) {
        api.delete(`character/${id}`)
            .then(result => {
                if (result.data?.result === 1) {
                    setCharacterList(characterList?.filter(char => char._id !== id))
                    alert("Personagem deletado")
                } else {
                    alert("Não foi possível deletar o personagem")
                }
            })
    }

    return (
        <div className="character-selection">
            {
                characterList.map(character =>
                    <CharacterThumbnail
                        key={character._id} name={character.name}
                        id={character._id} onclickCallback={handleCharacterDetailsRedirect}
                        deleteButtonCallback={handleCharacterDelete}
                    />
                )
            }
            <button className="character-thumb" onClick={handleCreateCharacterRedirect}>
                <div className="add-icon-wrapper">
                    <FiUserPlus size={100} className="add-icon" />
                </div>
                <p>Criar um novo personagem</p>
            </button>
        </div>

    )
}