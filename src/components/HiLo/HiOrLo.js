import React from 'react'
import './hi-or-lo.css'

import { useEffect, useReducer, useState } from 'react'
import { Link } from 'react-router-dom'
import { assignNumVal, reducer, initialState } from './helperFunctions'
import SelectionArea from './SelectionArea'


function HiOrLo() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [startTrigger, setStartTrigger] = useState(false)

    async function getDeck() {
        const deckId = "enxk4heverez" //TESTING DECK ID
        // DISABLED FETCHING NEW DECK DURING TESTING, INSTEAD IT SHUFFLES TESTING DECK.
        // const newDeck = await fetch ("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1").then(r => r.json())
        const deck = await fetch (`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`).then(r => r.json());
        dispatch({type: 'shuffle', payload: deck})
        setStartTrigger(false)
    }

    async function handleStart() {
        const deckId = "enxk4heverez" //TESTING DECK ID
        const newCardObject = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`).then(r=>r.json())
        assignNumVal(newCardObject.cards[0])
        assignNumVal(newCardObject.cards[1])
        dispatch({type: 'start', payload: newCardObject})
        setStartTrigger(true)
    }

    useEffect(() => {
        getDeck()
    }, [])

    return (
        <div className='wrapper'>
            <div id="back-button-wrapper">
                <Link to='/' id='back-button'><strong>↩</strong></Link>
            </div>
            <div id='hilo-container'>
            

                <div id='top-container'>
                    <div id='score-area' style={!startTrigger ? {'display':'none'} : {'display': 'flex'}}>
                        <h1>SCORE</h1>
                        <p>{state.score}</p>
                    </div>

                    <div id='logo-container'>
                        <img src='https://ik.imagekit.io/lindar/flicker-test/logo_hi_lo_58ad3093f7.png' alt='game logo'/>
                        <a onClick={getDeck} className={!startTrigger ? 'hidden' : ''}>Reset Game</a>
                    </div>

                    <div id='deck-container' className={!startTrigger ? 'hidden' : ''}>
                        <p><em><strong>Cards Remaining: {state.deck.remaining}</strong></em></p>
                        <div id='deck-img-container'>
                            <img src='https://deckofcardsapi.com/static/img/back.png' className='card-image' alt='back of card'/>
                        </div>
                    </div>
                </div>

                <div>
                    {startTrigger ? <SelectionArea state={state} dispatch={dispatch}/> : <button onClick={handleStart}>Start</button>}
                </div>
            </div>
        </div>
    )
}

export default HiOrLo
