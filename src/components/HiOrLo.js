import React from 'react'
import { useState, useEffect, useReducer } from 'react'
import { act } from 'react-dom/test-utils'

function reducer(state, action) {
    switch (action.type) {
        case ('shuffle'):
            return {deck : action.payload, currCard: {}, score: 0}
        case ('start'):
            return {
                ...state, 
                deck: {
                    remaining: action.payload.remaining, 
                    deck_id: action.payload.deck_id
                },
                currCard: action.payload.cards[0]
            }
            // newState.deck.remaining = action.payload.remaining
            
        default:
            return state
    }
}

const initialState = {
    deck: {},
    currCard: {},
    score: 0
}

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

    function assignNumVal(newCard) {
        switch (newCard.value) {
            case 'JACK':
                return newCard['numValue'] = 11
            case 'QUEEN':
                return newCard['numValue'] = 12
            case 'KING':
                return newCard['numValue'] = 13
            case 'ACE':
                return newCard['numValue'] = 14
            default:
                return newCard['numValue'] = parseInt(newCard.value)
        };
    }

    useEffect(() => {
        getDeck()
    }, [])
    console.log(state)


    return (
        <div id="play-area">
            <button onClick={getDeck}>Shuffle Deck</button>
            <div>
                <img src='https://deckofcardsapi.com/static/img/back.png' alt='back of card'/>
                <p>Cards Remaining: {state.deck.remaining}</p>
            </div>
            <div>
                {state.deck.remaining > 51 ? <button onClick={handleStart}>Start</button> : null}
            </div>
        </div>
    )
}

export default HiOrLo
