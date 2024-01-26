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
                currCard: action.payload.cards[0],
                newCard: action.payload.cards[1]
            }
        case ('guess'):
            const { guess} = action.payload
            if ((guess === "high" && state.newCard.numValue > state.currCard.numValue)
                || (guess === "low" && state.newCard.numValue < state.currCard.numValue)){
                return {
                    ...state,
                    score: state.score + 1,
                    correct: true,
                    guessTrigger: true
                }
            } else {
                return {
                    ...state,
                    correct: false,
                    guessTrigger: true
                }
            }
        case ('reset'):
            const newCardObj = action.payload.newCardObj
            const newCard = newCardObj.cards[0]
            return {
                ...state,
                deck: {
                    remaining: newCardObj.remaining, 
                    deck_id: newCardObj.deck_id
                },
                currCard: state.newCard,
                newCard: newCard,
                guessTrigger: false
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
    correct:true,
    guessTrigger: false
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