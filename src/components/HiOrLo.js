import React from 'react'
import { useState, useEffect, useReducer } from 'react'

function reducer(state, action) {
    switch (action.type) {
        case ('deck'):
            // console.log(action.payload)
            return {deck : action.payload}
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
    // const [currCard, setCurrCard] = useState({})
    // const [deckId, setDeckId] = useState()
    // const [score, setScore] = useState(0)
    // const [remaining, setRemaining] = useState(0)
    const [state, dispatch] = useReducer(reducer, initialState)

    async function getDeck() {
        const deckId = "enxk4heverez" //TESTING DECK ID
        // DISABLED FETCHING NEW DECK DURING TESTING, INSTEAD IT SHUFFLES TESTING DECK.
        // const newDeck = await fetch ("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1").then(r => r.json())
        const deck = await fetch (`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`).then(r => r.json());
        // console.log(deck)
        dispatch({type: 'deck', payload: deck})
        // setRemaining(deck.remaining)
        // setCurrCard({})
        // setScore(0)
    }

    // async function drawCard() {
    //     const newCard = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    // }

    useEffect(() => {
        getDeck()
    }, [])
    console.log(state)
    return (
        <div id="play-area">
            <button onClick={getDeck}>Shuffle Deck</button>
            {/* <div id='current-deck'>
                <img src='https://deckofcardsapi.com/static/img/back.png' alt='back of card'/>
                <p>Cards Remaining: {remaining}</p>
            </div>
            <div>
                {remaining > 51 ? <button>Start</button> : null}
            </div> */}
        </div>
    )
}

export default HiOrLo
