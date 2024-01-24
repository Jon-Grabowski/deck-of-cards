import React from 'react'
import { Link } from 'react-router-dom'

function Home() {

    return (
        <div id='home-page'>
            <div id='home-header'>
                <h1>This is the Home Header</h1>
            </div>
            <div>
                <Link to='/hilo'><button>Hi/Lo Game</button></Link>
                
            </div>
        </div>
    )
}

export default Home
