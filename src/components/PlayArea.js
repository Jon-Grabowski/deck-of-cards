import React from 'react'
import SelectionArea from './SelectionArea'
import { useState } from 'react'

function PlayArea({deck, currCard, setCurrCard, updateCardsRemaining, score, setScore}) {
    const {deck_id, remaining} = deck
    const {code, image, suit, value, numValue} = currCard
    
    const [guess, setGuess] = useState('')

    async function drawCard(selection) {
        const newCardObject = await fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`).then(r=>r.json())
        const newCard = newCardObject.cards[0]
        switch (newCard.value) {
            case 'JACK':
                newCard['numValue'] = 11
                break;
            case 'QUEEN':
                newCard['numValue'] = 12
                break;
            case 'KING':
                newCard['numValue'] = 13
                break;
            case 'ACE':
                newCard['numValue'] = 14
                break;
            default:
                newCard['numValue'] = parseInt(newCard.value)
        };
        if (selection==='high') {
            if (newCard.numValue > numValue) {
                setGuess('Correct')
                setScore(score+1)
            }else {
                setGuess('Incorrect')
            }
        }else if (selection==='low') {
            if (newCard.numValue < numValue) {
                setGuess('Correct')
                setScore(score+1)
            }else {
                setGuess('Incorrect')
            }
        };
        setCurrCard(newCard)
        updateCardsRemaining(newCardObject.remaining)
    }

    return (
        <div id="play-area">
            {currCard ? <h4>Score: {score}</h4>: null}
            <div>
                {deck_id ?
                    <div id='current-deck'>
                        <img src='https://deckofcardsapi.com/static/img/back.png' alt='back of card'/>
                        <p>Cards Remaining: {remaining}</p>
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
                        <p>{remaining>50 ? null : guess}</p>
                    </div>
                    
                    :
                    <button onClick={drawCard}>Start New Game</button> }
            </div>

        </div>
    )
}

export default PlayArea
