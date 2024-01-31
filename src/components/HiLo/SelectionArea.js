import React from 'react'
import './selection-area.css'
import AnswerCard from './AnswerCard'
import { assignNumVal } from './helperFunctions'

function SelectionArea({state, dispatch}) {
    const {deck, currCard, newCard, correct, guessTrigger} = state
    
    function makeGuess(guess) {
        dispatch({type: 'guess', payload:{ guess: guess}})
        setTimeout(resetPlayArea, 1500)
    }

    async function resetPlayArea(){
        const newCardObj = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`).then(r=>r.json())
        assignNumVal(newCardObj.cards[0])
        dispatch({type: 'reset', payload:{newCardObj}})
    }

    console.log(newCard)
    return (
        <div id='play-area'>
            
            <div id='currCard'>
                <div id='currCard-container' className={guessTrigger ? 'flipped': 'unflipped'}>
                    <img src={currCard.image} alt={currCard.code} className='card-image'/>
                </div>
            </div>

            <div id='guess-area'>
                {guessTrigger ?
                <AnswerCard correct={correct}/>
                :
                <div id='guess-button-container'>
                    <button onClick={()=>makeGuess('high')}>High</button>
                    <p>-OR-</p>
                    <button onClick={()=>makeGuess('low')}>Low</button>
                </div>
                }
            </div>

            <div id='newCard-container'>
                <div id='new-card-outer' className={guessTrigger ? 'flipped': ''}>
                    <div id='new-card' className={guessTrigger ? 'flipped': 'unflipped'}>
                        <img id='new-card-back' className='card-image' src='https://deckofcardsapi.com/static/img/back.png' alt='back of card' />
                        <img id='new-card-front' className='card-image' src={newCard.image} alt={newCard.code} />
                    </div>
                </div>
            </div> 
                

        </div>
    )  
}

export default SelectionArea
