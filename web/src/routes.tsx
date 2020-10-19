import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom"

import CharacterDetails from "./pages/CharacterDetails";
import CreateCharacter from "./pages/CreateCharacter"
import CharacterSelection from "./pages/CharacterSelection"
import Landing from "./pages/Landing";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/character" component={CharacterDetails} />
                <Route path="/create" component={CreateCharacter} />
                <Route path="/select" component={CharacterSelection} />
            </Switch>
        </BrowserRouter>
    );
}