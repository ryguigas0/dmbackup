import React, { SyntheticEvent, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { FiArrowLeftCircle } from "react-icons/fi"

import Atribute from "../components/Atribute"
import Item from "../components/Item"

import "../styles/pages/characterDetails.css"

import api from "../api/api"


interface atributeInterface {
    _id: string,
    name: string,
    value: string,
    maxvalue?: number
}

interface itemInterface {
    _id: string,
    name: string,
    description?: string
}

interface characterInterface {
    name: string,
    description: string,
    inventory: itemInterface[],
    atributes: atributeInterface[],
    avatar_url: string
}

export default function CharacterDetails() {
    const history = useHistory()
    const { id: characterId } = useParams<{ id: string }>()

    let [character, setCharacter] = useState<characterInterface>()
    let [newAtrName, setNewAtrName] = useState("")
    let [newAtrValue, setNewAtrValue] = useState("")
    let [newAtrMaxValue, setNewAtrMaxValue] = useState("")
    let [editAtrId, setEditAtrId] = useState<string | undefined>(undefined)
    let [editItemId, setEditItemId] = useState<string | undefined>(undefined)
    let [newItemName, setNewItemName] = useState("")
    let [newItemDescription, setNewItemDescription] = useState("")

    if (!character) {
        api.get(`character/${characterId}`)
            .then(result => setCharacter(result.data as characterInterface))
            .catch(err => console.error(err))
    }

    function handleNewAtribute(e: SyntheticEvent) {
        e.preventDefault()

        let data = {
            name: newAtrName,
            value: newAtrValue,
            maxvalue: Number(newAtrMaxValue),
        }

        if (editAtrId) {
            api.patch(`/character/${characterId}/atributes/${editAtrId}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "*/*"
                }
            }).then(response => response.data?.result === 1 ?
                setCharacter(response.data?.character) : alert("Não foi possível editar o atributo"))
                .catch(err => {
                    console.error(err)
                    alert("Não foi possível editar o atributo")
                })
            setEditAtrId(undefined)
        } else {
            api.post(`/character/${characterId}/atributes`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "*/*"
                }
            }).then(response => response.data?.result === 1 ?
                setCharacter(response.data?.character) : alert("Não foi possível adicionar o novo atributo"))
                .catch(err => {
                    console.error(err)
                    alert("Não foi possível adicionar o novo atributo")
                })
        }
        setNewAtrName("")
        setNewAtrValue("")
        setNewAtrMaxValue("")
    }

    function handleDeleteAtribute(atrId: string) {
        api.delete(`character/${characterId}/atributes/${atrId}`)
            .then(result => {
                if (result.data?.result === 1) {
                    setCharacter(result.data?.character as characterInterface)
                    alert("Atributo deletado")
                } else {
                    alert("Não foi possível deletar atributo")
                }
            })
    }

    function handleEditAtribute(id: string, name: string, value: string, maxvalue: number | undefined) {
        setNewAtrName(name)
        setNewAtrValue(value)
        setNewAtrMaxValue(maxvalue ? maxvalue.toString() : "")
        setEditAtrId(id)
    }

    function handleCancelEditingAtribute() {
        setNewAtrName("")
        setNewAtrValue("")
        setNewAtrMaxValue("")
        setEditAtrId(undefined)
    }

    function handleNewItem(e: SyntheticEvent) {
        e.preventDefault()

        const data = {
            name: newItemName,
            description: newItemDescription,
        }

        if (editItemId) {
            api.patch(`/character/${characterId}/inventory/${editItemId}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "*/*"
                }
            }).then(response => response.data?.result === 1 ?
                setCharacter(response.data?.character) : alert("Não foi possível editar o item"))
                .catch(err => {
                    console.error(err)
                    alert("Não foi possível editar o item")
                })
            setEditItemId(undefined)
        } else {
            api.post(`/character/${characterId}/inventory`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "*/*"
                }
            }).then(response => response.data?.result === 1 ?
                setCharacter(response.data?.character) : alert("Não foi possível adicionar o novo item"))
                .catch(err => {
                    console.error(err)
                    alert("Não foi possível adicionar o novo item")
                })
        }

        setNewItemName("")
        setNewItemDescription("")
    }

    function handleDeleteItem(itemId: string) {
        api.delete(`character/${characterId}/inventory/${itemId}`)
            .then(result => {
                if (result.data?.result === 1) {
                    setCharacter(result.data?.character as characterInterface)
                    alert("Item deletado")
                } else {
                    alert("Não foi possível deleter item")
                }
            })
    }

    function handleEditItem(id: string, name: string, description: string | undefined) {
        setNewItemName(name)
        setNewItemDescription(description ? description.toString() : "")
        setEditItemId(id)
    }

    function handleCancelEditingItem() {
        setNewItemName("")
        setNewItemDescription("")
        setEditItemId(undefined)
    }

    function handleBackSelection() {
        history.push("/select")
    }

    return (
        < div className="page-wrapper">
            <button className="back-button-wrapper" onClick={handleBackSelection}>
                <FiArrowLeftCircle size={40} /> Selecionar outro personagem
            </button>
            <div className="character-info">
                <div className="character-image">
                    <img src={`${api.defaults.baseURL}/images/${character?.avatar_url}`} alt="character-img" className="character-img" />
                </div>
                <div className="name-wrapper">
                    Nome:<p className="name">{character?.name}</p>
                </div>
                <div className="description-wrapper">
                    Descrição: <p className="description">
                        {character?.description}
                    </p>
                </div>
            </div>
            <div className="character-atributes">
                <h1>Atributos</h1>
                <div className="atributes-table-wrapper">
                    <table className="atributes-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Valor</th>
                                <th>Valor máximo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {character?.atributes.map(
                                (atr, index) => <Atribute
                                    key={index} id={atr._id}
                                    name={atr.name} value={atr.value}
                                    maxvalue={atr.maxvalue}
                                    deleteCallback={handleDeleteAtribute}
                                    editCallback={handleEditAtribute}
                                    cancelEditingCallback={handleCancelEditingAtribute}
                                />
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="add-atribute">
                    <form action="">
                        <input type="text" placeholder="nome" id="input-atribute-name"
                            onChange={e => setNewAtrName(e.target.value)} value={newAtrName} />
                        <input type="text" placeholder="valor" id="input-atribute-value"
                            onChange={e => setNewAtrValue(e.target.value)} value={newAtrValue} />
                        <input type="number" placeholder="valor max" id="input-atribute-maxvalue"
                            onChange={e => setNewAtrMaxValue(e.target.value)} value={newAtrMaxValue} />
                        <button type="submit" onClick={e => handleNewAtribute(e)}>Adicionar</button>
                    </form>
                </div>
            </div>
            <div className="character-inventory">
                <h1>Inventário</h1>
                <div className="item-list">
                    {character?.inventory.map(
                        (item, index) => <Item
                            key={index}
                            id={item._id}
                            name={item.name}
                            description={item.description}
                            deleteCallback={handleDeleteItem}
                            editCallback={handleEditItem}
                            cancelEditingCallback={handleCancelEditingItem}
                        />
                    )}
                </div>
                <div className="add-item-wrapper">
                    <form className="add-item-form" action="">
                        <input type="text" id="input-item-name" placeholder="nome"
                            onChange={e => setNewItemName(e.target.value)} value={newItemName} />

                        <textarea name="description" id="input-item-description" cols={30} rows={10}
                            onChange={e => setNewItemDescription(e.target.value)} value={newItemDescription}>
                        </textarea>

                        <button type="submit" onClick={e => handleNewItem(e)}>Adicionar</button>
                    </form>
                </div>
            </div>
        </div >
    )
}