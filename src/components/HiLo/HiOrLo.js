import React from 'react'
import './hi-or-lo.css'

import { useEffect, useReducer } from 'react'
import { Link } from 'react-router-dom'
import { assignNumVal, reducer, initialState } from './helperFunctions'
import SelectionArea from './SelectionArea'


function HiOrLo() {
    const [state, dispatch] = useReducer(reducer, initialState)

    async function getDeck() {
        const deckId = "enxk4heverez" //TESTING DECK ID
        // DISABLED FETCHING NEW DECK DURING TESTING, INSTEAD IT SHUFFLES TESTING DECK.
        // const newDeck = await fetch ("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1").then(r => r.json())
        const deck = await fetch (`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`).then(r => r.json());
        dispatch({type: 'shuffle', payload: deck})
    }

    async function handleStart() {
        const deckId = "enxk4heverez" //TESTING DECK ID
        const newCardObject = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`).then(r=>r.json())
        assignNumVal(newCardObject.cards[0])
        assignNumVal(newCardObject.cards[1])
        dispatch({type: 'start', payload: newCardObject})
    }

    useEffect(() => {
        getDeck()
    }, [])

    return (
        <div className='wrapper'>
            <div id='hilo-container'>
            <Link to='/'><button>Home</button></Link>

                <div id='top-container'>
                    <div id='score-area' style={state.deck.remaining > 51 ? {'display':'none'} : {'display': 'flex'}}>
                        <p>Cards Remaining: {state.deck.remaining}</p>
                        <p>Score: {state.score}</p>
                    </div>

                    <div id='logo-container'>
                        <img src='https://ik.imagekit.io/lindar/flicker-test/logo_hi_lo_58ad3093f7.png' alt='game logo'/>
                    </div>

                    <div id='deck-container' className={state.deck.remaining > 51 ? 'hidden' : ''}>
                        <div id='deck-img-container'>
                            <img src='https://deckofcardsapi.com/static/img/back.png' className='card-image' alt='back of card'/>
                        </div>
                        <button onClick={getDeck}>Shuffle Deck</button>
                    </div>
                </div>

                <div>
                    {state.deck.remaining > 51 ? <button onClick={handleStart}>Start</button> : <SelectionArea state={state} dispatch={dispatch}/>}
                </div>
            </div>
        </div>
    )
}

export default HiOrLo
