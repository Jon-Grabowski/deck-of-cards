import React from 'react'
import { assignNumVal } from './helperFunctions'

function SelectionArea({state, dispatch}) {
    const {deck, currCard, score} = state
    
    async function makeGuess(guess) {
        const newCardObj = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`).then(r=>r.json())
        assignNumVal(newCardObj.cards[0])
        dispatch({type: 'guess', payload:{newCardObj, guess: guess}})
    }

    return (
        <div>
            <div>
                <img src={currCard.image} alt={currCard.code}/>
            </div>
            <div>
                <p>Score: {score}</p>
            </div>
            <div>
                <button onClick={()=>makeGuess('high')}>High?</button>
                <button onClick={()=>makeGuess('low')}>Low?</button>
            </div>
        </div>
    )  
}

export default SelectionArea
