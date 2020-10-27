import React from "react"
import { BrowserRouter, Route } from "react-router-dom"

import CharacterDetails from "./pages/CharacterDetails"
import CreateCharacter from "./pages/CreateCharacter"
import EditCharacter from "./pages/EditCharacter"
import Landing from "./pages/Landing"
import SelectCharacter from "./pages/SelectCharacter"


export default function Router() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Landing} />
            <Route path="/create" exact component={CreateCharacter} />
            <Route path="/select" exact component={SelectCharacter} />
            <Route path="/edit" exact component={EditCharacter} />
            <Route path="/character" exact component={CharacterDetails} />
        </BrowserRouter>
    )
}