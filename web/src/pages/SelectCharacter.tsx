import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { FiUserPlus } from "react-icons/fi"

import "../styles/pages/selectCharacter.css"
import api from "../api/api"
import CharacterThumbnail from "../components/CharacterThumbnail"

interface characterInterface {
    _id: string,
    name: string,
    avatar: string
}

export default function SelectCharacter() {
    const history = useHistory()

    const [characterList, setCharacterList] = useState<characterInterface[]>([])
    const [requestedCharacters, setRequestedCharacters] = useState<Boolean>(false)

    if (!requestedCharacters) {
        setRequestedCharacters(true)
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
                characterList.map((character, index) =>
                    <CharacterThumbnail
                        key={index} name={character.name}
                        avatar={character.avatar}
                        id={character._id} onclickCallback={handleCharacterDetailsRedirect}
                        deleteButtonCallback={handleCharacterDelete}
                    />
                )
            }
            <button className="add-character-thumb" onClick={handleCreateCharacterRedirect}>
                <div className="add-icon-wrapper">
                    <FiUserPlus size={100} fill="#000000" color="#ffffff" className="add-icon" />
                </div>
                <p>Criar um novo personagem</p>
            </button>
        </div>

    )
}