import React from "react"
import { Link } from "react-router-dom"

export default function Landing() {
    return (
        <div>
            <h1>Landing</h1>
            <Link to="/character">CharacterDetails </Link>
            <Link to="/create">CreateCharacter </Link>
            <Link to="/edit">EditCharacter </Link>
            <Link to="/select">SelectCharacter </Link>
        </div>
    )
}