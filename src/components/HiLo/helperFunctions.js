function reducer(state, action) {
    switch (action.type) {
        case ('shuffle'):
            return {deck : action.payload, currCard: {}, score: 0, newCard:{}}
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
                    newCard: newCard,
                    score: state.score + 1,
                    correct: true
                }
            } else {
                console.log('incorrect!')
                return {
                    ...state,
                    deck: {
                        remaining: newCardObj.remaining, 
                        deck_id: newCardObj.deck_id
                    },
                    newCard: newCard,
                    correct: false
                }
            }
        case ('reset'):
            console.log("RESET")
            const newCurrCard = action.payload.newCardObj.cards[0]
            return {
                ...state,
                currCard: newCurrCard,
                newCard: {}
            }
        default:
            return state
    }
}

const initialState = {
    deck: {},
    currCard: {},
    score: 0,
    newCard: {},
    correct:true
}

function assignNumVal(newCard) {
    switch (newCard.value) {
        case 'JACK':
            return newCard['numValue'] = 11
        case 'QUEEN':
            return newCard['numValue'] = 12
        case 'KING':
            return newCard['numValue'] = 13
        case 'ACE':
            return newCard['numValue'] = 14
        default:
            return newCard['numValue'] = parseInt(newCard.value)
    };
}

export { reducer, assignNumVal, initialState }