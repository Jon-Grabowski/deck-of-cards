import React from 'react'
import PlayArea from './PlayArea'
import { useState } from 'react'

function Home() {
    const [deck, setDeck] = useState({})
    const [currCard, setCurrCard] = useState({})
    const [score, setScore] = useState(0)
    
    // const currDeckId = 'enxk4heverez' TESTING DECK ID

    // console.log(deck)

    function updateCardsRemaining(remaining) {
        const updatedDeck = deck
        updatedDeck.remaining=remaining
        setDeck(updatedDeck)
    }

    async function getNewDeck() {
        // DISABLED FETCHING NEW DECK DURING TESTING, INSTEAD IT SHUFFLES TESTING DECK.
        // const newDeck = await fetch ("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1").then(r => r.json())
        const newDeck = await fetch ("https://deckofcardsapi.com/api/deck/enxk4heverez/shuffle/").then(r => r.json())
        setDeck(newDeck)
        setCurrCard({})
        setScore(0)
    }

    async function shuffleDeck() {
        // DISABLED FETCHING NEW DECK DURING TESTING, INSTEAD IT SHUFFLES TESTING DECK.
        // const newDeck = await fetch ("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1").then(r => r.json())
        const shuffledDeck = await fetch (`https://deckofcardsapi.com/api/deck/${deck.deck_id}/shuffle/`).then(r => r.json())
        setDeck(shuffledDeck)
        setCurrCard({})
        setScore(0)
    }

    return (
        <div id='home-page'>
            
            <div id='home-header'>
                <h1>This is the Home Header</h1>
                {deck.deck_id ? <p>Deck ID:{deck.deck_id}</p> : <p>No Current Deck</p>}
            </div>

            <div id='card-area'>
                <div>
                    <button onClick={getNewDeck}>New Deck</button>
                    {deck.deck_id ? <button onClick={shuffleDeck}>Shuffle Deck</button> : <button disabled={true}>Shuffle Deck</button>}
                </div>
                <div>
                    {deck.deck_id ? 
                        <PlayArea 
                            deck={deck}
                            currCard={currCard}
                            setCurrCard={setCurrCard}
                            updateCardsRemaining={updateCardsRemaining}
                            score={score}
                            setScore={setScore}
                        /> 
                        : null}
                </div>
            </div>

        </div>
    )
}

export default Home
