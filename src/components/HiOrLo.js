import React from 'react'
import { useState, useEffect, useReducer } from 'react'
import SelectionArea from './SelectionArea'
import { assignNumVal } from './helperFunctions'


// import { reducer } from './helperFunctions'

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
        case ('guess'):
            const {newCardObj, guess} = action.payload
            const newCard = newCardObj.cards[0]
            if ((guess === "high" && newCard.numValue > state.currCard.numValue)
                || (guess === "low" && newCard.numValue < state.currCard.numValue)){
                console.log('correct!')
                return {
                    ...state,
                    deck: {
                        remaining: newCardObj.remaining, 
                        deck_id: newCardObj.deck_id
                    },
                    currCard: newCard,
                    score: state.score + 1
                }
            } else {
                console.log('incorrect!')
                return {
                        ...state,
                        deck: {
                            remaining: newCardObj.remaining, 
                            deck_id: newCardObj.deck_id
                        },
                        currCard: newCard
                }
            }
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

    useEffect(() => {
        getDeck()
    }, [])

    return (
        <div id="play-area">
            <button onClick={getDeck}>Shuffle Deck</button>
            <div>
                <img src='https://deckofcardsapi.com/static/img/back.png' alt='back of card'/>
                <p>Cards Remaining: {state.deck.remaining}</p>
            </div>
            <div>
                {state.deck.remaining > 51 ? <button onClick={handleStart}>Start</button> : <SelectionArea state={state} dispatch={dispatch}/>}
            </div>
        </div>
    )
}

export default HiOrLo
