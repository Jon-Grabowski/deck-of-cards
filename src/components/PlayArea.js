import React from 'react'
import SelectionArea from './SelectionArea'
import { useState } from 'react'

function PlayArea({deck, currCard, setCurrCard, updateCardsRemaining}) {
    const {deck_id, remaining, shuffled, success} = deck
    const {code, image, suit, value} = currCard
    const [score, setScore] = useState(0)
    const [guess, setGuess] = useState('')

    async function drawCard(selection) {
        const newCard = await fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`).then(r=>r.json())
        if (selection==='high') {
            if (newCard.cards[0].value > value) {
                setGuess('Correct')
                setScore(score+1)
            }else {
                setGuess('Incorrect')
            }
        }else if (selection==='low') {
            if (newCard.cards[0].value < value) {
                setGuess('Correct')
                setScore(score+1)
            }else {
                setGuess('Incorrect')
            }
        }
        setCurrCard(newCard.cards[0])
        updateCardsRemaining(newCard.remaining)
    }

    return (
        <div id="play-area">
            {currCard ? <h4>Score: {score}</h4>: null}
            <div>
                {deck_id ?
                    <div id='current-deck'>
                        <img src='https://deckofcardsapi.com/static/img/back.png' alt='back of card'/>
                        <p>Card Remaining: {remaining}</p>
                    </div>
                    :
                    null
                } 
            </div>
            
            <div>
                {image ? 
                    <div>
                        <img src={image} alt={code}/>
                        <SelectionArea drawCard={drawCard}/>
                        <p>{guess}</p>
                    </div>
                    
                    :
                    <button onClick={drawCard}>Start New Game</button> }
            </div>

        </div>
    )
}

export default PlayArea
