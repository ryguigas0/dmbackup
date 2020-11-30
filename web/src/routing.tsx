import React from "react"
import { BrowserRouter, Route } from "react-router-dom"

import CharacterDetails from "./pages/CharacterDetails"
import CharacterForm from "./pages/CharacterForm"
import Landing from "./pages/Landing"
import SelectCharacter from "./pages/SelectCharacter"


export default function Router() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Landing} />
            <Route path="/create" exact component={CharacterForm} />
            <Route path="/select" exact component={SelectCharacter} />
            <Route path="/character/:id" exact component={CharacterDetails} />
        </BrowserRouter>
    )
}