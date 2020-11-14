import React, { useState } from "react"

import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

import "../styles/components/item.css"

interface itemProps {
    name: string,
    description?: string
}

export default function Item({ name, description }: itemProps) {
    let [expanded, setExpanded] = useState(false)

    function buttonFlip() {
        expanded ? setExpanded(false) : setExpanded(true)
    }

    return (
        <div className="item">
            <div className="item-name">
                {name}
                <button onClick={buttonFlip} className="expand-button-wrapper">
                    {
                        expanded ? <FiChevronDown size={22} className="expand-button" /> :
                            <FiChevronUp size={22} className="expand-button" />
                    }
                </button>
            </div>
            <div className="item-description-wrapper">
                <p className="item-description">
                    {expanded ? description : ""}
                </p>
            </div>
        </div>
    )
}