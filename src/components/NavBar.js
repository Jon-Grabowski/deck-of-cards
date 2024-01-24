import React from 'react'
import { Link } from 'react-router-dom'

function NavBar({getDeck}) {
    return (
        <div id='nav-bar'>
            <Link to='/'><button>Home</button></Link>
            <h5>Hi or Low</h5>
            <button onClick={getDeck}>Shuffle Deck</button>
        </div>
    )
}

export default NavBar
