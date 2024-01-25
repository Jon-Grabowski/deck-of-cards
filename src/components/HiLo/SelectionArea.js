import React from 'react'
import './selection-area.css'
import { assignNumVal } from './helperFunctions'

function SelectionArea({state, dispatch}) {
    const {deck, currCard, newCard, correct} = state
    
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
                <img src={currCard.image} alt={currCard.code} className='card-image'/>
            </div>
            <div>
                    <button onClick={()=>makeGuess('high')}>High?</button>
                    <button onClick={()=>makeGuess('low')}>Low?</button>
            </div>
            {newCard.value ? 
                <div id='newCard-container'>
                    {correct? <p id='newCard-text' style={{'background-color':'green'}}>CORRECT!</p> : <p id='newCard-text' style={{'background-color': 'red'}}>WRONG</p>}
                    <img className='card-image selection-area' src={newCard.image} alt={newCard.code} />
                </div> 
                : 
                <div className='selection-area'>
                    
                </div>}
        </div>
    )  
}

export default SelectionArea
