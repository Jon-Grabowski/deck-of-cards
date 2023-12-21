import React from 'react'
import SelectionArea from './SelectionArea'
import { useState } from 'react'

function PlayArea({deck, currCard, setCurrCard, updateCardsRemaining}) {
    const {deck_id, remaining, shuffled, success} = deck
    const {code, image, suit, value} = currCard

    async function drawCard(selection='') {
        const newCard = await fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`).then(r=>r.json())
        if (selection==='high') {

        }else if (selection==='low') {

        }else {
            setCurrCard(newCard.cards[0])
            updateCardsRemaining(newCard.remaining)
        }
    }

    return (
        <div id="play-area">
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
                    </div>
                    
                    :
                    <button onClick={drawCard}>Start New Game</button> }
            </div>

        </div>
    )
}

export default PlayArea
