import React from 'react'
import { assignNumVal } from './helperFunctions'

function SelectionArea({state, dispatch}) {
    const {deck, currCard, score, newCard} = state
    
    async function makeGuess(guess) {
        const newCardObj = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`).then(r=>r.json())
        assignNumVal(newCardObj.cards[0])
        dispatch({type: 'guess', payload:{newCardObj, guess: guess}})
        setTimeout(resetPlayArea, 1500, newCardObj)
    }

    function resetPlayArea(newCardObj){
        dispatch({type: 'reset', payload:{newCardObj}})
    }

    console.log(newCard)
    return (
        <div id='play-area'>
            <div id='currCard'>
                <img src={currCard.image} alt={currCard.code}/>
            </div>
            {newCard.value ? 
                <div>
                    <img className='selection-area' src={newCard.image} alt={newCard.code}/>
                </div> 
                : 
                <div className='selection-area'>
                    <button onClick={()=>makeGuess('high')}>High?</button>
                    <button onClick={()=>makeGuess('low')}>Low?</button>
                </div>}
        </div>
    )  
}

export default SelectionArea
