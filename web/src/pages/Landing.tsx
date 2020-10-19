import React from "react"
import {Link} from "react-router-dom"

export default function Landing(){
    return(
    <div>
      <h1>LANDING PAGE</h1>
      <div>
        <Link to="/character">Character</Link>
      </div>
      <div>
        <Link to="/create">Create</Link>
      </div>
      <div>
      <Link to="/select">Select</Link>
      </div>
    </div>
    )
}