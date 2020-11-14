import React, { SyntheticEvent, useState } from "react"

import Atribute from "../components/Atribute"
import Item from "../components/Item"

import "../styles/pages/characterDetails.css"

import default_usr from "../images/test_usr_img.jpg"

export default function CharacterDetails() {

    let [atrList, setAtrList] = useState([
        <Atribute name="Estresse" value="10" maxvalue={200} />,
        <Atribute name="Força" value="20" />,
        <Atribute name="Destreza" value="40" />
    ])

    let [newAtrName, setNewAtrName] = useState("")
    let [newAtrValue, setNewAtrValue] = useState("")
    let [newAtrMaxValue, setNewAtrMaxValue] = useState("")

    function handleNewAtribute(e: SyntheticEvent) {
        e.preventDefault()

        const data = {
            newAtrName,
            newAtrValue,
            newAtrMaxValue
        }

        console.log(data)

        /* Post na api com os dados do atributo */

        setAtrList(atrList.concat([<Atribute name={newAtrName} value={newAtrValue} maxvalue={Number(newAtrMaxValue)} />]))
        setNewAtrName("")
        setNewAtrValue("")
        setNewAtrMaxValue("")
    }

    let [itemList, setItemList] = useState([
        <Item name="Espadona" description="Super espadona mesmo, de verdade, não tô zuando" />,
        <Item name="Mega poção" description="Super opção verdadeira, mesmo, sem zueira" />,
        <Item name="papel" />
    ])

    let [newItemName, setNewItemName] = useState("")
    let [newItemDescription, setNewItemDescription] = useState("")

    function handleNewItem(e: SyntheticEvent) {
        e.preventDefault()

        const data = {
            newItemName,
            newItemDescription,
        }

        console.log(data)

        /* Post na api com os dados do atributo */

        setItemList(itemList.concat([
            <Item name={newItemName} description={newItemDescription !== "" ? newItemDescription : undefined} />
        ]))

        setNewItemName("")
        setNewItemDescription("")
    }

    return (
        < div className="page-wrapper" >
            <div className="character-info">
                <div className="character-image">
                    <img src={default_usr} alt="usr_default" className="character-img" />
                </div>
                <div className="name-wrapper">
                    Nome:<p className="name">Jubileu</p>
                </div>
                <div className="description-wrapper">
                    Descrição: <p className="description">
                        BLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa
                    </p>
                </div>
            </div>
            <div className="character-atributes">
                <h1>Atributos</h1>
                <div className="atributes-table-wrapper">
                    <table className="atributes-table">
                        <tr>
                            <th>Nome</th>
                            <th>Valor</th>
                            <th>Valor máximo</th>
                        </tr>
                        {atrList}
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

                        <button type="submit" onClick={e => { handleNewAtribute(e) }}>Adicionar</button>
                    </form>
                </div>
            </div>
            <div className="character-inventory">
                <h1>Inventário</h1>
                <div className="item-list">
                    {itemList}
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