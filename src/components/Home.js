import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'

function Home() {

    return (
        <div id='home-page'>
            <div id='home-header'>
                <h1>This is the Home Header</h1>
            </div>
            <div id='home-body-container'>
                <div id='card-games-container'>
                    <Link to='/hilo'><button>Hi/Lo Game</button></Link>
                </div>
                <div id='other-games-container'>

                </div>
            </div>
        </div>
    )
}

export default Home
