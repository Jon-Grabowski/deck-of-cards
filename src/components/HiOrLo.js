import React from 'react'
import { useState, useEffect, useReducer } from 'react'
import SelectionArea from './SelectionArea'
import { assignNumVal, reducer, initialState } from './helperFunctions'

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
        const newCardObject = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`).then(r=>r.json())
        assignNumVal(newCardObject.cards[0])
        dispatch({type: 'start', payload: newCardObject})
    }

    useEffect(() => {
        getDeck()
    }, [])

    return (
        <div id='hilo-container'>
            <button onClick={getDeck}>Shuffle Deck</button>
            <div id='deck-container'>
                <div>
                    <p>Cards Remaining: {state.deck.remaining}</p>
                    <p>Score: {state.score}</p>
                </div>
                <div id='deck-img-container'>
                    <img src='https://deckofcardsapi.com/static/img/back.png' className='card-image' alt='back of card'/>
                </div>
            </div>
            <div>
                {state.deck.remaining > 51 ? <button onClick={handleStart}>Start</button> : <SelectionArea state={state} dispatch={dispatch}/>}
            </div>
        </div>
    )
}

export default HiOrLo
