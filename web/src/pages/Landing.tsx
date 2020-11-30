import React from "react"
import { Link } from "react-router-dom"

import "../styles/pages/landing.css"

export default function Landing() {
    return (
        <div className="page-wrapper">
            <div className="about">
                <h1 className="title">DM Backup</h1>
                <h4>A RPG character manager made for helping DMs track their characters atributes, items and info</h4>
            </div>
            <div className="link-wrapper">
                <Link to="/create" className="link">
                    <p className="link-text">Create a new character</p>
                </Link>
            </div>
            <div className="link-wrapper">
                <Link to="/select" className="link">
                    <p className="link-text">Select a character</p>
                </Link>
            </div>
        </div>
    )
}