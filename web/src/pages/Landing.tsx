import React from "react"
import { Link } from "react-router-dom"

import "../styles/pages/landing.css"

export default function Landing() {
    return (
        <div>
            <h1 className="title">RPG CHARACTER MANAGER</h1>
            <div className="link-wrapper">
                <Link to="/create" className="link">Create a new character </Link>
            </div>
            <div className="link-wrapper">
                <Link to="/select" className="link">Select a created character </Link>
            </div>
        </div>
    )
}